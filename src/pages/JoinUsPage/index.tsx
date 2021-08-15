// React
import { useState } from 'react';

// React Hot Toast
import toast, { Toaster } from 'react-hot-toast';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// SASS
import './styles.scss';

// Components
import { Button } from '../../components/Button';
import { AsideWithMan } from '../../components/AsideWithMan';
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';
import { DropPhotoZone } from '../../components/DropPhotoZone';

// React Router DOM
import { Link, useHistory } from 'react-router-dom';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// Util
import { validateEmail } from '../../util/validateEmail';
import { testUsernameEmailAndPasswordInputValues } from '../../util/testUsernameEmailAndPasswordInputValues';

// Images
import logoWithNameImg from '../../assets/images/logos/logoWithName500px.png';
import googleIconImg from '../../assets/images/icons/google-icon.png';

export function JoinUsPage() {
	const history = useHistory();

	const { authUser, addUserDataToContext } = useAuth();

	if(authUser) {
		history.push(`/main`);
	}

	const firestore = firebase.firestore();

	const [showButtons, setShowButtons] = useState(true);
	const [showInputs, setShowInputs ] = useState(false);
	const [showPhotoZone, setShowPhotoZone] = useState(false);

	const [joinUsername, setJoinUsername] = useState('');
	const [joinEmail, setJoinEmail] = useState('');
	const [joinPassword, setJoinPassword] = useState('');

	const [checkboxValue, setCheckboxValue] = useState(false);

	// Essa função é enviada pelas props do componente DropPhotoZone
	// e ele a aciona quando se clica no botão do componente

	async function joinUsWithEmailAndPassword(profilePhoto: File | undefined) {

		async function registerUser(photoURL: string) {

			// É necessário ter uma coleção de usuários para as páginas de usuário (UserPages)
			const usersColection = firestore.collection("users");

			try {
				await firebase.auth().createUserWithEmailAndPassword(joinEmail.trim(), joinPassword.trim());	
				
				try {
					const currentUser = firebase.auth().currentUser;

					if(currentUser) {
						await currentUser.updateProfile({
						  displayName: joinUsername.trim(),
						  photoURL: photoURL
						});

						let photoURLString;

						if(currentUser.photoURL === null) {
							photoURLString = '';
						} else {
							photoURLString = currentUser.photoURL;
						}

						if(
							currentUser &&
							currentUser.displayName 
						) {
							
							const { id } = await usersColection.add({
								avatar: photoURLString,
								username: currentUser.displayName,
								email: currentUser.email
							});

							addUserDataToContext(id, currentUser.displayName, photoURLString);
						}

						history.push('/login');
					}
				} catch(err) {
					toast.error("Houve um erro durante o cadastro");
					console.log(err);
				}

			} catch(err) {
				toast.error("Não foi possível cadastrar o usuário");
				console.log(err);
			}

		}

		async function uploadFileAndCallRegisterUser() {
			// Realiza o upload da imagem para o storage e capta a URL dela
			if(profilePhoto) {
				const storageRef = firebase.storage().ref();
				const fileRef = storageRef.child(profilePhoto.name);
				await fileRef.put(profilePhoto);
				registerUser(await fileRef.getDownloadURL());
			} else {
				registerUser('');
			}
		}

		uploadFileAndCallRegisterUser();
	}

	return (
		<div className="join-us container-row">
			<Toaster />
			<AsideWithMan />

			<main>
				<div>
					{ (showButtons || showInputs) && <img src={logoWithNameImg} alt="Logo do EscrevaMe" />}

					{ showButtons && 
						<>
							<span className="title-span">Junte-se a nós e obtenha acesso à plataforma</span>
							<hr />
				            <Button
				            	onClick={() => {
				            		setShowButtons(false);
				            		setShowInputs(true);
				            		setShowPhotoZone(false);
				            	}}
				            >
				              <div>
				                <FontAwesomeIcon iconName="fas fa-envelope" />
				              </div>
				              <span>Cadastre-se com email</span>
				            </Button>
						</>
					}

					{
						showInputs && 
							<form onSubmit={event => {
								event.preventDefault()

								if(testUsernameEmailAndPasswordInputValues(joinUsername, joinEmail, joinPassword)) {
									setShowButtons(false);
						    		setShowInputs(false);
						    		setShowPhotoZone(true); 
								} else {
									toast.error("Dados inválidos!");
								}
							}}>
								<input 
									type="text"
									placeholder="Digite um nome de usuário"
									onChange={event => setJoinUsername(event.target.value)}
									value={joinUsername}
								/>
								<input
									type="email"
									placeholder="Digite seu email"
									onChange={event => setJoinEmail(event.target.value)}
									value={joinEmail}
								/>
								<input 
									type="password"
									placeholder="Digite uma senha"
									onChange={event => setJoinPassword(event.target.value)}
									value={joinPassword}
								/>
								<Button
									type="submit"
									disabled={
										((!validateEmail(joinEmail) && joinEmail!=='') || 
											!testUsernameEmailAndPasswordInputValues(joinUsername, joinEmail, joinPassword)
										) ? true : false}
								>
									Próximo
								</Button>
							</form>
					}

					{
						showPhotoZone &&
							<>
								<h1>Envie uma foto de perfil</h1>
								<DropPhotoZone 
									functionToExecuteOnSubmit={joinUsWithEmailAndPassword}
									textForButton="Cadastrar"
									buttonDisabled={!checkboxValue}
								/>

								<div className="policies-checkbox">
									<input type="checkbox" id="accept-checkbox" onClick={() => setCheckboxValue(checkboxValue ? false : true)} checked={checkboxValue} />
									<label htmlFor="accept-checkbox">
										Li e concordo com a <Link to="/privacypolicy">Política de privacidade </Link>
										 e com a <Link to="/datapolicy">Política de tratamento e segurança de dados</Link>.
									</label>
								</div>
							</>
					}

					{
						showButtons ?
							(<span>
								Já possui uma conta? <Link to="/login">Faça login</Link>
							</span>)
						:  	(
								<span>
									Deseja voltar para o início? 
									<button
										className="simple"
										onClick={() => {
											setShowButtons(true);
						            		setShowInputs(false);
						            		setShowPhotoZone(false);
										}}
									>
										Clique aqui	
									</button>
								</span>
							)	
					}

		            
				</div>
			</main>
		</div>
	);
}
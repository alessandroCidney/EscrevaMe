// React
import { useState } from 'react';

// React Hot Toast
import toast, { Toaster } from 'react-hot-toast';

// Hooks
import { useEmailAuth } from '../../hooks/useEmailAuth';

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

// Images
import logoWithNameImg from '../../assets/images/logos/logoWithName500px.png';
import googleIconImg from '../../assets/images/icons/google-icon.png';

export function JoinUsPage() {
	const history = useHistory();

	const { emailUser,  addUserDataToContext } = useEmailAuth();

	if(emailUser) {
	    history.push(`/main`);
	  }

	const firestore = firebase.firestore();

	const [showButtons, setShowButtons] = useState(true);
	const [showInputs, setShowInputs ] = useState(false);
	const [showPhotoZone, setShowPhotoZone] = useState(false);

	const [joinUsername, setJoinUsername] = useState('');
	const [joinEmail, setJoinEmail] = useState('');
	const [joinPassword, setJoinPassword] = useState('');

	function testInputValues() {

		if(!joinUsername || joinUsername.trim()==='' || !joinEmail || joinEmail.trim()==='' || !joinPassword || joinPassword.trim()==='' || joinPassword.trim().length<6) {
			return false;
		}

		if(joinUsername.trim().split(" ").length > 1) {
			return false;
		}

		if(joinUsername.trim().length > 16) {
			return false;
		}

		if(!validateEmail(joinEmail)) {
			return false;
		}

		return true;
	}

	// Essa função é enviada pelas props do componente DropPhotoZone
	// e ele a aciona quando se clica no botão do componente

	async function joinUs(profilePhoto: File | undefined) {

		const usersColection = firestore.collection("users");

		async function registerUser(url: string) {
			await usersColection.add({
				username: joinUsername.trim(),
				email: joinEmail.trim(),
				avatar: url
			})

			await firebase.auth().createUserWithEmailAndPassword(joinEmail.trim(), joinPassword.trim())

			await firebase.auth().signInWithEmailAndPassword(joinEmail.trim(), joinPassword.trim())
				.then(() => {
					addUserDataToContext(joinUsername.trim(), url);
				});
		}

		async function uploadFile() {
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

		

		const usersInDatabase = [] as Record<string, string>[];
		const emailsInDatabase = [] as Record<string, string>[];

		// A seguir, foi necessário utilizar a sintaxe de funções assíncronas com then(),
		// pois a versão do Firestore que utilizava async e await estava em beta.

		// Detectando se o usuário já existe no banco
		usersColection
		.where("username", "==", 
			joinUsername
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^ a-zA-Z0-9]/g, '')
			.toLowerCase())
		.get()
			.then(usersQuerySnapshot => {
				usersQuerySnapshot.forEach(usersDoc => {
					usersInDatabase.push(usersDoc.data());
				});

				if(usersInDatabase.length) {
					// Se o usuário existir, o processo é interrompido
					toast.error("O usuário já existe!");
					return;
				}

				// Detectando se o email já foi utilizado por outro usuário
				usersColection
				.where("email", "==", 
					joinEmail
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, "")
					.replace(/[^ a-zA-Z0-9]/g, '')
					.toLowerCase())
				.get()
					.then(emailsQuerySnapshot => {
						emailsQuerySnapshot.forEach(emailsDoc => {
							emailsInDatabase.push(emailsDoc.data());
						});

						if(emailsInDatabase.length) {
							// Se o email já foi utilizado, o processo é interrompido
							toast.error("O usuário já existe!");
							return;
						}

						// Se o usuário não existir e se o email não estiver salvo, os dados do usuário
						// serão armazenados no Cloud Firestore e a imagem será amrazenada no Storage
						
						uploadFile().then(() => {
							toast.success("Usuário criado com sucesso!");
							history.push(`/users/${joinUsername}`);
						})
						.catch(() => {
							toast.error("Não foi possível criar o usuário.")
						});
					})
			});

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
							<Button className="red" disabled>
				                <div>
				                  <img src={googleIconImg} alt="Logo do Google" />
				              	</div>
				              	<span>Continuar com o Google</span>
				            </Button>

				            <Button className="blue" disabled>
				                <div>
				                  <FontAwesomeIcon iconName="fab fa-twitter" />
				                </div>
				              <span>Continuar com o Twitter</span>
				            </Button>

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

								if(testInputValues()) {
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
									disabled={((!validateEmail(joinEmail) && joinEmail!=='') || !testInputValues()) ? true : false}
									onClick={() => { 
										
									}}
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
									functionToExecuteOnSubmit={joinUs}
									textForButton="Cadastrar"
								/>
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
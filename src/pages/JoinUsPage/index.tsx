// React
import { useState, FormEvent, useEffect } from 'react';

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
import facebookIconImg from '../../assets/images/icons/facebook-icon.png';

export function JoinUsPage() {
	const firestore = firebase.firestore();
	const usersColection = firestore.collection("users");

	const [showButtons, setShowButtons] = useState(true);
	const [showInputs, setShowInputs ] = useState(false);
	const [showPhotoZone, setShowPhotoZone] = useState(false);

	const [joinUsername, setJoinUsername] = useState('');
	const [joinEmail, setJoinEmail] = useState('');
	const [joinPassword, setJoinPassword] = useState('');

	function testInputValues() {
		if(!joinUsername || !joinEmail || !joinPassword) {
			return false;
		}

		if(!validateEmail(joinEmail)) {
			return false;
		}

		return true;
	}

	async function joinUs(profilePhoto: File | undefined) {

		const usersInDatabase = [] as Record<string, string>[];

		usersColection.where("name", "==", joinUsername).get()
			.then(usersQuerySnapshot => {
				usersQuerySnapshot.forEach(usersDoc => {
					usersInDatabase.push(usersDoc.data());
				})

				alert(usersInDatabase.length ? 'O usuário já existe!' : 'Tudo ok!');
			});

	}

	return (
		<div className="join-us container-row">
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
							<form>
								<input 
									type="text"
									placeholder="Digite um nome de usuário"
									onChange={event => setJoinUsername(event.target.value)}
									value={joinUsername}
								/>
								<input
									type="text"
									placeholder="Digite seu email"
									onChange={event => setJoinEmail(event.target.value)}
									value={joinEmail}
									className={ (!validateEmail(joinEmail) && joinEmail!=='') ? 'invalid': ''}
								/>
								<input 
									type="password"
									placeholder="Digite uma senha"
									onChange={event => setJoinPassword(event.target.value)}
									value={joinPassword}
								/>
								<Button
									type="button"
									onClick={() => { 
										if(testInputValues()) {
											setShowButtons(false);
								    		setShowInputs(false);
								    		setShowPhotoZone(true); 
										} else {
											alert("Dados inválidos!")
										}
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
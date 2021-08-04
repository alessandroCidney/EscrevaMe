// React
import { useState, CSSProperties } from 'react';

// React Router DOM
import { useHistory } from 'react-router-dom';

// React Hot Toast
import toast, { Toaster } from 'react-hot-toast';

// SASS
import './styles.scss';

// Components
import { MainHeader } from '../../components/MainHeader';
import { MainFooter } from '../../components/MainFooter';
import { Button } from '../../components/Button';

// Hooks
import { useEmailAuth } from '../../hooks/useEmailAuth';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// Util
import { adaptEssayNameToURL } from '../../util/adaptEssayNameToURL';
import { adaptEssayContentToFirestore } from '../../util/adaptEssayContent';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

export function NewEssayPage() {
	const history = useHistory();

	const firestore = firebase.firestore();
	const essaysCollection = firestore.collection("essays");

	const [essayTitle, setEssayTitle] = useState('');
	const [essayContent, setEssayContent] = useState('');

	const { emailUser, addUserDataToContext } = useEmailAuth();

	function validateValues() {
		if(essayTitle.trim() === '' || essayContent.trim() === '') {
			return false;
		}

		if(essayTitle.trim().length < 2 || essayContent.trim().length < 700) {
			return false;
		}

		if(essayContent.trim().split(" ").length < 3) {
			return false;
		}

		function testLengthOfAllWordsOfEssay(content: string) {
			const trimContent = content.trim().split(" ");

			let biggerWord = '';

			trimContent.forEach(word => {
				if(word.length > biggerWord.length) biggerWord = word;
			});

			if(biggerWord.length > 46) {
				return true;
			} else {
				return false;
			}
		}

		if(testLengthOfAllWordsOfEssay(essayContent)) {
			return false;
		}

		if(essayTitle.trim().length > 42 || essayContent.trim().length > 2900) {
			return false;
		}

		return true;
	}

	function validateAndUploadValues() {

		async function uploadEssay() {
			if(emailUser && validateValues()) {
				await essaysCollection.add({
					essay_title: essayTitle,
					formated_essay_title: adaptEssayNameToURL(essayTitle),
					essay_content: adaptEssayContentToFirestore(essayContent),
					author: emailUser.username,
					author_avatar: emailUser.avatar,
					created_at: new Date(),
					likes: [],
					comments: []
				});
			}
		}

		if(emailUser && validateValues()) {

			let essayData = [] as Record<string, string>[];

			essaysCollection.where("author", "==", emailUser.username).get()
				.then(essaysQuerySnapshot => {
					essaysQuerySnapshot.forEach(essaysDoc => {
						essayData.push(essaysDoc.data());
					});

					let essayAlreadyExists = false;

					essayData.forEach(essay => {
						if(essay.formated_essay_title === adaptEssayNameToURL(essayTitle)) {
							essayAlreadyExists = true;
						}
					});

					if(!essayAlreadyExists) {
						uploadEssay().then(() => history.push(`/essays/${emailUser.username}/${adaptEssayNameToURL(essayTitle)}`));
					} else {
						toast.error("Você já possui uma redação com mesmo título");
					}
				})
		} else {
			toast.error("Você precisa fazer login para postar redações");
			history.push('/login');
		}
	}

	return (
		<div className="new-essay-page container-column">
			<Toaster />
			<MainHeader />

				<main>

					<h1>Nova Redação</h1>
					<textarea 
						className="title-textarea"
						placeholder="Insira um título para a nova redação"
						onChange={event => setEssayTitle(event.target.value)}
						value={essayTitle}
					></textarea>

					<textarea 
						className="content-textarea"
						placeholder="Começe a escrever sua nova redação aqui"
						onChange={event => setEssayContent(event.target.value)}
						value={essayContent}
					></textarea>

					<Button 
						disabled={validateValues() ? false : true}

						onClick={() => {
							if(validateValues()) {
								validateAndUploadValues()
							}
						}}
					>Enviar redação</Button>
				</main>

				{
					emailUser && 
					<aside className="user-items">
						<div className="user-data">
							<div className="profile-photo">
								<img src={emailUser.avatar?emailUser.avatar:profilePhotoImg} alt={`Foto de perfil de ${emailUser.username? ` de ${emailUser.username}` : ''}`} />
							</div>
							<div className="username"><p>@{emailUser && emailUser.username}</p><h4>Está escrevendo</h4></div>
						</div>
					</aside>
				}

			<MainFooter />
		</div>
	);
}
// React
import { useState } from 'react';

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
import { useAuth } from '../../hooks/useAuth';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// Util
import { adaptEssayNameToURL } from '../../util/adaptEssayNameToURL';
import { adaptEssayContentToFirestore } from '../../util/adaptEssayContent';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

type CommentType = {
	comment_author: string;
	comment_author_avatar: string;
	comment_content: string;
	created_at: number;
}

type EssayType = {
	essay_title: string;
	formated_essay_title: string;
	essay_content: string;
	author_username: string;
	author_id: string;
	author_avatar: string;
	created_at: number;
	likes: string[];
	comments: CommentType[];
}

export function NewEssayPage() {
	const history = useHistory();

	const firestore = firebase.firestore();
	const essaysCollection = firestore.collection("essays");

	const [essayTitle, setEssayTitle] = useState('');
	const [essayContent, setEssayContent] = useState('');

	const { authUser } = useAuth();

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

		if(essayTitle.trim().length > 52 || essayContent.trim().length > 2900) {
			return false;
		}

		return true;
	}

	function validateAndUploadValues() {

		async function uploadEssay() {
			if(authUser && validateValues()) {

				await essaysCollection.add({
					essay_title: essayTitle,
					formated_essay_title: adaptEssayNameToURL(essayTitle),
					essay_content: adaptEssayContentToFirestore(essayContent),
					author_username: authUser.username,
					author_id: authUser.user_id,
					author_avatar: authUser.avatar,
					created_at: (new Date()).getTime(),
					likes: [],
					comments: []
				});
			}
		}

		if(authUser && validateValues()) {

			let essayData = [] as EssayType[];

			essaysCollection.where("author_id", "==", authUser.user_id).get()
				.then(essaysQuerySnapshot => {
					essaysQuerySnapshot.forEach(essaysDoc => {
						let data = essaysDoc.data() as EssayType;
						essayData.push(data);
					});

					let essayAlreadyExists = false;

					essayData.forEach(essay => {
						if(essay.formated_essay_title === adaptEssayNameToURL(essayTitle)) {
							essayAlreadyExists = true;
						}
					});

					if(!essayAlreadyExists) {
						uploadEssay().then(() => history.push(`/essays/${authUser.user_id}/${adaptEssayNameToURL(essayTitle)}`));
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
					authUser && 
					<aside className="user-items">
						<div className="user-data">
							<div className="profile-photo">
								<img src={authUser.avatar?authUser.avatar:profilePhotoImg} alt={`Foto de perfil de ${authUser.username? ` de ${authUser.username}` : ''}`} />
							</div>
							<div className="username"><p>{authUser && authUser.username}</p><h4>Está escrevendo</h4></div>
						</div>
					</aside>
				}

			<MainFooter />
		</div>
	);
}
// React Hot Toast
import toast, { Toaster } from 'react-hot-toast';

// React
import { useState } from 'react';

// React Router DOM
import { useParams, useHistory } from 'react-router-dom';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// SASS 
import './styles.scss';

// Components
import { MainHeader } from '../../components/MainHeader';
import { MainFooter } from '../../components/MainFooter';
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

type EssayPageParams = {
	username: string;
	title: string;
}

export function EssayPage() {
	const history = useHistory();

	const [essayTitle, setEssayTitle] = useState('');
	const [essayContent, setEssayContent] = useState('');
	const [essayAuthor, setEssayAuthor] = useState('');
	const [authorAvatar, setAuthorAvatar] = useState('');

	const firestore = firebase.firestore();
	const essaysCollection = firestore.collection("essays");
	const usersColection = firestore.collection("users");

	const params = useParams<EssayPageParams>();

	const username = params.username;
	const essayFormatedTitle = params.title;

	let essaysData = [] as Record<string, string>[];
	let usersData = [] as Record<string, string>[];

	essaysCollection.where("author", "==", username).get()
		.then((essaysQuerySnapshot => {
			essaysQuerySnapshot.forEach(essaysDoc => {
				essaysData.push(essaysDoc.data());
			});

			let essayExists = false;

			essaysData.forEach(essay => {
				if(essay.formated_essay_title === essayFormatedTitle) {
					essayExists = true;

					setEssayTitle(essay.essay_title);
					setEssayContent(essay.essay_content);
					setEssayAuthor(essay.author);

					usersColection.where("username", "==", essay.author).get()
						.then((usersQuerySnapshot => {
							usersQuerySnapshot.forEach((usersDoc => {
								usersData.push(usersDoc.data());
							}))

							if(usersData.length > 0) {
								setAuthorAvatar(usersData[0].avatar);
							}
						}))
				}
			});

			if(!essayExists) {
				toast.error('Redação inexistente');
				//history.push('/login');
			}
		}))

	return (
		<div className="essay-page container-column">
			<Toaster />
			<MainHeader />

			<main>
				<h1 className="essay-title">
					{essayTitle}
				</h1>
				<div className="essay-content">
					{essayContent}
				</div>	
			</main>

			<aside className="user-items">
				<div className="user-data">
					<div className="profile-photo">
						<img src={authorAvatar ? authorAvatar : profilePhotoImg} alt={`Foto de perfil ${essayAuthor ? ` de ${essayAuthor}` : 'de um usuário'}`} />
					</div>
					<div className="username"><h4>Escrito por</h4><p>{essayAuthor}</p></div>
				</div>

				<div className="user-actions">
					{/* <FontAwesomeIcon iconName="fas fa-heart" /> */}

					<FontAwesomeIcon onHoverTransformToSolidVersion iconName="far fa-heart" />
					{/*<FontAwesomeIcon iconName="far fa-comment-alt" />*/}
					{/*<FontAwesomeIcon iconName="far fa-share-square" />*/}
				</div>
			</aside>
			

			<MainFooter />
		</div>
	);
}
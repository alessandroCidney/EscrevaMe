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

// Hooks
import { useEmailAuth } from '../../hooks/useEmailAuth';
import { useEssay } from '../../hooks/useEssay';

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

	const [update, setUpdate] = useState(1);
	const [showAddCommentTextarea, setShowAddCommentTextarea] = useState(false);

	const firestore = firebase.firestore();
	const essaysCollection = firestore.collection("essays");

	const params = useParams<EssayPageParams>();

	const username = params.username;
	const essayFormatedTitle = params.title;

	const { emailUser } = useEmailAuth();
	const { essay } = useEssay(username, essayFormatedTitle, update);

	async function handleLikeQuestion(id: string, essayLikes: string[]) {
		
		if(!essayLikes) {
			essayLikes = [];
		}

		if(emailUser && essay) {
			const essayRef = essaysCollection.doc(id)

			if(essayLikes.indexOf(emailUser.username) === -1) {

				if(typeof(essay.likes) != "string") {
					const newLikes = [...essayLikes, emailUser.username];

					await essayRef.update({
						likes: newLikes
					});
				}
			} else {
					const newArr = [] as string[];

					essayLikes.forEach(author => {
						if(author != emailUser.username) newArr.push(author);
					});

					await essayRef.update({
						likes: newArr
					});
			}
		}

		setUpdate(update + 1);
	}

	
	return (

		<div className="essay-page container-column">
			<Toaster />
			<MainHeader />

		{essay ?
			(
			<>
			<main>
				<h1 className="essay-title">
					{essay.essay_title}
				</h1>
				<div className="essay-content">
					{essay.essay_content}
				</div>
			</main>

			<aside className="user-items">
				<div className="user-data">
					<div className="profile-photo">
						<img 
							src={essay.author_avatar && 
								typeof(essay.author_avatar)=="string" 
								? essay.author_avatar : profilePhotoImg} 
							
							alt={`Foto de perfil ${essay.author 
								? ` de ${essay.author}` 
								: 'de um usuário'}`} 
						/>
					</div>
					<div className="username">
						<h4>Escrito por</h4>
						<p>{essay.author}</p>
					</div>
				</div>

				<div className="user-actions">
					{
						(emailUser 
							&& essay.essay_title 
							&& typeof(essay.essay_title)=="string" 
							&& essay.essay_title.trim().length > 2) 
						&&
						(<>
							<button 
								onClick={() => handleLikeQuestion(essay.id, essay.likes)}
							>
								<FontAwesomeIcon 
									alwaysSolid={emailUser && essay.likes && essay.likes.indexOf(emailUser.username) !== -1 ? true : false} 
									onHoverTransformToSolidVersion 
									iconName="far fa-heart" 
								/>
							</button>

							<button
								onClick={() => {
									if(showAddCommentTextarea) {
										setShowAddCommentTextarea(false);
									} else {
										setShowAddCommentTextarea(true);
									}
								}}
							>
								<FontAwesomeIcon 
									alwaysSolid={showAddCommentTextarea}
									iconName="far fa-comment-alt"
								/>
							</button>
						</>)
					}	
				</div>
			</aside>

			<div className="comments-area">
				<div className={`add-comment ${!showAddCommentTextarea && "dont-show"}`}>
					<textarea 
						className="comment-content no-shadow-on-focus"
						placeholder="O que você pensa sobre esse texto? Interaja!"
					></textarea>
				</div>
				<div className="comments">
					<h2>Comentários</h2>

					<div className="comments-list">
						<div className="comment">
							Comment Comment Comment Comment Comment Comment
							Comment Comment Comment Comment Comment Comment
						</div>
					</div>
				</div>
			</div>

			<MainFooter />
			
			</>)
		

		: (<main>Redação inexistente</main>)}
		</div>
		
	);
}
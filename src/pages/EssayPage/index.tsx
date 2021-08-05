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
import { Button } from '../../components/Button';

// Util
import { adaptEssayContentToEssayPage } from '../../util/adaptEssayContent';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

type EssayPageParams = {
	username: string;
	title: string;
}

type CommentType = {
	comment_author: string;
	comment_author_avatar: string;
	comment_content: string;
	created_at: Date;
}

export function EssayPage() {
	const history = useHistory();

	const [update, setUpdate] = useState(1);
	const [showAddCommentTextarea, setShowAddCommentTextarea] = useState(false);
	const [commentText, setCommentText] = useState('');

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
			const essayRef = essaysCollection.doc(id);

			if(essayLikes.indexOf(emailUser.username) === -1) {

				if(typeof(essay.likes) != "string") {
					const newLikes = [...essayLikes, emailUser.username];

					await essayRef.update({
						likes: newLikes
					});

					toast.success("Redação adicionada aos favoritos");
				}
			} else {
					const newArr = [] as string[];

					essayLikes.forEach(author => {
						if(author != emailUser.username) newArr.push(author);
					});

					await essayRef.update({
						likes: newArr
					});

					toast.success("Redação removida dos favoritos");
			}
		}

		// Força nova renderização
		setUpdate(update + 1);
	}

	function validateCommentTextWithoutToasts() {
		const trimComment = commentText.trim();

		if(trimComment === '') {
			return false;
		}

		let biggerWord = '';

		trimComment.split(" ").forEach(word => {
			if(word.length > biggerWord.length) biggerWord = word;
		});

		if(biggerWord.length > 46) {
			return false;
		}

		if(trimComment.trim().length>300) {
			return false;
		}

		return true;
	}

	function sendComment() {

		async function saveCommentInFirebase(firebaseComments: CommentType[]) {
			if(!essay) {
				toast.error("A redação não existe");
				return;
			}

			if(!emailUser) {
				toast.error("Você precisa fazer login para comentar");
				return;
			}

			const essayRef = essaysCollection.doc(essay.id);

			const newComment = {
				comment_author: emailUser.username,
				comment_author_avatar: emailUser.avatar,
				comment_content: commentText,
				created_at: new Date()
			};

			let newComments = [newComment, ...firebaseComments];	

			await essayRef.update({
				comments: newComments
			});

			toast.success("Comentário enviado");

			setCommentText('');

			// Força nova renderização
			setUpdate(update + 1);
		}

		function validateCommentText() {
			const trimComment = commentText.trim();

			if(trimComment === '') {
				toast.error('O comentário está vazio');
				return false;
			}

			let biggerWord = '';

			trimComment.split(" ").forEach(word => {
				if(word.length > biggerWord.length) biggerWord = word;
			});

			if(biggerWord.length > 46) {
				toast.error('Palavras inválidas no comentário');
				return false;
			}

			if(trimComment.trim().length>300) {
				toast.error('Limite de caracteres atingido');
				return false;
			}

			return true;
		}

		if(!emailUser) {
			toast.error("Você precisa fazer login para comentar");
			return;
		} else {
			if(essay && validateCommentText()) {
				const essayRef = essaysCollection.doc(essay.id);

				essayRef.get()
					.then(result => {
						let results = result.data();

						if(results) {
							saveCommentInFirebase(results.comments);
						} else {
							let firebaseComments = [] as CommentType[];
							saveCommentInFirebase(firebaseComments);
						}
					})
			}
		}
	}

	async function deleteEssay() {
		if(emailUser && essay) {
			if(emailUser.username === essay.author) {
				let essayRef = essaysCollection.doc(essay.id);

				await essayRef.delete();

				toast.success("Redação removida com sucesso");

				history.push(`/users/${emailUser.username}`);
			}
		}
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
					{adaptEssayContentToEssayPage(essay.essay_content)}
				</div>
			</main>

			<aside className="user-items">
				<div className="user-data">
					<button 
						className="profile-photo"
						onClick={() => history.push(`/users/${essay.author}`)}
					>
						<img 
							src={essay.author_avatar && 
								typeof(essay.author_avatar)=="string" 
								? essay.author_avatar : profilePhotoImg} 
							
							alt={`Foto de perfil ${essay.author 
								? ` de ${essay.author}` 
								: 'de um usuário'}`} 
						/>
					</button>
					<div className="username">
						<h4>Escrito por</h4>
						<p>@{essay.author}</p>
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

							{
								(emailUser.username === essay.author) &&
								<button
									onClick={deleteEssay}
								>
									<FontAwesomeIcon iconName="far fa-trash-alt" />
								</button>
							}
						</>)
					}	
				</div>
			</aside>

			<div className="comments-area">
				<div className={`add-comment ${!showAddCommentTextarea && "dont-show"}`}>
					<textarea 
						className="comment-content no-shadow-on-focus"
						placeholder="O que você pensa sobre esse texto? Interaja!"
						onChange={event => setCommentText(event.target.value)}
						value={commentText}
					></textarea>
					<Button
						onClick={sendComment}
						disabled={validateCommentTextWithoutToasts() ? false : true}
					>Enviar comentário</Button>
				</div>
				{
					essay.comments.length > 0 && 
					<>
						<div className="comments">
						<h2>Comentários</h2>

						<div className="comments-list">
							{essay.comments.map(c => 
								<div className="comment">
									<div className="comment-author">
										<div className="profile-photo">
											<img src={c.comment_author_avatar ? c.comment_author_avatar : profilePhotoImg} alt={`Avatar do usuário ${c.comment_author}`} />	
										</div>
										<p>@{c.comment_author}</p>
									</div>
									<div className="comment-content">
										{c.comment_content}
									</div>
								</div>
							)}
						</div>
					</div>
					</>
				}
				
			</div>

			<MainFooter />
			
			</>)
		

		: (<main>Carregando...</main>)}
		</div>
		
	);
}
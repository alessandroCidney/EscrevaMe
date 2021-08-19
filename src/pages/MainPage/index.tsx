// Components
import { MainHeader } from '../../components/MainHeader';
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';

// React
import { useState, useEffect } from 'react';

// React Router DOM
import { Link, useHistory } from 'react-router-dom';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// Util
import { reduceTextWithThreePoints } from '../../util/reduceTextWithThreePoints';

// SASS
import './styles.scss';

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

type UserType = {
	id: string;
	avatar: string;
	email: string;
	username: string;
}

export function MainPage() {
	const history = useHistory();

	const { authUser } = useAuth();

	const [essays, setEssays] = useState<EssayType[]>([]);
	const [users, setUsers] = useState<UserType[]>();

	const firestore = firebase.firestore();
	const essaysCollection = firestore.collection("essays");
	const usersColection = firestore.collection("users");

	useEffect(() => {
		let essaysData = [] as EssayType[];

		essaysCollection.get()
			.then(essaysQuerySnapshot => {
				essaysQuerySnapshot.forEach(essaysDoc => {
					let data = essaysDoc.data() as EssayType;
					if(data) {
						essaysData.push(data);
					}
				});

				essaysData.sort((a, b) => b.created_at - a.created_at);

				setEssays(essaysData);
			});

		let usersData = [] as UserType[];

		usersColection.get()
			.then(usersQuerySnapshot => {
				usersQuerySnapshot.forEach(usersDoc => {
					let data = usersDoc.data() as UserType;

					if(data) {
						usersData.push({
							id: usersDoc.id,
							avatar: data.avatar,
							email: data.email,
							username: data.username
						});
					}
				});

				setUsers(usersData);
			})
	}, []);

	return (
		<div className="main-page container-column">
			<MainHeader />

			<div className="all-content-of-main">
				{authUser &&
					<div className="main-menu dont-show-if-mobile">
						<ul>
							<li><Link to="/main">Página Principal</Link></li>
							<li><Link to="/essays/new">Nova Redação</Link></li>
							<li><Link to={`/users/${authUser.user_id}`}>Perfil</Link></li>
						</ul>
					</div>
				}

				<div className="last-essays">

					{essays.length>0 ?
						essays.map(essay => 
							<button 
								className="essay"
								onClick={() => history.push(`/essays/${essay.author_id}/${essay.formated_essay_title}`)}
							>
								<div className="essay-author">
									<div className="profile-photo">
										<img 
											src={essay.author_avatar ? essay.author_avatar : profilePhotoImg} 
											alt="Foto de perfil" 
										/>
									</div>
									<div className="username">
										{essay.author_username} postou uma nova redação
									</div>
								</div>

								<div className="essay-data">
									<p className="title">{reduceTextWithThreePoints(essay.essay_title, 40)}</p>
									<div>
										
										<p><FontAwesomeIcon iconName="fas fa-feather" />{essay.essay_content.length}</p> 
										
										<p><FontAwesomeIcon iconName="fas fa-heart" />{essay.likes.length}</p>
										
										<p><FontAwesomeIcon iconName="fas fa-comment-alt" />{essay.comments.length}</p>
									</div>
								</div>
							</button>)
						: (<span>Nenhuma redação encontrada.</span>)
					}
				</div>

				
				{
					authUser && (
						<div className="last-users dont-show-if-mobile">
						{
							(users && users.length > 0) ?
							users.map(u => 
								
									<button 
										className="user"
										onClick={event => history.push(`/users/${u.id}`)}
									>
										<div className="profile-photo">
											<img 
												src={u.avatar ? u.avatar : profilePhotoImg} 
												alt="Foto de perfil" 
											/>
										</div>
										<div className="username">
											{u.username}
										</div>
									</button>
								)
							: (<span>Nenhum novo usuário</span>)
						}
						</div>
					)
				}

			</div>
		</div>
	);
}
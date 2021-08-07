// Components
import { MainHeader } from '../../components/MainHeader';
import { MainFooter } from '../../components/MainFooter';
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';

// React
import { useState, useEffect } from 'react';

// React Router DOM
import { Link, useHistory } from 'react-router-dom';

// Hooks
import { useEmailAuth } from '../../hooks/useEmailAuth';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// SASS
import './styles.scss';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

type CommentType = {
	comment_author: string;
	comment_author_avatar: string;
	comment_content: string;
	created_at: Date;
}

type EssayType = {
	essay_title: string;
	formated_essay_title: string;
	essay_content: string;
	author: string;
	author_avatar: string;
	created_at: Record<string, number>;
	likes: string[];
	comments: CommentType[];
}

type UserType = {
	avatar: string;
	email: string;
	username: string;
}

export function MainPage() {
	const history = useHistory();

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

				essaysData.sort((a, b) => b.created_at.seconds - a.created_at.seconds);

				setEssays(essaysData);
			});

		let usersData = [] as UserType[];

		usersColection.get()
			.then(usersQuerySnapshot => {
				usersQuerySnapshot.forEach(usersDoc => {
					let data = usersDoc.data() as UserType;

					if(data) {
						usersData.push(data);
					}
				});

				setUsers(usersData);
			})
	}, []);

	const { emailUser } = useEmailAuth();

	return (
		<div className="main-page container-column">
			<MainHeader />

			<div className="all-content-of-main">
				{emailUser &&
					<div className="main-menu dont-show-if-mobile">
						<ul>
							<li><Link to="/main">Página Principal</Link></li>
							<li><Link to="/essays/new">Nova Redação</Link></li>
							<li><Link to={`/users/${emailUser.username}`}>Perfil</Link></li>
						</ul>
					</div>
				}

				<div className="last-essays">

					{essays.length>0 ?
						essays.map(essay => 
							<button 
								className="essay"
								onClick={() => history.push(`/essays/${essay.author}/${essay.formated_essay_title}`)}
							>
								<div className="essay-author">
									<div className="profile-photo">
										<img 
											src={essay.author_avatar ? essay.author_avatar : profilePhotoImg} 
											alt="Foto de perfil" 
										/>
									</div>
									<div className="username">
										@{essay.author}
									</div>
								</div>

								<div className="essay-data">
									<p className="title">{essay.essay_title}</p>
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

				<div className="last-users dont-show-if-mobile">
				{
					(emailUser && users && users.length>0) ?
						users.map(u => 
							
								<button 
									className="user"
									onClick={event => history.push(`/users/${u.username}`)}
								>
									<div className="profile-photo">
										<img 
											src={u.avatar ? u.avatar : profilePhotoImg} 
											alt="Foto de perfil" 
										/>
									</div>
									<div className="username">
										@{u.username}
									</div>
								</button>
							)	
						: (<span>Nenhum novo usuário</span>)
				}
				</div>
				

			</div>
		</div>
	);
}
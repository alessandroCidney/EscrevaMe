// React
import { useState, useEffect, useCallback } from 'react';

// React Router DOM
import { Link, useHistory } from 'react-router-dom';

// Components
import { MainHeader } from '../../components/MainHeader';
import { EssayOfMainPage } from '../../components/EssayOfMainPage';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// Types
import { EssayType } from '../../types/types';

// SASS
import './styles.scss';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

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

	const fetchUsersAndEssays = useCallback(() => {

		const firestore = firebase.firestore();
		const essaysCollection = firestore.collection("essays");
		const usersColection = firestore.collection("users");

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
			});
	}, []);

	useEffect(() => {
		fetchUsersAndEssays();
	}, [fetchUsersAndEssays]);

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
					{
						essays.length > 0 
						? essays.map((essay, index) => <EssayOfMainPage key={index} essay={essay} />)
						: <span>Nenhuma redação encontrada.</span>
					}
				</div>

				
				{
					authUser && (
						<div className="last-users dont-show-if-mobile">
						{
							(users && users.length > 0) ?
							users.map((u, index) => 
								
									<button 
										key={index}
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
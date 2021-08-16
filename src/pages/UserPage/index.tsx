// React
import { useState, useEffect } from 'react';

// React Router DOM
import { useHistory } from 'react-router-dom';

// React Hot Toast
import toast, { Toaster } from 'react-hot-toast';

// SASS
import './styles.scss';

// Components
import { EssayOfUserPage } from '../../components/EssayOfUserPage';
import { EssaysArea } from '../../components/EssaysArea';
import { MainFooter } from '../../components/MainFooter';
import { MainHeader } from '../../components/MainHeader';
import { Button } from '../../components/Button';

// React Router DOM
import { useParams } from 'react-router-dom';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

type UserPageParams = {
	id: string;
}

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
	created_at: Date;
	likes: string[];
	comments: CommentType[];
}

export function UserPage() {
	const history = useHistory();

	const { authUser } = useAuth();

	const [userPhotoURL, setUserPhotoURL] = useState('')
	const [essaysData, setEssaysData] = useState([] as Record<string, string>[]);
	const [username, setUsername] = useState('');

	const firestore = firebase.firestore();
	const usersColection = firestore.collection("users");
	const essaysCollection = firestore.collection("essays");

	const params = useParams<UserPageParams>();
	const paramsUsernameID = params.id;

	const findUserQuery = usersColection.doc(paramsUsernameID);
	const findEssaysQuery = essaysCollection.where("author_id", "==", paramsUsernameID);

	useEffect(() => {

		findUserQuery.get()
			.then(doc => {
				if(doc.exists) {
					const userData = doc.data();

					setUserPhotoURL(userData ? userData.avatar : '');
					setUsername(userData ? userData.username: '');
				}
			})
			.catch(() => {
				toast.error("Não foi possível encontrar o usuário");
				history.push('/main');
			});


		const essayData = [] as Record<string, string>[];

		findEssaysQuery.get()
			.then(essaysQuerySnapshot => {
				essaysQuerySnapshot.forEach(essaysDoc => {
					essayData.push(essaysDoc.data());
				});

				setEssaysData(essayData.length > 0 ? essayData : []);
			});

	}, [paramsUsernameID]);

	let bestEssays = [] as Record<string, string>[];

	if(essaysData) {
		essaysData.forEach(essay => bestEssays.push(essay));

		bestEssays.sort((a, b) => b.likes.length - a.likes.length);

		bestEssays = bestEssays.slice(0,3);
	}

	return (
		<div className="user-page container-column">
			<Toaster />
			<MainHeader />
			
			<div className="custom-background">	
			</div>

			<div className="user-page-content">
				<div className="user-data">	
					<div className="profile-photo">
						<img src={userPhotoURL ? userPhotoURL : profilePhotoImg} alt={`Foto de perfil de ${username}`} />
					</div>	
					<h1>{ username }</h1>
					<p>Olá! Sou um usuário da plataforma EscrevaMe</p>
					
					{
						(authUser && authUser.user_id===paramsUsernameID) &&
						<Button
							onClick={() => history.push('/essays/new')}
						>Nova redação</Button>
					}
				</div>
				
				<div className="user-content">
					<EssaysArea title="Redações destaque" highlight>
						{
							bestEssays.length > 0 ?
								bestEssays.map(essay => <EssayOfUserPage author_id={essay.author_id} icon="quote" formated_title={essay.formated_essay_title} title={essay.essay_title} />)
							: <span>Poste redações para que elas apareçam em seu perfil</span>
						}

					</EssaysArea>

					<EssaysArea title="Todas as redações" list>
						{ essaysData.length > 0 ? essaysData.map(essay => {
								return (<EssayOfUserPage author_id={essay && essay.author_id} formated_title={essay.formated_essay_title} title={essay.essay_title} />)
							}) : (
								<span>Poste redações para que elas apareçam em seu perfil</span>
							)
						}
					</EssaysArea>
				</div>
			</div>

			<MainFooter />
		</div>
	);
}
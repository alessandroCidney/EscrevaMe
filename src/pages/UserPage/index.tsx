// React
import { useState, useEffect, CSSProperties } from 'react';

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
// import { useGoogleAuth } from '../../hooks/useGoogleAuth';
import { useEmailAuth } from '../../hooks/useEmailAuth';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

type UserPageParams = {
	username: string;
}

export function UserPage() {
	const history = useHistory();

	const { emailUser,  addUserDataToContext } = useEmailAuth();

	const [userPhotoURL, setUserPhotoURL] = useState('')
	const [essaysData, setEssaysData] = useState([] as Record<string, string>[]);

	const firestore = firebase.firestore();
	const usersColection = firestore.collection("users");
	const essaysCollection = firestore.collection("essays");

	const params = useParams<UserPageParams>();
	const paramsUsername = params.username;

	const findUserQuery = usersColection.where("username", "==", paramsUsername);
	const findEssaysQuery = essaysCollection.where("author", "==", paramsUsername);

	useEffect(() => {
		console.log("potato")

		findUserQuery.get()
			.then(usersQuerySnapshot => {
				if(usersQuerySnapshot.empty) {
					toast.error("O usuário não existe");
					history.push('/');
				}

				usersQuerySnapshot.forEach(usersDoc => {
					const userData = usersDoc.data();

					setUserPhotoURL(userData ? userData.avatar : '');
					setEssaysData(essayData.length > 0 ? essayData : []);
				});
			});


		const essayData = [] as Record<string, string>[];

		findEssaysQuery.get()
			.then(essaysQuerySnapshot => {
				essaysQuerySnapshot.forEach(essaysDoc => {
					essayData.push(essaysDoc.data());
				});

				setEssaysData(essayData.length > 0 ? essayData : []);
			});

	}, [paramsUsername]);

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
						<img src={userPhotoURL ? userPhotoURL : profilePhotoImg} alt={`Foto de perfil de ${paramsUsername}`} />
					</div>	
					<h1>@{ paramsUsername }</h1>
					<p>Olá! Sou um usuário da plataforma EscrevaMe</p>
					<Button
						onClick={() => history.push('/essays/new')}
					>Nova redação</Button>
				</div>
				
				<div className="user-content">
					<EssaysArea title="Redações destaque" highlight>
						{
							bestEssays.length > 0 ?
								bestEssays.map(essay => <EssayOfUserPage author={essay.author} icon="quote" formated_title={essay.formated_essay_title} title={essay.essay_title} />)
							: <span>Poste redações para que elas apareçam em seu perfil</span>
						}

					</EssaysArea>

					<EssaysArea title="Todas as redações" list>
						{ essaysData.length > 0 ? essaysData.map(essay => {
								return (<EssayOfUserPage author={essay && essay.author} formated_title={essay.formated_essay_title} title={essay.essay_title} />)
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
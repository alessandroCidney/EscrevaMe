// React
import { useState, useEffect, CSSProperties } from 'react';

// React Router DOM
import { useHistory } from 'react-router-dom';

// React Hot Toast
import { Toaster } from 'react-hot-toast';

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
	id: string;
}

export function UserPage() {
	const history = useHistory();

	const { emailUser,  addUserDataToContext } = useEmailAuth();

	const [userPhotoURL, setUserPhotoURL] = useState('')
	const [essaysData, setEssaysData] = useState([] as Record<string, string>[]);

	let userData = [] as Record<string, string>[];

	const firestore = firebase.firestore();
	const usersColection = firestore.collection("users");

	const params = useParams<UserPageParams>();

	const paramsUsername = params.id;

	// const { googleUser } = useGoogleAuth();

	usersColection.where("username", "==", paramsUsername).get()
		.then(usersQuerySnapshot => {
			usersQuerySnapshot.forEach(usersDoc => {
				userData.push(usersDoc.data());
			});

			if(!userData[0]) {
				history.push('/login');
			}

			setUserPhotoURL(userData[0] ? userData[0].avatar : '');
		})

	let essayData = [] as Record<string, string>[];

	const essaysCollection = firestore.collection("essays");

	essaysCollection.where("author", "==", paramsUsername).get()
		.then(essaysQuerySnapshot => {
			essaysQuerySnapshot.forEach(essaysDoc => {
				essayData.push(essaysDoc.data());
			});

			setEssaysData(essayData.length > 0 ? essayData : []);
		})

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
						<EssayOfUserPage icon="quote" title="A sociedade brasileira nos últimos tempos" />
						<EssayOfUserPage icon="quote" title="A tecnologia contemporânea" />	
					</EssaysArea>

					<EssaysArea title="Todas as redações" list>
						{ essaysData.length > 0 ? essaysData.map(essay => {
								return (<EssayOfUserPage author={essay && essay.author} title={essay.essay_title} />)
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
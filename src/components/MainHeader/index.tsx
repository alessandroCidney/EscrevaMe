// SASS
import './styles.scss';

// Components
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';

// React Router DOM
import { useHistory } from 'react-router-dom';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// Hooks
import { useEmailAuth } from '../../hooks/useEmailAuth';

// Images
import logoWithNameImg from '../../assets/images/logos/logoWithName500px.png';
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

export function MainHeader() {
	const history = useHistory();

	const { emailUser, removeUserContextData } = useEmailAuth();

	async function signOutForEmailMethod() {
		await firebase.auth().signOut();

		removeUserContextData();

		history.push('/login');
	}

	return (
		<header className="main-header">
			<div className="logo">
				<img onClick={() => history.push('/')} src={logoWithNameImg} alt="Logo do EscrevaMe" />
			</div>
			
			{
				emailUser &&
				<nav className="options">
					<button
						onClick={() => history.push(`/users/${emailUser.username}`)}
					>
						<img src={emailUser.avatar ? emailUser.avatar : profilePhotoImg} alt={`Foto de perfil${emailUser.username? ` de ${emailUser.username}` : ''}`} />
					</button>

					<button
						onClick={signOutForEmailMethod}
					>
						<FontAwesomeIcon iconName="fas fa-sign-out-alt" />
					</button>

					
				</nav>
			}
		</header>
	);
}
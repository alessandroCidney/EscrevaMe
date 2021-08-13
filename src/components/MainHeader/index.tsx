// React
import { useState } from 'react';

// SASS
import './styles.scss';

// Components
import { FontAwesomeIcon } from '../../components/FontAwesomeIcon';
import { Button } from '../../components/Button';

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

	const [search, setSearch] = useState('');
	const [showSearch, setShowSearch] = useState(false);

	const { emailUser, removeUserContextData } = useEmailAuth();

	async function signOutForEmailMethod() {
		await firebase.auth().signOut();

		removeUserContextData();

		history.push('/login');
	}

	function searchNow() {

		if(search.trim() === '') {
			return;
		}

		setSearch('');
		history.push(`/users/${search}`);
	}

	return (
		<header className="main-header">

			<div className={`logo ${emailUser && 'dont-show-if-mobile'}`}>
				<img onClick={() => history.push('/')} src={logoWithNameImg} alt="Logo do EscrevaMe" />
			</div>

			{
				showSearch &&
					<div className="search">
						<input
							type="text"
							placeholder="@username"
							onChange={event => setSearch(event.target.value)}
							value={search}
						/>
						<Button 
							className="header-search-button"
							onClick={searchNow}
						>
							<FontAwesomeIcon iconName="fas fa-search" />
						</Button>
					</div>
			}

			{
				emailUser &&
				<nav className="options">
					<button
						onClick={() => setShowSearch(showSearch ? false : true)}
					>
						<FontAwesomeIcon iconName="fas fa-search" />
					</button>

					{
						!showSearch &&
						<>
							<button
								onClick={() => history.push('/main')}
							>
								<FontAwesomeIcon iconName="fas fa-home" />
							</button>

							<button
								onClick={signOutForEmailMethod}
							>
								<FontAwesomeIcon iconName="fas fa-sign-out-alt" />
							</button>
						</>
					}

					<button
						onClick={() => history.push(`/users/${emailUser.user_id}`)}
					>
						<img src={emailUser.avatar ? emailUser.avatar : profilePhotoImg} alt={`Foto de perfil${emailUser.username? ` de ${emailUser.username}` : ''}`} />
					</button>
				</nav>
			}
		</header>
	);
}
// React Router DOM
import { useHistory } from 'react-router-dom';

// Types
import { UserType } from '../../types/types';

// SASS
import './styles.scss';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

type UserOfMainPageType = {
	user: UserType;
}

export function UserOfMainPage({ user }: UserOfMainPageType) {
	const history = useHistory();

	return (
		<button
			className="user"
			onClick={event => history.push(`/users/${user.id}`)}
		>
			<div className="profile-photo">
				<img 
					src={user.avatar ? user.avatar : profilePhotoImg} 
					alt="Foto de perfil" 
				/>
			</div>
			<div className="username">
				{user.username}
			</div>
		</button>
	);
}
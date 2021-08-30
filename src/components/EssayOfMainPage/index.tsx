// React Router DOM
import { useHistory } from 'react-router-dom';

// Components
import { FontAwesomeIcon } from '../FontAwesomeIcon';

// Types
import { EssayType } from '../../types/types';

// SASS
import './styles.scss';

// Util
import { reduceTextWithThreePoints } from '../../util/reduceTextWithThreePoints';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

type EssayOfMainPageType = {
	essay: EssayType;
}

export function EssayOfMainPage({ essay }: EssayOfMainPageType) {
	const history = useHistory();

	return (
		<button 
			className="essay"
			onClick={
				() => history.push(`/essays/${essay.author_id}/${essay.formated_essay_title}`)
			}
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
				<p className="title">
					{reduceTextWithThreePoints(essay.essay_title, 40)}
				</p>
				<div>
					
					<p>
						<FontAwesomeIcon iconName="fas fa-feather" />{essay.essay_content.length}
					</p> 
					
					<p>
						<FontAwesomeIcon iconName="fas fa-heart" />{essay.likes.length}
					</p>
					
					<p>
						<FontAwesomeIcon iconName="fas fa-comment-alt" />{essay.comments.length}
					</p>
				</div>
			</div>
		</button>
	);
}
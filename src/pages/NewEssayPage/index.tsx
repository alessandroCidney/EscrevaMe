// React
import { useState, CSSProperties } from 'react';

// React Router DOM
import { useHistory } from 'react-router-dom';

// React Hot Toast
import toast, { Toaster } from 'react-hot-toast';

// SASS
import './styles.scss';

// Components
import { MainHeader } from '../../components/MainHeader';
import { MainFooter } from '../../components/MainFooter';
import { Button } from '../../components/Button';

// Hooks
import { useEmailAuth } from '../../hooks/useEmailAuth';

// Images
import profilePhotoImg from '../../assets/images/icons/profile-photo-icon.png';

export function NewEssayPage() {
	const history = useHistory();

	const [essayTitle, setEssayTitle] = useState('');
	const [essayContent, setEssayContent] = useState('');

	const { emailUser, addUserDataToContext } = useEmailAuth();

	return (
		<div className="new-essay-page container-column">
			<Toaster />
			<MainHeader />

				<main>

					<h1>Nova Redação</h1>
					<textarea 
						className="title-textarea"
						placeholder="Insira um título para a nova redação"
						onChange={event => setEssayTitle(event.target.value)}
						value={essayTitle}
					></textarea>

					<textarea 
						className="content-textarea"
						placeholder="Começe a escrever sua nova redação aqui"
						onChange={event => setEssayContent(event.target.value)}
						value={essayContent}
					></textarea>

					<Button 
						disabled={(essayTitle !== '' && essayContent !== '') ? false : true}
					>Enviar redação</Button>
				</main>

				{
					emailUser && 
					<aside className="user-items">
						<div className="user-data">
							<div className="profile-photo">
								<img src={emailUser.avatar?emailUser.avatar:profilePhotoImg} alt={`Foto de perfil de ${emailUser.username? ` de ${emailUser.username}` : ''}`} />
							</div>
							<div className="username"><p>@{emailUser && emailUser.username}</p><h4>Está escrevendo</h4></div>
						</div>
					</aside>
				}

			<MainFooter />
		</div>
	);
}
// React
import { useState } from 'react';

// SASS
import './styles.scss';

// Components
import { MainHeader } from '../../components/MainHeader';
import { MainFooter } from '../../components/MainFooter';
import { Button } from '../../components/Button';

export function NewEssayPage() {
	const [essayTitle, setEssayTitle] = useState('');
	const [essayContent, setEssayContent] = useState('');

	return (
		<div className="new-essay-page container-column">
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

				<aside className="user-items">
					<div className="user-data">
						<div className="profile-photo"></div>
						<div className="username"><p>Alessandro Cídney</p><h4>Está escrevendo</h4></div>
					</div>
				</aside>


			<MainFooter />
		</div>
	);
}
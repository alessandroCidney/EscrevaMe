// Components
import { HomeHeader } from '../../components/HomeHeader';

// SASS
import './styles.scss';

// React Router DOM
import { useHistory } from 'react-router-dom';

// Hooks
import { useEmailAuth } from '../../hooks/useEmailAuth';

// Images
import pencilGif from '../../assets/images/animations/pencil.gif';
import computerImg from '../../assets/images/computer/computer.png';

export function HomePage() {
	const history = useHistory();

	const { emailUser } = useEmailAuth();

	if(emailUser) {
		history.push('/login');
	}

	return (
		<div className="home-page container-column">
			<HomeHeader />

			<main>
				<div className="highlight">
					<img src={pencilGif} alt="Imagem de lápis animada" />

					<div className="text">
						Estude redação com pessoas de todo o mundo.

						<input placeholder="Pesquise um tema" />
					</div>
				</div>

				<div className="initial-info dont-show">
					<img src={computerImg} className="float-animated" alt="Computador com imagem de uma pessoa escrevendo" />

					<div className="info">
						<div className="step">
							<div className="step-number blue">1</div>
							<div className="step-text">Personalize seu perfil</div>
						</div>
						<div className="step translated">
							<div className="step-number blue">2</div>
							<div className="step-text">Poste suas redações</div>
						</div>
						<div className="step">
							<div className="step-number blue">3</div>
							<div className="step-text">Interaja e se desenvolva</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
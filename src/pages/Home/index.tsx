// Components
import { HomeHeader } from '../../components/HomeHeader';

// SASS
import './styles.scss';

// Images
import pencilGif from '../../assets/images/animations/pencil.gif';

export function Home() {
	

	return (
		<div className="home-page container-column">
			<HomeHeader />

			<main>
				<div className="highlight">
					<img src={pencilGif} alt="Imagem de lápis animada" />

					<div className="text">
						Estude redação com pessoas de todo o mundo.
					</div>
				</div>

				<div className="initial-info">
					
				</div>
			</main>
		</div>
	);
}
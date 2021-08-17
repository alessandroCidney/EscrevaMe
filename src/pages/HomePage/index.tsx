// React
import { useState, useEffect } from 'react';

// Components
import { HomeHeader } from '../../components/HomeHeader';
import { MainFooter } from '../../components/MainFooter';

// SASS
import './styles.scss';

// React Router DOM
import { useHistory } from 'react-router-dom';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Images
import logoImg from '../../assets/images/logos/logoWithName.svg';
import computerImg from '../../assets/images/computer/computer.png';

export function HomePage() {
	const history = useHistory();
	
	const { authUser } = useAuth();

	const [showImage, setShowImage] = useState(false);

	if(authUser) {
		history.push('/main');
	}

	// Responsável pelo aparecimento/desaparecimento da imagem de cmputador
	useEffect(() => {
		setInterval(() => {
			if(window.scrollY + 1/2 * window.innerHeight > window.innerHeight) {
				if(!showImage) {
					setShowImage(true);
				}
			} else {
				if(showImage) {
					setShowImage(false);
				}
			}
		}, 500)
	}, [showImage]);

	return (
		<div className="home-page container-column">
			<HomeHeader />

			<div className="highlight">
				<img src={logoImg} alt="Logo do EscrevaMe" />

				<h1>
					O paraíso para leitores e escritores.
				</h1>
			</div>

			<div className={`test ${!showImage && 'without-image'}`}>
				<h2>Leve a escrita para o seu cotidiano.</h2>

				<div className="image">
					{
						showImage &&
						<img 
							src={computerImg} 
							alt="Imagem de um computador" 
						/>
						
					}
				</div>
				
			</div>

			<MainFooter />
		</div>
	);
}
// React
import { useState, useEffect } from 'react';

// Components
import { HomeHeader } from '../../components/HomeHeader';
import { MainFooter } from '../../components/MainFooter';
import { Button } from '../../components/Button';

// SASS
import './styles.scss';

// React Router DOM
import { useHistory } from 'react-router-dom';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Images
import logoImg from '../../assets/images/logos/logoWithName.svg';
import computerImg from '../../assets/images/computer/computer.png';
import studyImg from '../../assets/images/people/study.png';

export function HomePage() {
	const history = useHistory();
	
	const { authUser } = useAuth();

	const [showImage, setShowImage] = useState(window.innerWidth > 760 ? false : true);

	if(authUser) {
		history.push('/main');
	}

	// Responsável pelo aparecimento/desaparecimento da imagem de cmputador
	useEffect(() => {

		// A transição não será realizada em smartphones
		if(window.innerWidth > 760) {

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
		}
	}, [showImage]);

	return (
		<>
			<HomeHeader />

			<main className="home-page container-column">

				<div className="highlight">
					<img src={logoImg} alt="Logo do EscrevaMe" />

					<h1>
						O paraíso para leitores e escritores.
					</h1>
				</div>

				<div className={`second ${!showImage && 'without-image'}`}>
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

				<div className='third'>
					<div className="image">
						<img 
							src={studyImg}
							alt="Imagem de pessoa estudando"
						/>
					</div>

					<div className="text">
						<h2>Compartilhe suas redações e interaja com pessoas de todo o mundo.</h2>	
						<Button>Cadastre-se</Button>
					</div>
					
				</div>
				
			</main>

			<MainFooter />
		</>
	);
}
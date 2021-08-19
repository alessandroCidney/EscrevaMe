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

// Util
import { isMobile } from '../../util/isMobile';

// Images
import logoImg from '../../assets/images/logos/logoWithName.svg';
import computerImg from '../../assets/images/computer/computer.png';
import studyImg from '../../assets/images/people/study.png';

export function HomePage() {
	const history = useHistory();
	
	const { authUser } = useAuth();

	const [showComputerImage, setshowComputerImage] = useState(!isMobile());
	const [showStudyImage, setshowStudyImage] = useState(!isMobile());

	if(authUser) {
		history.push('/main');
	}

	// Responsável pelo aparecimento/desaparecimento da imagem de cmputador
	useEffect(() => {

		setInterval(() => {
			// A transição não será realizada em smartphones
			if(isMobile()) {
				return;
			} 

			if(window.scrollY + 1/2 * window.innerHeight > window.innerHeight) {
				if(!showComputerImage) {
					setshowComputerImage(true);
				}
			} else {
				if(showComputerImage) {
					setshowComputerImage(false);
				}
			}
		}, 500);
		
	}, [showComputerImage]);

	useEffect(() => {
		
		setInterval(() => {
			
			if(isMobile()) {
				return;
			}

			if(window.scrollY + 1/2 * window.innerHeight > 2.5*window.innerHeight) {
				if(!showStudyImage) {
					setshowStudyImage(true);
				}
			} else {
				if(showStudyImage) {
					setshowStudyImage(false);
				}
			}
		}, 500);

	}, [showStudyImage])

	function redirectToJoinUsPage() {
		history.push('/joinus');
	}

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

				<div className={`second ${!showComputerImage && 'without-image'}`}>
					<h2>Leve a escrita para o seu cotidiano.</h2>

					<div className="image">
						{
							(showComputerImage || isMobile()) &&
							<img 
								src={computerImg} 
								alt="Imagem de um computador" 
							/>
							
						}
					</div>
				</div>

				<div className={`third ${showStudyImage && 'without-image'}`}>
					<div className="image">
						{
							(showStudyImage || isMobile()) &&
							<img 
								src={studyImg}
								alt="Imagem de pessoa estudando"
							/>
						}
					</div>

					<div className="text">
						<h2>Compartilhe suas redações e interaja com pessoas de todo o mundo.</h2>	
						<Button
							onClick={redirectToJoinUsPage}
						>
							Cadastre-se
						</Button>
					</div>
					
				</div>
				
			</main>

			<MainFooter />
		</>
	);
}
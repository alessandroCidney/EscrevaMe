// React
import { useState, useEffect } from 'react';

// React Router DOM
import { Link } from 'react-router-dom';

// SASS
import './styles.scss';

// Images
import logoImg from '../../assets/images/logos/logoWithName.svg';

export function HomeHeader() {

	const [headerWhite, setHeaderWhite] = useState(false);

	useEffect(() => {

		// Para controlar a cor do header
		setInterval(() => {
			if(window.scrollY !== 0) {

				// Os ifs interiores são para evitar renderizações excessivas
				if(!headerWhite) {
					setHeaderWhite(true);
				}
			} else {
				if(headerWhite) {
					setHeaderWhite(false);
				}
			}	
		}, [500]);

	}, [headerWhite])

	return (
		<header className={`home-header ${headerWhite && 'white-version'}`}>
			<div className="logo">
				<img src={logoImg} alt="Logo do EscrevaMe" />
			</div>

			<nav>
				<ul>
					<li><Link to="/joinus">Cadastre-se</Link></li>
					<li><Link to="/login">Entrar</Link></li>
				</ul>
			</nav>
		</header>
	);
}
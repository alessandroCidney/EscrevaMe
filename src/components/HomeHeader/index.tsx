// React
import { useState } from 'react';

// React Router DOM
import { Link } from 'react-router-dom';

// SASS
import './styles.scss';

// Images
import logoImg from '../../assets/images/logos/logoWithName500px.png';

export function HomeHeader() {
	const [whiteHeader, setWhiteHeader] = useState(false);


	return (
		<header className={`home-header ${whiteHeader && 'white-header'}`}>
			<div className="logo">
				<img src={logoImg} />
			</div>

			<nav>
				<ul>
					<li><Link to="/joinus">Cadastre-se</Link></li>
					<li><Link to="/login">Faça login</Link></li>
				</ul>
			</nav>
		</header>
	);
}
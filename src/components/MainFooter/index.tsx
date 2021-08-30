// React Router DOM
import { Link } from 'react-router-dom';

// SASS
import './styles.scss';

export function MainFooter() {

	return (
		<footer className="main-footer">
			<div className="footer-list">
				<h6>Sobre o Projeto</h6>
				<ul>
					<li><a target="_blank" rel="noreferrer" href="https://github.com/alessandroCidney/EscrevaMe">GitHub</a></li>
					<li><a target="_blank" rel="noreferrer" href="https://github.com/alessandroCidney/EscrevaMe">Guia</a></li>
				</ul>
			</div>

			<div className="footer-list">
				<h6>Sobre o autor</h6>
				<ul>
					<li><a target="_blank" rel="noreferrer" href="https://github.com/alessandroCidney">GitHub</a></li>
					<li><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/acidn">LinkedIn</a></li>
				</ul>
			</div>
			<div className="footer-list">
				<h6>Importante</h6>
				<ul>
					<li><Link to="/privacypolicy">Política de Privacidade</Link></li>
					<li><Link to="/datapolicy">Política de tratamento e segurança de dados</Link></li>
				</ul>
			</div>

		</footer>
	);
}
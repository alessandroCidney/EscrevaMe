// SASS
import './styles.scss';

export function MainFooter() {

	return (
		<footer className="main-footer">
			<div className="footer-list">
				<h6>Sobre o Projeto</h6>
				<ul>
					<li><a target="_blank" href="https://github.com/alessandroCidney/EscrevaMe">GitHub</a></li>
					<li><a href="https://github.com/alessandroCidney/EscrevaMe">Guia</a></li>
				</ul>
			</div>

			<div className="footer-list">
				<h6>Sobre o autor</h6>
				<ul>
					<li><a target="_blank" href="https://github.com/alessandroCidney">GitHub</a></li>
					<li><a target="_blank" href="https://www.linkedin.com/in/acidn">LinkedIn</a></li>
				</ul>
			</div>

			<div className="footer-list">
				<h6>Ajude-nos a crescer</h6>
				<ul>
					<li><a href="#">Faça uma doação</a></li>
					<li><a href="#">Compartilhe o projeto</a></li>
				</ul>
			</div>

			<div className="footer-list">
				<h6>Importante</h6>
				<ul>
					<li><a href="#">Política de Privacidade</a></li>
					<li><a href="#">A importância da colaboração</a></li>
				</ul>
			</div>

		</footer>
	);
}
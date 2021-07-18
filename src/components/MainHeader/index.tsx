// SASS
import './styles.scss';

// Images
import logoWithNameImg from '../../assets/images/logos/logoWithName500px.png';

export function MainHeader() {

	return (
		<header className="main-header">
			<div className="logo">
				<img src={logoWithNameImg} alt="Logo do EscrevaMe" />
			</div>
		</header>
	);
}
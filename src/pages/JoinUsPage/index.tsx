// SASS
import './styles.scss';

// Components
import { Button } from '../../components/Button';
import { AsideWithMan } from '../../components/AsideWithMan';

// Images
import logoWithNameImg from '../../assets/images/logos/logoWithName500px.png';
import googleIconImg from '../../assets/images/icons/google-icon.png';
import facebookIconImg from '../../assets/images/icons/facebook-icon.png';

export function JoinUsPage() {

	return (
		<div className="join-us container-row">
			<AsideWithMan />

			<main>
				<div>
					<img src={logoWithNameImg} alt="Logo do EscrevaMe" />
				</div>
			</main>
		</div>
	);
}
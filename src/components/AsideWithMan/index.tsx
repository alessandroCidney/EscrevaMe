// SASS
import './styles.scss';

// Images
import manImg from '../../assets/images/people/man.png';

export function AsideWithMan() {

	return (
		<aside>
          <img src={manImg} alt="Imagem de pessoa estudando" />
        </aside>
	);
}
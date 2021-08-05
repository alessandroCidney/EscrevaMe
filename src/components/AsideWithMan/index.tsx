// SASS
import './styles.scss';

// Images
import manImg from '../../assets/images/people/man.png';

export function AsideWithMan() {

	return (
		<aside className="aside-with-man dont-show-if-mobile">
          <img src={manImg} alt="Imagem de pessoa estudando" />
        </aside>
	);
}
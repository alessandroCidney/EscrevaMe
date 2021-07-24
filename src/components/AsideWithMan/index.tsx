// SASS
import './styles.scss';

// Images
import manImg from '../../assets/images/people/man.png';

export function AsideWithMan() {

	return (
		<aside className="aside-with-man">
          <img src={manImg} alt="Imagem de pessoa estudando" />
        </aside>
	);
}
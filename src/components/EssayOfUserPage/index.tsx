// SASS
import './styles.scss';

// Components
import { FontAwesomeIcon } from '../FontAwesomeIcon';

// Types
type EssayProps = {
	title?: string;
	highlight?: boolean;
	icon?: string;
};

export function EssayOfUserPage({ title="Sem título", highlight=false, icon="text" }: EssayProps) {

	return (
		<div className={`essay-of-user-page ${highlight && 'highlight'}`}>
			<h3>{title}</h3>
			<div className="image">
				{ icon==="quote" ? (
					<FontAwesomeIcon iconName="fas fa-quote-left" />
				) : (
					<FontAwesomeIcon iconName="fas fa-align-justify" />
				)}
			</div>
			<div className="footer">
				<FontAwesomeIcon iconName="fas fa-feather" />
				<p>1234</p>
				{/*<FontAwesomeIcon iconName="fas fa-eye" />
				<p>5678</p>*/}
			</div>
		</div>
	);
}
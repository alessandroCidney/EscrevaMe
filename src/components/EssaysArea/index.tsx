// React
import { ReactNode } from 'react';

// SASS
import './styles.scss';

type EssaysAreaProps = {
	title?: string;
	children?: ReactNode;
	highlight?: boolean;
}

export function EssaysArea({ title="", children, highlight=false }: EssaysAreaProps) {

	return (
		<div className={`essays-area ${children && highlight ? 'highlight': ''}`}>
			<h2 className={children && highlight ? 'highlight' : ''}>{title}</h2>
			<div className={`essays ${children && highlight ? 'highlight': ''}`}>
				{children ? children : "Você deve postar redações para que elas apareçam em seu perfil"}
			</div>
		</div>
	);
}
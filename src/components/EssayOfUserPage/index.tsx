// SASS
import './styles.scss';

// React
import { useState } from 'react';

// Firebase
import { firebase } from '../../services/firebaseService/firebase';

// Components
import { FontAwesomeIcon } from '../FontAwesomeIcon';

// React Router DOM
import { useHistory } from 'react-router-dom';

// Util
import { reduceTextWithThreePoints } from '../../util/reduceTextWithThreePoints';

// Types
type EssayProps = {
	title?: string;
	formated_title?: string;
	author_id?: string | undefined;
	highlight?: boolean;
	icon?: string;
};

type CommentType = {
	comment_author: string;
	comment_author_avatar: string;
	comment_content: string;
	created_at: number;
}

type EssayType = {
	essay_title: string;
	formated_essay_title: string;
	essay_content: string;
	author_username: string;
	author_id: string;
	author_avatar: string;
	created_at: number;
	likes: string[];
	comments: CommentType[];
}

export function EssayOfUserPage({ formated_title="Sem título", title="Sem título", highlight=false, icon="text", author_id=undefined }: EssayProps) {
	// Usando o hook useHistory
	const history = useHistory();

	// Estados para o número de caracteres da redação
	const [charactersNumber, setCharactersNumber] = useState(0);

	// Iniciando o firestore e captando a coleção "essays"
	const firestore = firebase.firestore();
	const essaysCollection = firestore.collection("essays");

	let essayData = [] as EssayType[];

	if(author_id) {
		// Pegando todas as redações do usuário
		essaysCollection.where("author_id", "==", author_id).get()
			.then((essaysQuerySnapshot => {

				// Inserindo os dados de cada redação no array
				essaysQuerySnapshot.forEach(essaysDoc => {
					let data = essaysDoc.data() as EssayType;
					essayData.push(data);
				});

				// Pegando o número 
				essayData.forEach(essay => {
					if(essay.formated_essay_title === formated_title) {
						setCharactersNumber(essay.essay_content.length);
					}
				})
			}));
	}
	
	function redirectToEssay() {
		if(author_id) {
			history.push(`/essays/${author_id}/${formated_title}`);
		}
	}

	return (
		<button className={`essay-of-user-page ${highlight && 'highlight'}`} onClick={redirectToEssay}>
			<h3>{reduceTextWithThreePoints(title, 35)}</h3>
			<div className="image">
				{ icon==="quote" ? (
					<FontAwesomeIcon iconName="fas fa-quote-left" />
				) : (
					<FontAwesomeIcon iconName="fas fa-align-justify" />
				)}
			</div>
			<div className="footer">
				<FontAwesomeIcon iconName="fas fa-feather" />
				<p>{charactersNumber}</p>
				{/*<FontAwesomeIcon iconName="fas fa-eye" />
				<p>5678</p>*/}
			</div>
		</button>
	);
}
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

// Types
type EssayProps = {
	title?: string;
	formated_title?: string;
	author?: string | undefined;
	highlight?: boolean;
	icon?: string;
};

export function EssayOfUserPage({ formated_title="", title="Sem título", highlight=false, icon="text", author=undefined }: EssayProps) {
	const history = useHistory();

	const [charactersNumber, setCharactersNumber] = useState(0);

	const firestore = firebase.firestore();
	const essaysCollection = firestore.collection("essays");

	let essayData = [] as Record<string, string>[];

	if(author) {
		essaysCollection.where("author", "==", author).get()
			.then((essaysQuerySnapshot => {
				essaysQuerySnapshot.forEach(essaysDoc => {
					essayData.push(essaysDoc.data());
				});

				essayData.forEach(essay => {
					if(essay.formated_essay_title == formated_title) {
						setCharactersNumber(essay.essay_content.length);
					}
				})
			}));
	}

	function redirectToEssay() {
		if(author) {
			history.push(`/essays/${author}/${formated_title}`);
		}
	}

	return (
		<button className={`essay-of-user-page ${highlight && 'highlight'}`} onClick={redirectToEssay}>
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
				<p>{charactersNumber}</p>
				{/*<FontAwesomeIcon iconName="fas fa-eye" />
				<p>5678</p>*/}
			</div>
		</button>
	);
}
// React
import { useState, useEffect } from 'react';

// Firebase
import { firebase } from '../services/firebaseService/firebase';

type EssayType = {
	id: string;
	essay_title: string;
	formated_essay_title: string;
	essay_content: string;
	author: string;
	author_avatar: string;
	created_at: Date;
	likes: string[];
}

export function useEssay(username: string, essayFormatedTitle: string, update: number) {
	let [essay, setEssay] = useState<EssayType>();

	const firestore = firebase.firestore();
	const essaysCollection = firestore.collection("essays");

	const essaysAuthorQuery = essaysCollection.where("author", "==", username);
	const essaysAuthorAndTitleQuery = essaysAuthorQuery.where("formated_essay_title", "==", essayFormatedTitle);

	useEffect(() => {

		essaysAuthorAndTitleQuery.get()
		.then(essaysQuerySnapshot => {
			essaysQuerySnapshot.forEach(essaysDoc => {
				const data = essaysDoc.data();

				setEssay({
					id: essaysDoc.id,
					essay_title: data.essay_title,
					formated_essay_title: data.formated_essay_title,
					essay_content: data.essay_content,
					author: data.author,
					author_avatar: data.author_avatar,
					created_at: data.created_at,
					likes: data.likes
				});
			})
		})
	}, [update]);

	return { essay }
}
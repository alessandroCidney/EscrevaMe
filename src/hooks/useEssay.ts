// React
import { useState, useEffect } from 'react';

// React Router DOM
import { useHistory } from 'react-router-dom';

// React Hot Toast
import toast from 'react-hot-toast';

// Firebase
import { firebase } from '../services/firebaseService/firebase';

type CommentType = {
	comment_author: string;
	comment_author_avatar: string;
	comment_content: string;
	created_at: Date;
}

type EssayType = {
	id: string;
	essay_title: string;
	formated_essay_title: string;
	essay_content: string;
	author: string;
	author_avatar: string;
	created_at: Date;
	likes: string[];
	comments: CommentType[];
}

export function useEssay(username: string, essayFormatedTitle: string, update: number) {
	const history = useHistory();

	let [essay, setEssay] = useState<EssayType>();

	const firestore = firebase.firestore();
	const essaysCollection = firestore.collection("essays");

	const essaysAuthorQuery = essaysCollection.where("author", "==", username);
	const essaysAuthorAndTitleQuery = essaysAuthorQuery.where("formated_essay_title", "==", essayFormatedTitle);

	useEffect(() => {

		essaysAuthorAndTitleQuery.get()
		.then(essaysQuerySnapshot => {
			if(essaysQuerySnapshot.empty) {
				toast.error("A redação não existe");
				history.push('/');
			}

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
					likes: data.likes,
					comments: data.comments
				});
			})
		})
	}, [update]);

	return { essay }
}
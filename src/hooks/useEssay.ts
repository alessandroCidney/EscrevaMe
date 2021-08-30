// React
import { useState, useEffect, useCallback } from 'react';

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
	created_at: number;
}

type EssayType = {
	id: string;
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

export function useEssay(user_id: string, essayFormatedTitle: string, update: number) {
	const history = useHistory();

	// Estado para os dados da redação
	// É diferente da estrutura das redações armazenadas no Firebase
	let [essay, setEssay] = useState<EssayType>();

	const fetchEssay = useCallback(() => {

		// Iniciando o Firebase
		const firestore = firebase.firestore();
		const essaysCollection = firestore.collection("essays");

		// Definindo as consultas que serão realizadas
		const essaysAuthorQuery = essaysCollection.where("author_id", "==", user_id);
		const essaysAuthorAndTitleQuery = essaysAuthorQuery.where("formated_essay_title", "==", essayFormatedTitle);

		// Captando os dados da redação e adicionando no estado "essay"
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
					author_username: data.author_username,
					author_id: data.author_id,
					author_avatar: data.author_avatar,
					created_at: data.created_at,
					likes: data.likes,
					comments: data.comments
				});
			})
		})
	}, [history, essayFormatedTitle, user_id]);

	useEffect(() => {
		fetchEssay();
	}, [fetchEssay, update]);

	return { essay };
}
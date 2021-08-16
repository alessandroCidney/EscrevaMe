// React
import { createContext, useEffect, ReactNode, useState } from 'react';

import toast from 'react-hot-toast';

// Firebase
import { firebase } from '../services/firebaseService/firebase';

type FirestoreUser = {
	avatar: string | null;
	username: string | null;
	email: string | null;
}

type User = {
	user_id: string;
	username: string | null;
	avatar: string | null;
}

type AuthContextType = {
	authUser: User | undefined;
	signInWithGoogle: () => Promise<void>;
	addUserDataToContext: (user_id: string, username: string | null, avatar: string | null) => void;
	removeUserContextData: () => void;
}

type AuthContextProviderProps = {
	children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

	// Estado que guarda as informações do usuário
	const [authUser, setAuthUser] = useState<User>();

	useEffect(() => {

		// Quando a página é recarregada, as informações sobre o usuários
		// são obtidas novamente caso ele já estivesse logado.
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if(user) {
				const { displayName, email, photoURL } = user;

				if(!displayName || !email || !photoURL) {
					throw new Error("Missing information from account");
				} else {

					const usersColection = firebase.firestore().collection("users");

					usersColection.where("email", "==", email).get()
						.then(usersQuerySnapshot => {
							let id = '';

							usersQuerySnapshot.forEach(usersDoc => {
								id = usersDoc.id;
							});

							if(id !== '') {
								setAuthUser({
									user_id: id,
									username: displayName,
									avatar: photoURL 
								});
							}
						});
				}	
			}
		});

		return () => {
			unsubscribe();
		}
	}, []);

	async function signInWithGoogle() {

		// Fazendo login com o Google
		const googleProvider = new firebase.auth.GoogleAuthProvider();
		
		try {
			const result = await firebase.auth().signInWithPopup(googleProvider);

			if(result.user) {

				// As credenciais são obtidas
				const { displayName, photoURL, email } = result.user;

				// Testando se elas estão preenchidas
				if(!displayName || !photoURL || !email) {
					throw new Error('Missing information from Google account');
				}

				const usersColection = firebase.firestore().collection("users");

				// Checando na coleção de usuários se o usuário já existe
				const usersQuerySnapshot = await usersColection.where("email", "==", email).get();

				// Se não existir, ele é adicionado e recuperamos o ID do documento
				if(usersQuerySnapshot.empty) {
					const { id } = await usersColection.add({
						avatar: photoURL,
						username: displayName,
						email: email
					});

					setAuthUser({
						user_id: id,
						username: displayName,
						avatar: photoURL
					});
				} else {

					// Se existir, recuperamos diretamente o ID do documento
					let userDocumentID = '';
					let userDocumentDisplayName = '';
					let userDocumentAvatar = '';

					usersQuerySnapshot.forEach(usersDoc => {
						userDocumentID = usersDoc.id;
						let userData = usersDoc.data() as FirestoreUser;

						userDocumentDisplayName = userData.username !== null ? userData.username : '';
						userDocumentAvatar = userData.avatar !== null ? userData.avatar : '';
					});

					if(userDocumentID !== '' && userDocumentDisplayName !== '' && userDocumentAvatar !== '') {
						setAuthUser({
							user_id: userDocumentID,
							username: userDocumentDisplayName,
							avatar: userDocumentAvatar 
						});
					}
				}
			}
		} catch (err) {
			toast.error("Não foi possível conectar o usuário");
			console.log(err);
		}

		
	}

	function addUserDataToContext(user_id: string, username: string | null, avatar: string | null) {
		// Função para adicionar as informações do usuário ao contexto
		setAuthUser({
			user_id: user_id,
			username: username,
			avatar: avatar 
		});
	}

	function removeUserContextData() {
		setAuthUser(undefined);
	}

	return (
		<AuthContext.Provider value={{authUser, signInWithGoogle, addUserDataToContext, removeUserContextData}}>
			{props.children}
		</AuthContext.Provider>	
	)
}
// React
import { createContext, useEffect, ReactNode, useState } from 'react';

// Firebase
import { firebase } from '../services/firebaseService/firebase';

type EmailUser = {
	user_id: string;
	username: string | null;
	avatar: string | null;
}

type EmailAuthContextType = {
	emailUser: EmailUser | undefined;
	addUserDataToContext: (user_id: string, username: string | null, avatar: string | null) => void;
	removeUserContextData: () => void;
}

type EmailAuthContextProviderProps = {
	children: ReactNode
}

export const EmailAuthContext = createContext({} as EmailAuthContextType);

export function EmailAuthContextProvider(props: EmailAuthContextProviderProps) {

	// Estado que guarda as informações do usuário
	const [emailUser, setEmailUser] = useState<EmailUser>();

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
							let id = ''

							usersQuerySnapshot.forEach(usersDoc => {
								id = usersDoc.id;
							});

							if(id !== '') {
								setEmailUser({
									user_id: id,
									username: displayName,
									avatar: photoURL 
								})
							}
						})
				}	
			}
		});

		return () => {
			unsubscribe();
		}
	}, []);

	function addUserDataToContext(user_id: string, username: string | null, avatar: string | null) {
		// Função para adicionar as informações do usuário ao contexto
		setEmailUser({
			user_id: user_id,
			username: username,
			avatar: avatar 
		})
	}

	function removeUserContextData() {
		setEmailUser(undefined);
	}

	return (
		<EmailAuthContext.Provider value={{emailUser, addUserDataToContext, removeUserContextData}}>
			{props.children}
		</EmailAuthContext.Provider>	
	)
}
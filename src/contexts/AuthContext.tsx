// React
import { createContext, useEffect, ReactNode, useState } from 'react';

// Firebase
import { firebase } from '../services/firebaseService/firebase';

type User = {
	user_id: string;
	username: string | null;
	avatar: string | null;
}

type AuthContextType = {
	authUser: User | undefined;
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
							let id = ''

							usersQuerySnapshot.forEach(usersDoc => {
								id = usersDoc.id;
							});

							if(id !== '') {
								setAuthUser({
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
		<AuthContext.Provider value={{authUser, addUserDataToContext, removeUserContextData}}>
			{props.children}
		</AuthContext.Provider>	
	)
}
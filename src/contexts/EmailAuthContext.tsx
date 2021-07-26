// React
import { createContext, useEffect, ReactNode, useState } from 'react';

// Firebase
import { firebase } from '../services/firebaseService/firebase';

type EmailUser = {
	username: string;
	avatar: string;
}

type EmailAuthContextType = {
	emailUser: EmailUser | undefined;
	addUserDataToContext: (username: string, avatar: string) => void;
	removeUserContextData: () => void;
}

type EmailAuthContextProviderProps = {
	children: ReactNode
}

export const EmailAuthContext = createContext({} as EmailAuthContextType);

export function EmailAuthContextProvider(props: EmailAuthContextProviderProps) {

	const [emailUser, setEmailUser] = useState<EmailUser>();

	const firestore = firebase.firestore();
	const usersColection = firestore.collection("users");

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if(user) {
				const { email } = user;

				if(!email) {
					throw new Error("Missing information from account");
				} else {
					console.log("Informações recebidas", email)
					usersColection.where("email", "==", email).get()
					.then(usersQuerySnapshot => {

						const userData = [] as Record<string, string>[];

						usersQuerySnapshot.forEach(usersDoc => {
							userData.push(usersDoc.data());
						})

						if(userData[0]) {
							console.log(userData[0])
							setEmailUser({
								username: userData[0].username,
								avatar: userData[0].avatar
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

	function addUserDataToContext(username: string, avatar: string) {
		setEmailUser({
			username: username,
			avatar: avatar
		});
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
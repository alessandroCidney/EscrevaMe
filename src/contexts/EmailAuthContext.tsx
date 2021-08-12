// React
import { createContext, useEffect, ReactNode, useState } from 'react';

// Firebase
import { firebase } from '../services/firebaseService/firebase';

type EmailUser = {
	user_id: string;
	username: string;
	avatar: string | null;
}

type EmailAuthContextType = {
	emailUser: EmailUser | undefined;
	addUserDataToContext: (user_id: string, username: string, avatar: string) => void;
	removeUserContextData: () => void;
}

type EmailAuthContextProviderProps = {
	children: ReactNode
}

export const EmailAuthContext = createContext({} as EmailAuthContextType);

export function EmailAuthContextProvider(props: EmailAuthContextProviderProps) {

	const [emailUser, setEmailUser] = useState<EmailUser>();

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(user => {
			if(user) {
				const { displayName, uid, photoURL } = user;

				if(!displayName || !uid || !photoURL) {
					throw new Error("Missing information from account");
				} else {

					setEmailUser({
						user_id: uid,
						username: displayName,
						avatar: photoURL 
					})
				}	
			}
		});

		return () => {
			unsubscribe();
		}
	}, []);

	function addUserDataToContext(user_id: string, username: string, avatar: string) {
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
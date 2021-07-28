// React
import { createContext, useEffect, ReactNode, useState } from 'react';

// Firebase
import { firebase, auth } from '../services/firebaseService/firebase';

/**
 * O GoogleAuthContext é um context que armazena informações obtidas através
 * da autenticação com o Google.
 * 
 * */

type User = {
	id: string;
	name: string;
	avatar: string; 
}

type GoogleAuthContextType = {
	googleUser: User | undefined;
	signInWithGoogle: () => Promise<void>;
}

type GoogleAuthContextProviderProps = {
	children: ReactNode;
}

export const GoogleAuthContext = createContext({} as GoogleAuthContextType);

export function GoogleAuthContextProvider(props: GoogleAuthContextProviderProps) {
	const [googleUser, setGoogleUser] = useState<User>();

	/**
	 * O useEffect a seguir tem as seguintes funções:
	 * 
	 * - Detectar se o usuário já autenticou há pouco tempo
	 * 		- Se sim, ele retorna as informações do usuário e as insere em googleUser através 
	 * 		de setGoogleUser, assim como a função signInWithGoogle;
	 * 
	 * - Retornar uma função unsubscribe para desinscrever o usuário de todos os 
	 * Event Listeners.
	 * 
	 * */

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if(user) {
		      	const { displayName, photoURL, uid } = user;

		      	if(!displayName || !photoURL) {
		        	console.log("Missing information from Google account");
		        	return;
		      	}

		      	setGoogleUser({
		        	id: uid,
		        	name: displayName,
		        	avatar: photoURL,
		      	});
	    	}
		});

		return () => {
			unsubscribe();
		}
	}, []);

	/**
	 * A função signInWithGoogle realiza a autenticação com o Google
	 * pelo método que a documentação do Firebase recomenda.
	 * 
	 * Após isso, insere as informações do usuário em googleUser através
	 * de setGoogleUser.
	 * 
	 * */

	async function signInWithGoogle() {
	    const provider = new firebase.auth.GoogleAuthProvider();

	    const result = await auth.signInWithPopup(provider);

	    if(result.user) {
	      const { displayName, photoURL, uid } = result.user;

	      if(!displayName || !photoURL) {
	        throw new Error("Missing information from Google account");
	      }

	      setGoogleUser({
	        id: uid,
	        name: displayName,
	        avatar: photoURL,
	      });
	    }
  	}

  	/**
  	 * Os children enviados passarão a ter acesso às informações do usuário
  	 * e à função signInWithGoogle.
  	 * 
  	 * */

  	return (
  		<GoogleAuthContext.Provider value={{googleUser, signInWithGoogle}}>
  			{props.children}
  		</GoogleAuthContext.Provider>
  	);
}
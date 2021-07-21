// React
import { useContext } from 'react';

// Contexts
import { GoogleAuthContext } from '../contexts/GoogleAuthContext';

export function useGoogleAuth() {
	const googleAuthContextData = useContext(GoogleAuthContext);

	return googleAuthContextData;
}
// React
import { useContext } from 'react';

// Contexts
import { GoogleAuthContext } from '../contexts/GoogleAuthContext';

export function useGoogleAuth() {
	const googleAuthData = useContext(GoogleAuthContext);

	return googleAuthData;
}
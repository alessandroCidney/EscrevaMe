// React
import { useContext } from 'react';

// Contexts
import { AuthContext } from '../contexts/EmailAuthContext';

export function useEmailAuth() {
	const authData = useContext(AuthContext);

	return authData;
}
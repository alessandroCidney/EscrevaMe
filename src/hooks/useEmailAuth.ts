// React
import { useContext } from 'react';

// Contexts
import { EmailAuthContext } from '../contexts/EmailAuthContext';

export function useEmailAuth() {
	const authData = useContext(EmailAuthContext);

	return authData;
}
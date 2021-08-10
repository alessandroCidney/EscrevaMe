import { validateEmail } from './validateEmail';

export function testUsernameEmailAndPasswordInputValues(
	username: string,
	email: string,
	password: string
) {
	if(
		!username || username.trim()==='' || 
		!email || email.trim()==='' || 
		!password || password.trim()==='' || 
		password.trim().length<6
	) {
		return false;
	}

	if(username.trim().split(" ").length > 1) {
		return false;
	}

	if(username.trim().length > 16) {
		return false;
	}

	if(!validateEmail(email)) {
		return false;
	}

	return true;
}
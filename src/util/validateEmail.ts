export function validateEmail(email: string) {
	let result = /\S+@\S+\.\S+/;
  	return result.test(email);
}
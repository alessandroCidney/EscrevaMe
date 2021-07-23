import { useHistory } from 'react-router-dom';

export function Home() {
	const history = useHistory();

	history.push('/login');

	return (
		<div></div>
	);
}
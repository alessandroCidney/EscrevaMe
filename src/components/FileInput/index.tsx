// React
import { useState, FormEvent } from 'react';

export function FileInput() {
	const [image, setImage] = useState<File>();

	async function uploadImage(event: FormEvent) {
		event.preventDefault();

		if(image) {
			console.log(image);	// Retorna o File
		}
	}

	return (
		<form onSubmit={uploadImage}>
	    	<input type="file" name="bla" className="fileInput" onChange={event => {
				if(!event.target.files) {
					return;
				} else {
					setImage(event.target.files[0]);
				}
	    	}} />
	    	<button type="submit">Submeter</button>
	    </form>
	);
}
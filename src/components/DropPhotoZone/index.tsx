// React
import { useState, CSSProperties, useEffect } from 'react';

// Components
import { Button } from '../Button';

// SASS
import './styles.scss';

// Images
import photoImg from '../../assets/images/icons/photo-icon.png';

type DropPhotoZoneProps = {
	functionToExecuteOnSubmit: (profilePhoto: File | undefined) => Promise<void>;
	textForButton: string;
	buttonDisabled?: boolean;
}

export function DropPhotoZone({ functionToExecuteOnSubmit, textForButton, buttonDisabled=false }: DropPhotoZoneProps) {
	const [file, setFile] = useState<File>();

	const [dragOver, setDragOver] = useState(false);
	const [showSpan, setShowSpan] = useState(true);
	const [showThumb, setShowThumb] = useState(false);
	const [thumbLabel, setThumbLabel] = useState('myFile.txt');
	const [thumbImageURL, setThumbImageURL] = useState<CSSProperties>({ 
		width: '100%',
		height: '100%',
		borderRadius: '50%',
		overflow: 'hidden',
		backgroundSize: '100px',
		position: 'relative',
		backgroundImage: `url(${photoImg})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat'
	});

	function updateThumb() {
		if(showSpan) {
			setShowSpan(false);
		}

		if(!showThumb) {
			setShowThumb(true);
		}

		if(file) {
			setThumbLabel(file.name);

			if(file.type.startsWith('image/')) {
				const reader = new FileReader();

				reader.readAsDataURL(file);

				reader.onload = () => {
					setThumbImageURL({ 
						width: '100%',
						height: '100%',
						borderRadius: '50%',
						overflow: 'hidden',
						backgroundColor: '#ccc',
						backgroundSize: 'cover',
						position: 'relative',
						backgroundImage: `url(${reader.result})`,
						backgroundPosition: 'center'
					});
				}
			} else {
				setThumbImageURL({ 
					width: '100%',
					height: '100%',
					borderRadius: '50%',
					overflow: 'hidden',
					backgroundSize: '100px',
					position: 'relative',
					backgroundImage: `url(${photoImg})`,
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat'
				});
			}
		}
	}

	useEffect(() => updateThumb(), [file]);

	return (
		<form className="drop-photo-form" onSubmit={event => {
			event.preventDefault();
			if(!buttonDisabled) {
				functionToExecuteOnSubmit(file);
			}
		}}>
			<div 
				className={`drop-zone ${dragOver && 'dragover'}`}

				onDragOver={event => {
					event.preventDefault(); // previne que o navegador abra a imagem em uma nova guia
					setDragOver(true)
				}} 

				onDragLeave={() => setDragOver(false)}

				onDragEnd={() => setDragOver(false)}

				onDrop={event => {
					event.preventDefault(); // previne que o navegador abra a imagem em uma nova guia

					if(event.dataTransfer.files.length) {
						setFile(event.dataTransfer.files[0]);

						updateThumb();
					}

					setDragOver(false);
				}}

				onClick={event => { // previne que o navegador abra a imagem em uma nova guia

					console.log(event)
				}}
			>
				{ showSpan && <span className="drop-zone__prompt">Envie sua foto de perfil</span>}
				{ showThumb && <div className="thumb" data-label={thumbLabel} style={thumbImageURL}></div>}

				<input type="file" name="imageFile" onChange={event => {
					let files = (event.target as HTMLInputElement).files
					if(!files) {
						return;
					} else {
						setFile(files[0]);
						updateThumb();
					}
					
				}} />
			</div>
			<Button type="submit" disabled={buttonDisabled}>{textForButton}</Button>
		</form>
	);
}
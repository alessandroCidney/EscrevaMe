// Types
import { ButtonHTMLAttributes } from 'react';

// SASS
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props}: ButtonProps) {
	return (
		<button className={`button ${className}`} {...props} />
	);
}
type FontAwesomeIconProps = {
	iconName: string;
}

export function FontAwesomeIcon({iconName}: FontAwesomeIconProps) {
	return (
		<i className={iconName}></i>
	);
}
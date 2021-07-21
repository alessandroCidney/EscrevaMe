// React
import { useState, useEffect } from 'react';

type FontAwesomeIconProps = {
	iconName: string;
	onHoverTransformToSolidVersion?: boolean;
}

export function FontAwesomeIcon({iconName, onHoverTransformToSolidVersion=false }: FontAwesomeIconProps) {
	const [solid, setSolid] = useState(false);

	function transformToSolidVersion() {
		setSolid(true);
	}

	function transformToNoSolidVersion() {
		setSolid(false);
	}

	return (
		<i className={!solid ? iconName : `fas ${iconName.split(" ")[1]}`} onMouseOver={transformToSolidVersion} onMouseOut={transformToNoSolidVersion}></i>
	);
}
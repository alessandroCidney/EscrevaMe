// React
import { useState, useEffect } from 'react';

type FontAwesomeIconProps = {
	iconName: string;
	onHoverTransformToSolidVersion?: boolean;
	alwaysSolid?: boolean;
}

export function FontAwesomeIcon({iconName, onHoverTransformToSolidVersion=false, alwaysSolid=false }: FontAwesomeIconProps) {
	const [solid, setSolid] = useState(false);

	function transformToSolidVersion() {
		setSolid(true);
	}

	function transformToNoSolidVersion() {
		setSolid(false);
	}

	return (
		<i 
			className={!solid && !alwaysSolid ? iconName : `fas ${iconName.split(" ")[1]}`} 
			
			onMouseOver={() => {
				if(!alwaysSolid) {
					transformToSolidVersion()
				}
			}} 

			onMouseOut={() => {
				if(!alwaysSolid) {
					transformToNoSolidVersion()
				}
			}}></i>
	);
}
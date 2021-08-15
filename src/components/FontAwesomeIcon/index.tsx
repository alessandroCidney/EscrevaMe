// React
import { useState } from 'react';

type FontAwesomeIconProps = {
	iconName: string;
	onHoverTransformToSolidVersion?: boolean;
	alwaysSolid?: boolean;
	noChange?: boolean
}

export function FontAwesomeIcon({
	iconName, 
	onHoverTransformToSolidVersion=false, 
	alwaysSolid=false,
	noChange=false
}: FontAwesomeIconProps) {
	const [solid, setSolid] = useState(false);

	function transformToSolidVersion() {
		setSolid(true);
	}

	function transformToNoSolidVersion() {
		setSolid(false);
	}

	return (
		<i 
			className={!solid && !alwaysSolid || noChange ? iconName : `fas ${iconName.split(" ")[1]}`} 
			
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
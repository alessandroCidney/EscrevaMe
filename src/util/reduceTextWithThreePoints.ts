export function reduceTextWithThreePoints(text: string, maxCharacters: number) {
	let t = text;
	let newT = '';

	if(t.length > 40) {
		newT = t.slice(0, maxCharacters) + "..."
	} else {
		newT = t;
	}

	return newT;
}
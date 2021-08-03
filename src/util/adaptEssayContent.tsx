export function adaptEssayContentToFirestore(content: string) {
	let newContent = content.split("\n");
	let joinedContent = newContent.join("/n");
	return joinedContent;
}

export function adaptEssayContentToEssayPage(content: string) {
	let newContent = content.split("/n");

	return (
		<>
			{newContent.map(c => <>{c}<br/></>)}

		</>
	);
}
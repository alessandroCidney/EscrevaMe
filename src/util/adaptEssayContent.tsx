export function adaptEssayContentToFirestore(content: string) {
	let newContent = content.split("\n");
	let joinedContent = newContent.join("/n");
	return joinedContent;
}

export function adaptEssayContentToEssayPage(content: string) {
	let newContent = content.split("/n");

	/*
		Se o parágrafo for o último -> Sem quebra de linha
		Se não -> Com quebra de linha
	*/

	return (
		<>
			{newContent.map((c, i) => i===newContent.length-1 ? <>{c}</> : <>{c}<br/></>)}

		</>
	);
}
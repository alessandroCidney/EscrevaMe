export function adaptEssayNameToURL(essay_name: string) {

	return essay_name
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^ a-zA-Z0-9]/g, '')
			.toLowerCase()
			.split(" ")
			.join("-");

	// Ex: "Como funciona a geração de energia?" -> como-funciona-a-geracao-de-energia
}
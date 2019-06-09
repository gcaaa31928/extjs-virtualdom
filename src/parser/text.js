export function parseText(text, regex) {
	if (!re.test(text)) {
		return;
	}
	let tokens = [];
	let index = -1;
	while ((match = regex.exec(text))) {
		let lastIndex = regex.lastIndex;
		index = match.index;

	}
}


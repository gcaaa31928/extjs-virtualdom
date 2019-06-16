export class ASTText {
	constructor(text, parent) {
		this.children = [];
		this.text = text;
		if (parent) {
			parent.children.push(this);
		}
	}
}

import { toAST } from '../../../src/parser';

describe('to AST tree', () => {
	it ('create html basically', () => {
		let htmlString = `<div>hello</div>`;
		let root = toAST(htmlString);
		expect(root.tagName).toBe('div');
		expect(root.children.length).toBe(1);
		expect(root.children[0].text).toBe('hello');
	});

	it('create dom element with attributes', () => {
		let htmlString = `<div class="hello"></div>`;
		let root = toAST(htmlString);
		expect(root.tagName).toBe('div');
		expect(root.attrs).toEqual({ class: 'hello' });
	});

	it('create extjs-liked element with attributes', () => {
	});
});

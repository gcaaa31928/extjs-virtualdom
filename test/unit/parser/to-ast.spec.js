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

	it('create dom element with style', () => {
		let htmlString = `<div style="width: 0px"></div>`;
		let root = toAST(htmlString);
		expect(root.tagName).toBe('div');
		expect(root.attrs).toEqual({ style: 'width: 0px' });
	});

	// it('create tpl if-like elements', () => {
	// 	let htmlString = `<tpl if="true"><div>abc</div></tpl>`;
	// 	let root = toAST(htmlString);
	// 	console.log(root.innerHTML);
	// 	expect(root.tagName).toBe('div');
	// 	expect(root.attrs).toEqual({ class: 'hello' });
	// });
});

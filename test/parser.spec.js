import { toAST, printASTTree } from '../src/parser';
import { h, patch } from '../src/snabvdom'
import { toRender } from '../src/render';

describe('basic html', () => {
	it ('simple html', () => {
		let htmlString = `<tpl><div><span>123</span>abc</div></tpl>`;
		let root = toAST(htmlString);
		let vnodeFunc = toRender(root);
		var elm = document.createElement('div');
		elm = patch(elm, vnodeFunc.call(this, h)).elm;
		expect(elm.outerHTML).toBe(htmlString);
	});

	it ('simple html with attributes', () => {
		let htmlString = `<tpl><div class="cba"><span>123</span>abc</div></tpl>`;
		let root = toAST(htmlString);
		let vnodeFunc = toRender(root);
		var elm = document.createElement('div');
		elm = patch(elm, vnodeFunc.call(this, h)).elm;
		expect(elm.outerHTML).toBe(htmlString);
	});
});

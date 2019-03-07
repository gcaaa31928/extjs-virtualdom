import { toAST, printASTTree } from '../src/parser';
import { h, patch } from '../src/snabvdom'
import { toRender } from '../src/render';

describe('AST tree', () => {
	// it ('toAST', () => {
	// 	let root = toAST(`<div><div><span>123</span>abc</div></div>`);
	// 	console.log(toRender(root));
	// });

	it ('toRender', () => {
		let root = toAST(`<div><div><span>123</span>abc</div></div>`);
		let vnodeFunc = toRender(root);
		var elm = document.createElement('div');
		elm = patch(elm, vnodeFunc.call(this, h)).elm;
		console.log(elm.innerHTML);
	});
});

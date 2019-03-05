import { toAST, printASTTree } from '../src/parser';

describe('AST tree', () => {
	it ('toAST', () => {
		let root = toAST(`<div><div><span>123</span>abc</div></div>`);
		console.log(printASTTree(root));
	});
});

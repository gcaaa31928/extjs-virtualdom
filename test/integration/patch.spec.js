import { toAST, printASTTree } from '../../src/parser';
import { h, patch } from '../../src/snabvdom'
import { genRenderCode } from '../../src/render';

function assertPatch(htmlString, expectedHtml) {
	let root = toAST(htmlString);
	let vnodeFunc = new Function('h', genRenderCode(root));
	let elm = document.createElement('div');
	console.log(genRenderCode(root));
	elm = patch(elm, vnodeFunc.call(this, h)).elm;
	expect(elm.outerHTML).toBe(expectedHtml);
}

describe('basic html', () => {
	it ('simple html with style', () => {
		assertPatch(`<div style="width: 0px;height: 20px"><span>123</span>abc</div>`, `<div style="width: 0px; height: 20px;"><span>123</span>abc</div>`);
	});

	it ('simple html with attributes', () => {
		assertPatch(`<div class="abc" disabled></div>`, `<div class="abc" disabled="disabled"></div>`);
	});

	it ('simple html with tpl if', () => {
		assertPatch(`<div>parent<tpl if="false"><span>123</span></tpl></div>`, `<div>parent</div>`);
		assertPatch(`<div>parent<tpl if="true"><span>123</span></tpl></div>`, `<div>parent</div>`);
	});
});

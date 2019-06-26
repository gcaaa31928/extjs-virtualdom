import { HTMLParser } from '../html-parser';
import { ASTElement } from './ast-element';
import { ASTText } from './ast-text';

function printASTTree(node, level = 0) {
	let str = '';
	if (!node) {
		return str;
	}
	for (let i = 0 ; i < level; i++) {
		str += '--';
	}
	str = str + ' ';
	if (node instanceof ASTElement) {
		str += '<' + node.tagName + '>';
	} else {
		str += node.text;
	}
	str += '\n';
	for (let child of node.children) {
		str += printASTTree(child, level + 1);
	}
	return str;
}

function parseIf(el) {
	if (el.tagName === 'tpl' && el.attrs && 'if' in el.attrs) {
		el.if = {
			exp: el.attrs['if'],
			block: el
		};
		delete el.attrs['if'];
	}
};

function toAST(template) {
	let root = null;
	let stack = [];
	let parent = null;
	HTMLParser(template, {
		start: function(tag, attrs, unary) {
			let element = new ASTElement(tag, attrs, parent);
			parseIf(element);
			if (!root) {
				root = element;
			}
			if (unary === false) {
				stack.push(element);
				parent = element;
			}
		},
		end: function(tag) {
			stack.pop();
			if (stack.length > 0) {
				parent = stack[stack.length - 1];
			} else {
				parent = null;
			}
		},
		chars: function(text) {
			let element = new ASTText(text, parent);
		}
	});
	return root;
};
export { toAST, printASTTree }

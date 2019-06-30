import { ASTElement } from './parser/ast-element'
import { ASTText } from './parser/ast-text'
function getVDomTagName(astNode) {
	let tagName = astNode.tagName;
	let attrsMap = astNode.attrsMap;
	if (!attrsMap) {
		return tagName;
	}
	let id = attrsMap['id'];
	if (id) {
		tagName += '#' + id;
	}
	let clazz = attrsMap['class'];
	if (clazz) {
		tagName += clazz.replace(' ', ',');
	}
	return tagName;
}

function createPropsName(props) {
	let evaluateStr = 'props: {';
	if (props) {
		Object.keys(props).forEach(prop => {
			let key = prop;
			evaluateStr += key + ':' + JSON.stringify(props[prop]) + ' ';
		});
	}
	evaluateStr += '},';
	return evaluateStr;
}

function createAttrsName(attrs) {
	let evaluateStr = 'attrs: {';
	if (attrs) {
		Object.keys(attrs).forEach(attr => {
			let key = attr;
			evaluateStr += key + ':' + JSON.stringify(attrs[attr]) + ',';
		});
	}
	evaluateStr += '},';
	return evaluateStr;
}

function createIfRenderElementEval(astNode) {
	let cond = astNode.if;
	let children = astNode.children;
	let evalArr = [];
	for (let child of children) {
		evalArr.push(`(${cond.exp} ? ${createRenderEval(child)} : null)`);
	}
	return evalArr.join(',');
}

function createRenderElementEval(astNode) {
	let str = 'h(' + JSON.stringify(astNode.tagName);
	str += ', {';
	str += createAttrsName(astNode.attrs);
	str += createPropsName(astNode.props);
	str += '}';
	if (astNode.children) {
		str += ',[';
		astNode.children.forEach(child => {
			str += createRenderEval(child) + ',';
		});
		str += ']';
	}
	str += ')';
	return str;
}

function createRenderTextEval(astNode) {
	return JSON.stringify(astNode.text.trim());
}

function createRenderEval(astNode) {
	if (astNode instanceof ASTElement) {
		if (astNode.if) {
			return createIfRenderElementEval(astNode);
		} else {
			return createRenderElementEval(astNode);
		}
	} else if (astNode instanceof ASTText) {
		return createRenderTextEval(astNode);
	}
	return '';
}

function genRenderCode(astRoot) {
	let renderEval = '';
	if (astRoot) {
		renderEval += createRenderEval(astRoot);
	}
	return `with(this){return ${renderEval};}`;
}

export { genRenderCode };

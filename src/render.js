import { ASTElement, ASTText } from './parser'
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

function createRenderElementEval(astNode) {
	let str = 'h(' + JSON.stringify(astNode.tagName);
	let attrs = astNode.attrsMap;
	if (attrs) {
		str += ',{';
		Object.keys(attrs).every(attrName => {
			str += attrName + '=' + Json.stringify(attrs[attrName]) + ' ';
		});
		str += '}';
	}
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
	return JSON.stringify(astNode.text);
}

function createRenderEval(astNode) {
	if (astNode instanceof ASTElement) {
		return createRenderElementEval(astNode);
	} else if (astNode instanceof ASTText) {
		return createRenderTextEval(astNode);
	}
	return '';
}

function toRender(astRoot) {
	let renderEval = '';
	if (astRoot) {
		renderEval += createRenderEval(astRoot);
	}
	console.log(renderEval);
	return new Function('h', `with(this){return ${renderEval};}`);
}

export { toRender };

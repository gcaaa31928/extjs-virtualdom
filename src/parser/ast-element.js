import InMap from '../utils/in-map';
const tagListForValue = ['input', 'textarea', 'option', 'select', 'progress'];

let inValueTagMap = InMap('input,textarea,option,select,progress');
let isBooleanAttr = InMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
)

function useProp(tag, type, attr) {
	return (
		(attr === 'value' && inValueTagMap(tag)) && tag !== 'button' ||
		(attr === 'style') ||
		(attr === 'selected' && tag === 'option') ||
		(attr === 'checked' && tag === 'input') ||
		(attr === 'muted' && tag === 'video')
	);
}

export class ASTElement {
	constructor(tagName, attrs, parent) {
		this.tagName = tagName;
		this.children = [];
		this.attrs = Object.create(null);
		this.props = Object.create(null);
		this.mapAttrs(attrs);
		if (parent) {
			parent.children.push(this);
		}
	}
	addAttr(name, value) {
		if (isBooleanAttr(name)) {
			value = name;
		}
		(this.attrs || (this.attrs = Object.create(null)))[name] = value;
	}
	addProp(name, value) {
		(this.props || (this.props = Object.create(null)))[name] = value;
	}
	mapAttrs(attrs) {
		for (let { name, value } of attrs) {
			if (useProp(this.tagName, attrs.type, name)) {
				this.addProp(name, value);
			} else {
				this.addAttr(name, value);
			}
		}
	}
};

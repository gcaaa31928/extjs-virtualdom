export default function InMap(str) {
	let map = Object.create(null);
	const list = str.split(',');
	for (let i = 0; i < list.length; i++) {
		map[list[i]] = true;
	}
	return function(key) {
		return key in map;
	};
};

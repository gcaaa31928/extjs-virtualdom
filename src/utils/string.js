const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = (str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
};

const camelizeRE = /-(\w)/g;
export const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '');
};


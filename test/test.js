require("../build/array.min.js");
console.log([1, 1, 12, 3, 344, 55, 44, 344, 55, 44].unique());

let {
  generateUUID
} = require('../build/util.min.js');
console.log(generateUUID());

let {
  toSafeQueryString,
  parseSafeQueryString,
} = require("../build/querystring.min.js");

let jsonObj = {
  a: 1,
  b: 'false',
  c: true,
  d: null,
  e: undefined,
  f: [1, 23, 4, 5, 6, 78],
  g: {
    attr: 'attr',
    func: function() {
      console.log('Hello')
    }
  },
  h: '11222',
  i: 'null',
  j: 'undefined',
}
console.log(jsonObj);
jsonObj = toSafeQueryString(jsonObj);
console.log(jsonObj);
jsonObj = parseSafeQueryString(jsonObj);
console.log(jsonObj);

require('../build/array.min.js');
let arr = [1, 11, 2, 33, 33, 33, 44].unique();
console.log(arr);

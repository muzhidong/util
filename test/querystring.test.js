let {
  toSafeQueryString,
  parseSafeQueryString,
} = require("../build/querystring.min.js");

describe('查询字符串转换', function() {

  test('toSafeQueryString&parseSafeQueryString', () => {

    let jsonObj = {
      a: 1,
      b: 'false',
      c: true,
      d: null,
      e: undefined,
      f: [1, 23, 4, 5, 6, 78],
      g: {
        attr: 'attr',
        // func: function() {
        //   console.log('Hello')
        // }
      },
      h: '11222',
      i: 'null',
      j: 'undefined',
      // k: function() {
      //   console.log('Hello')
      // },
    }

    let result = parseSafeQueryString(toSafeQueryString(jsonObj));
    expect(result).toEqual({
      a: 1,
      b: 'false',
      c: true,
      d: null,
      f: [1, 23, 4, 5, 6, 78],
      g: {
        attr: 'attr',
        // func: function() {
        //   console.log('Hello')
        // }
      },
      h: '11222',
      i: 'null',
      j: 'undefined',
      // k: function() {
      //   console.log('Hello')
      // },
    });

  });

})

let {
  toSafeQueryString,
  parseSafeQueryString,
} = require("../build/querystring.min.js");

describe('查询字符串转换', function() {

  test('toSafeQueryString', () => {
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

    let expectedValue = `?a=1&b=false&c=true&d=null&f=${encodeURIComponent(JSON.stringify([1, 23, 4, 5, 6, 78]))}&g=${encodeURIComponent(JSON.stringify({attr: 'attr',func: function() {console.log('Hello')}}))}&h=11222&i=null&j=undefined`;
    expect(toSafeQueryString(jsonObj)).toEqual(expectedValue);

  });

  test('parseSafeQueryString', () => {
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
    let result = toSafeQueryString(jsonObj);
    expect(parseSafeQueryString(result)).toEqual({
      a: 1,
      b: false,
      c: true,
      d: null,
      f: [1, 23, 4, 5, 6, 78],
      g: {
        attr: 'attr',
      },
      h: 11222,
      i: null,
      j: 'undefined',
    });
  });

})

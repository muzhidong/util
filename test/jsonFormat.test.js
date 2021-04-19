var jsonFormat = require('../build/jsonFormat.min.js');

describe('格式化为JSON', function() {

  test('jsonFormat', () => {

    var obj = {
      a: 1,
      b: 2
    }

    var config = {
      type: 'space',
      size: 2
    }

    expect(jsonFormat(obj, config)).toEqual(`{
  "a": 1,
  "b": 2
}`);

  });

});

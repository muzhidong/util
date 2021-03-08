let {
  generateUUID
} = require('../build/util.min.js');

describe('工具类方法', function() {

  test('generateUUID', () => {
    expect(generateUUID()).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8,9,a,b][0-9a-f]{3}-[0-9a-f]{12}/);
  })
})

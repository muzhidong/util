require("../build/array.min.js");

describe('数组拓展', function() {

  test('unique', () => {
    expect([1, 1, 12, 3, 344, 55, 44, 344, 55, 44].unique()).toEqual([1, 12, 3, 344, 55, 44, ]);
  })

})

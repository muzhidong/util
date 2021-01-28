(function() {

  var util = Object.create(null);

  // 获取随机颜色
  util.getRandomColor = function() {
    var chs = "0123456789ABCDEF";
    var col = "#";
    for (var i = 0; i < 6; i++) {
      col += chs[Math.random() * 16 | 0];
    }
    return col;
  };

  // 指定范围内获取随机整数
  util.getRandomNumber = function(value) {
    var type = toString.call(value);
    if (!(type === '[object Number]' || (type === '[object String]' && parseFloat(value) == value))) return null;
    return parseInt(Math.random() * value, 10);
  };

  // 获取字符的16进制编码
  util.getHexCode = function(str) {
    if (!(toString.call(str) === "[object String]" && str.length > 0)) return null;
    return str.charCodeAt(0).toString(16);
  };

  // 获取字符串的占位长度
  util.getLengthOfHolder = function(str) {

    //字符串长度
    var len = str.length;

    //正则不需使用引号，字符串需使用引号
    // 拓展：
    // 单字节的字符范围：[\u0x0001-\u0x007e]{1} | [\u0xff60-\u0xff9f]{1}
    // 占位2长度的范围（字符大小不一定就是双字节，也可能是单字节）：[\u4E00-\u9FA5]{1} | [\u3000-\u303F]{1} | [\uFF00-\uFFEF]{1}
    var reg = new RegExp(/[\u4E00-\u9FA5]{1}|[\u3000-\u303F]{1}|[\uFF00-\uFFEF]{1}/);

    var num = 0;
    var index = str.search(reg);
    while (index > -1) {
      str = str.substring(index + 1);
      num++;
      index = str.search(reg);
    }

    //返回占位长度
    console.log("占位长度", num + len);
    return num + len;
  };

  // 生成UUID
  // UUID，通用唯一识别码，由4个连字号(-)将32个字节长的字符串分隔后生成的字符串，总共36个字节长
  // GUID，全局唯一标识符，是微软对UUID这个标准的实现
  util.generateUUID = function() {

    // bits 12-15 of the time_hi_and_version field to 0010
    // bits 6-7 of the clock_seq_hi_and_reserved to 01
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      var v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

  };


  if (typeof define === 'function') {
    define(function() {
      return util;
    });
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = util;
  }

  function isInWindow() {
    return 'undefined' !== typeof window && /^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(window));
  }
  if (isInWindow()) {
    for (let key in util) {
      window[key] = util[key];
    }
  }

})()

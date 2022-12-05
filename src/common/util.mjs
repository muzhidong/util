(function() {

  var util = Object.create(null);

  // 获取随机颜色
  util.getRandomColor = function() {
    // var chs = "0123456789ABCDEF";
    // var col = "#";
    // for (var i = 0; i < 6; i++) {
    //   col += chs[Math.random() * 16 | 0];
    // }
    // return col;
    // 更优的随机算法，因为调用Math.random仅一次，认为在连续调用的随机概率效果更好
    return `#${('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)}`
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

  // 按行宽度或行占位长度分割多行文字
  util.splitMultilineText = function(str, mode, lineWidth, fontSize) {

    var target = [];
    let lastIdx = 0;
    var currentIdx = 0;
    var currentWidthOrLen = 0;

    if (mode === 'pixel') {

      let textSize;

      for (let char of str) {

        if (/[a-zA-Z]/.test(char)) {
          textSize = 5;
        } else if (/[0-9]/.test(char)) {
          textSize = 5.5;
        } else if (/\./.test(char)) {
          textSize = 2.7;
        } else if (/-/.test(char)) {
          textSize = 3.25;
        } else if (/[\u4e00-\u9fa5]/.test(char)) {
          textSize = 10;
        } else if (/\(|\)/.test(char)) {
          textSize = 3.73;
        } else if (/\s/.test(char)) {
          textSize = 2.5;
        } else if (/%/.test(char)) {
          textSize = 8;
        } else {
          textSize = 10;
        }

        currentWidthOrLen += textSize * fontSize / 10;

        if (currentWidthOrLen >= lineWidth) {
          target.push(str.substring(lastIdx, currentIdx + 1));
          lastIdx = currentIdx + 1;
          currentWidthOrLen = 0;
        }
        currentIdx++;

      }

    } else if (mode === 'holder') {

      var lineHolderLen = Math.floor(lineWidth / fontSize * 2);
      var reg = new RegExp(/[\u4E00-\u9FA5]{1}|[\u3000-\u303F]{1}|[\uFF00-\uFFEF]{1}/);

      for (let char of str) {

        if (reg.test(char)) {
          currentWidthOrLen += 2;
        } else {
          currentWidthOrLen += 1;
        }

        if (currentWidthOrLen >= lineHolderLen) {
          target.push(str.substring(lastIdx, currentIdx + 1));
          lastIdx = currentIdx + 1;
          currentWidthOrLen = 0;
        }
        currentIdx++;

      }

    }

    if (lastIdx !== str.length)
      target.push(str.substring(lastIdx, str.length));

    return target;
  };

  // 测量字符串的像素宽度，在小程序中使用该方法时，传字体大小一般设置为设计稿定义的字体大小的1/2
  util.measureText = function(text, fontSize = 10) {

    text = String(text);

    var text = text.split('');
    var width = 0;

    text.forEach(function(item) {
      if (/[a-zA-Z]/.test(item)) {
        width += 5;
      } else if (/[0-9]/.test(item)) {
        width += 5.5;
      } else if (/\./.test(item)) {
        width += 2.7;
      } else if (/-/.test(item)) {
        width += 3.25;
      } else if (/[\u4e00-\u9fa5]/.test(item)) { //中文匹配
        width += 10;
      } else if (/\(|\)/.test(item)) {
        width += 3.73;
      } else if (/\s/.test(item)) {
        width += 2.5;
      } else if (/%/.test(item)) {
        width += 8;
      } else {
        width += 10;
      }
    });

    return width * fontSize / 10;

  };

  // 获取字符串的字符占位长度
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

  // 实现一个函数，判断是否为回文字符串
  // 回文串是一个正读和反读都一样的字符串，比如“level”或者“noon”等等就是回文串。
  util.isHuiWen = function(str) {
    var len = str.length;
    var loop = (len / 2) >> 0;
    var i = 0;
    while (i < loop) {
      if (str[i] !== str[len - 1 - i]) {
        return false;
      }
      i++;
    }
    return true;
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

(function() {
  function isArray(value) {
    return toString.call(value) === '[object Array]';
  }

  function isObject(value) {
    return toString.call(value) === '[object Object]';
  }

  function isString(value) {
    return toString.call(value) === '[object String]';
  }

  // FIXME:
  // 1.字符串形如'true','123','null',最后解析为布尔值、数值、null
  // 2.对象类型不支持携带函数
  function toSafeQueryString(obj) {

    if (!isObject(obj)) return;

    // 虽然一句代码实现，但没有对值的类型做检查，并编码，会有问题。
    // return '?' + Object.keys(obj).map(key => [key, obj[key]].join('=')).join('&');

    let qs = '?';
    let val;
    for (let key in obj) {
      val = obj[key];
      if (isObject(val) || isArray(val)) {
        val = encodeURIComponent(JSON.stringify(val));
      } else if (val === void 0) {
        continue;
      } else {
        val = encodeURIComponent(val);
      }
      qs += key + "=" + val + "&";
    }

    return qs.substring(0, qs.length - 1);

  }

  function parseSafeQueryString(qs) {

    if (!isString(qs)) return null;

    qs = qs.substring(1).split('&');
    let obj = {};
    let key, val;
    for (let i = 0; i < qs.length; i++) {

      let arr = qs[i].split('=');
      key = arr[0];
      val = arr[1];

      val = decodeURIComponent(val);

      try {
        obj[key] = JSON.parse(val);
      } catch (e) {
        obj[key] = val;
      }
    }

    return obj;

  }

  if (typeof define === 'function') {
    // AMD\CMD模块设计，比如babel编译器环境
    define(function() {
      return {
        toSafeQueryString,
        parseSafeQueryString,
      };
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    // CommonJS模块设计，比如node环境
    module.exports = {
      toSafeQueryString,
      parseSafeQueryString,
    };
  }

  function isWindow() {
    let b1 = 'undefined' !== typeof window && window === window.window;
    if (!b1) return b1;
    let b2 = window === window.frames && window === window.self;
    let b3 = window === window.parent && window === window.top;
    return b1 && b2 && b3;
  }

  if (isWindow()) {
    // 浏览器环境
    window.parseSafeQueryString = parseSafeQueryString;
    window.toSafeQueryString = toSafeQueryString;
  }

})()
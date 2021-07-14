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
  // 1.对象类型不支持携带函数或者属性值为函数
  function toSafeQueryString(obj) {

    if (!isObject(obj)) return;

    // 虽然一句代码实现，但没有对值的类型做检查，并编码，会有问题。
    // return '?' + Object.keys(obj).map(key => [key, obj[key]].join('=')).join('&');

    let qs = '?';
    let val;
    for (let key in obj) {
      val = obj[key];
      if (val === void 0) {
        continue;
      } else {
        val = encodeURIComponent(JSON.stringify(val, function(key, value) {
          switch (true) {
            case typeof value === 'string' && (value === 'true' || value === 'false'):
            case typeof value === 'string' && !isNaN(value):
            case typeof value === 'string' && (value === 'null'):
              // case typeof value === 'function':
              return value.valueOf();
            default:
              return value;
          }
        }));
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

  function isInWindow() {
    return 'undefined' !== typeof window && /^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(window));
  }
  if (isInWindow()) {
    // 浏览器环境
    window.parseSafeQueryString = parseSafeQueryString;
    window.toSafeQueryString = toSafeQueryString;
  }

})()

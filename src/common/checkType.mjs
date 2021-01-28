(function() {

  var util = Object.create(null);

  util.isNaN = function(val) {
    return val !== val;
  };

  util.isUndefined = function(value) {
    // return value === void 0;
    return toString.call(value) === '[object Undefined]';
  };

  util.isNull = function(value) {
    // return value === null;
    return toString.call(value) === '[object Null]';
  };

  util.isBoolean = function(value) {
    // 前者视布尔包装类为对象类型，后者仍视为布尔类型，一般开发中倾向后者
    // return typeof value === 'boolean';
    return toString.call(value) === '[object Boolean]';
  };

  util.isNumeric = function(value) {
    // return typeof value === 'number';
    // return toString.call(value) === '[object Number]';
    // 相比上面一种，支持数字字符串
    return value - parseFloat(value) >= 0;
  };

  util.isString = function(value) {
    // return typeof value === 'string';
    return toString.call(value) === '[object String]';
  };

  util.isFunction = function(value) {
    // return typeof value === 'function';
    // return value instanceof Function;
    return toString.call(value) === '[object Function]';
  };

  util.isArray = function(value) {
    // return value instanceof Array;
    return toString.call(value) === '[object Array]';
  };

  util.isObject = function(value) {
    // return value instanceof Object;
    return toString.call(value) === '[object Object]';
  };

  // 是否是window对象
  util.isWindow = function(obj) {
    return /^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(obj));
  };

  // 是否为纯对象
  util.isPlainObject = function(value) {
    // 排除基本类型数据、JS内置对象、DOM节点对象、window对象、处于某原型链中的对象
    return toString.call(value) === '[object Object]' && Object.getPrototypeOf(value) === Object.prototype;
  };

  // 是否是类Promise
  util.isPromiseLike = function(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
  };


  if (typeof define === 'function') {
    define(function() {
      return util;
    });
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = util;
  }
  // 是否处于window环境
  function isInWindow() {
    return 'undefined' !== typeof window && /^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(window));
  }
  if (isInWindow()) {
    for (let key in util) {
      window[key] = util[key];
    }
  }

})()

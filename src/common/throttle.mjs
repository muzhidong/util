(function() {

  // 节流：在指定间隔时间内只触发一次，无论期间触发操作多少次
  const throttle = function(fn, delay = 50) {
    var timer;
    return function(...rest) {
      if (!timer) {
        timer = setTimeout(function() {
          // 表明fn不能是箭头函数
          fn.call(this, ...rest);
          timer = null;
        }, delay);
      }
    }
  }

  if (typeof define === 'function') {
    define(function() {
      return throttle;
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = throttle;
  }

  function isInWindow() {
    return 'undefined' !== typeof window && /^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(window));
  }
  if (isInWindow()) {
    window.util = window.util || {}
    window.util.throttle = throttle;
  }

})()

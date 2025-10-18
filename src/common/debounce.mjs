(function() {

  // 防抖：触发操作后。并间隔delay时长，才执行函数，如果在delay时长内又触发了操作，则重新调整函数执行时间
  const debounce = function(fn, delay = 50, immediate = false) {
    var timer;
    return function(...rest) {
      if (timer) clearTimeout(timer);
      // 是否立即执行
      if (immediate) {
        var isCalledNow = !timer;
        timer = setTimeout(function() {
          timer = null;
        }, delay)
        if (isCalledNow) fn.call(this, ...rest);
      } else {
        timer = setTimeout(() => {
          // 表明fn不能是箭头函数
          fn.call(this, ...rest);
          timer = null;
        }, delay)
      }
    }
  }

  if (typeof define === 'function') {
    define(function() {
      return debounce;
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = debounce;
  }

  function isInWindow() {
    return 'undefined' !== typeof window && /^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(window));
  }
  if (isInWindow()) {
    window.util = window.util || {}
    window.util.debounce = debounce;
  }

})()

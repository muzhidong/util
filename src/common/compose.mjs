(function() {

  var util = Object.create(null);

  // 同步阻塞组合函数。特点：若有下一中间件，则执行完再执行当前中间件
  util.composeAsync = function(middleWares) {

    if (toString.call(middleWares) !== "[object Array]") {
      throw new TypeError('param middleWares must be an array!');
    }

    middleWares = middleWares.filter(middleWare => typeof middleWare === 'function');

    return function() {

      return dispatch(0)

      function dispatch(i) {

        let fn = middleWares[i]

        if (!fn) {
          return Promise.resolve()
        }

        try {
          return Promise.resolve(fn(function() {
            return dispatch(i + 1)
          }))
        } catch (e) {
          return Promise.reject(e);
        }

      }
    }
  }

  // 异步非阻塞组合函数。特点：上个中间件输出作为下个中间件输入
  util.compose = function(middleWares) {

    middleWares = middleWares.filter(middleWare => typeof middleWare === 'function')
    return function(...args) {
      let [first, ...others] = middleWares
      let ret = first && first(...args)
      others.forEach(fn => {
        ret = fn(ret)
      })
      return ret
    }
    // 下面的方式是从后往前进行函数调用
    // const last = funcs[funcs.length - 1]
    // const rest = funcs.slice(0, -1)
    // return (...args) => rest.reduceRight((returnValue, func) => func(returnValue), last(...args))
  }


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

/**
 * 依赖浏览器环境的工具函数
 **/
(function(context) {

  "use strict";

  function isBrowser() {
    return typeof window !== 'undefined' && context === window;
  }

  var tool = function() {};

  //内容
  tool.prototype.html = {

    html: function() {

    },
    text: function() {

    },
    attr: function() {

    },
  };

  //选择器
  tool.prototype.selector = {

    //获取所有子元素，也可指定某一选择器进行过滤
    children: function() {

    },
    //获取第N个子元素
    eq: function() {

    }
  };

  //样式
  tool.prototype.style = {
    //样式兼容处理
    setCompatibleStyle: function(elem, key, value) {
      ["moz", "webkit", "ms", "o", ""].forEach(function(prefix) {
        elem.style[prefix + key] = value;
      });
    },

    //设置样式
    css: function() {

    },
  };

  // Ajax
  tool.prototype.ajax = {

    get: function() {

    },

    post: function() {

    },
  };

  // fetch
  tool.prototype.fetch = {
    get: function() {

    },

    post: function() {

    }
  };

  //拖拽
  tool.prototype.drag = function() {

  };

  //运动
  tool.prototype.move = function() {

  };

  //动画，利用move封装出常用动画
  tool.prototype.animate = {

    show: function() {

    },
    hide: function() {

    },
    toggle: function() {

    },
    slideUp: function() {

    },
    slideDown: function() {

    },
    slideToggle: function() {

    },
  };

  //浏览器
  tool.prototype.browser = {

    //获取浏览器类型
    getBrowserType: function() {

      if (!isBrowser()) return;

      var userAgent = context.navigator.userAgent;

      if (userAgent.indexOf("Trident") > -1) {
        return "IE";
      };
      if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
      }
      if (userAgent.indexOf("Opera") > -1) {
        return "Opera";
      };

      //顺序不能颠倒
      if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
      }
      if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
      }
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      }
    },

    //获取浏览器版本
    getBrowserVersion: function() {

      if (!isBrowser()) return;

      var userAgent = context.navigator.userAgent;

      var regex = new RegExp(/[\d|\.]+/g);

      var index = "";

      if (userAgent.indexOf("Trident") > -1) {
        index = "rv:";
      };
      if (userAgent.indexOf("Firefox") > -1) {
        index = "Firefox";
      }
      if (userAgent.indexOf("Opera") > -1) {
        index = "Opera";
      };

      //顺序不能颠倒
      if (userAgent.indexOf("Edge") > -1) {
        index = "Edge";
      } else if (userAgent.indexOf("Chrome") > -1) {
        index = "Chrome";
      } else if (userAgent.indexOf("Safari") > -1) {
        index = "Safari";
      }

      // console.log(userAgent.indexOf(index));
      // console.log(userAgent.substring(userAgent.indexOf(index)));
      // console.log(userAgent.substring(userAgent.indexOf(index)).match(regex));
      return (userAgent.substring(userAgent.indexOf(index)).match(regex))[0];
    },
  };

  tool.prototype.other = {
    // 查看网页各标签使用率
    tagUsage: function() {
      var total = 0
      var obj = Array.prototype.reduce.call(document.querySelectorAll('*'), (acc, cur) => {
        let tag = cur.tagName.toLowerCase()
        acc[tag] = acc[tag] || 0
        acc[tag]++
        total++
        return acc
      }, {})
      var list = []
      for (let k in obj) list.push({
        tag: k,
        times: obj[k],
        ratio: (obj[k] * 100 / total).toFixed(2) + '%'
      })
      // console.clear()
      console.table(list.sort((a, b) => b.times - a.times))
    },
  };

  context.tool = new tool();

})(this);

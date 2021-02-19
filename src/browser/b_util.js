/**
 * @namespace browser
 **/
(function(context) {

  "use strict";

  function isWindow(obj) {
    return /^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(obj));
  }

  /**
   * @memberof browser
   * @class tool
   * @classdesc 依赖浏览器环境的工具类
   * @property {object} html {@linkplain module-tool_html|html文本模块}
   * @property {object} selector {@link module-tool_selector|css选择器模块}
   * @property {object} style {@link module-tool_style|css样式操作模块}
   * @property {object} ajax {@link module-tool_ajax|ajax请求模块}
   * @property {object} fetch {@link module-tool_fetch|fetch请求模块}
   * @property {object} drag {@link module-tool_drag|拖拽操作模块}
   * @property {object} move {@link module-tool_move|运动操作模块}
   * @property {object} animation {@link module-tool_animation|动画模块}
   * @property {object} browser {@link module-tool_browser|获取浏览器相关信息模块}
   * @property {object} other {@link module-tool_other|浏览器端其他操作}
   */
  var tool = function() {};

  /**
   * @module tool/html
   * @description html文本模块
   */
  tool.prototype.html = {

    /**
     * @method html
     * @description 插入内容 
     * @param {string} content 内容 
     */
    html: function(content) {

    },

    /**
     * @method text
     * @description 以html解析并插入内容 
     * @param {string} content 内容
     */
    text: function(content) {

    },

    /**
     * @method attr
     * @description 获取指定属性名的值
     * @param {string} name 属性名
     * @returns {string} 属性值
     */
    attr: function(name) {

    },
  };

  /**
   * @module tool/selector
   * @description css选择器模块
   */
  tool.prototype.selector = {

    /**
     * @method children
     * @description 获取所有子元素，也可指定某一选择器进行过滤
     * @param {string} selector 选择器，可选
     * @returns {DOMElementCollection} 符合的子元素
     */
    children: function(selector) {

    },

    /**
     * @method eq
     * @description 获获取第N个子元素
     * @param {number} num 要获取的子元素的位置
     * @returns {DOMElement} 指定位置的子元素
     */
    eq: function(num) {

    }
  };

  /**
   * @module tool/style
   * @description css样式操作模块
   */
  tool.prototype.style = {
    /**
     * @method setCompatibleStyle
     * @description 样式兼容处理
     * @param {DOMElement} elem 作用元素
     * @param {string} key 样式属性
     * @param {string} value 样式属性值
     */
    setCompatibleStyle: function(elem, key, value) {
      ["moz", "webkit", "ms", "o", ""].forEach(function(prefix) {
        elem.style[prefix + key] = value;
      });
    },

    /**
     * @method css
     * @description 设置样式
     * @param {object} styleObj 要设置的样式键值对对象
     * @example
     * css({width:'100px',height:'100px',border:'1px solid red'});
     */
    css: function(styleObj) {

    },
  };

  /**
   * @module tool/ajax
   * @description ajax请求模块
   */
  tool.prototype.ajax = {

    /**
     * @method get
     * @description get ajax请求
     * @param {string} url 请求的url
     * @example 
     * get('/api/getData?pageSize=10&pageNum=1')
     */
    get: function(url) {

    },

    /**
     * @method post
     * @description post ajax请求
     * @param {object} params 请求必要的参数
     * @example 
     * post({url:'/api/postData',data:{pageSize:10,pageNum:1})
     */
    post: function(params) {

    },
  };

  /**
   * @module tool/fetch
   * @description fetch请求模块
   */
  tool.prototype.fetch = {

    /**
     * @method get
     * @description get fetch请求
     * @param {string} url 请求的url
     * @example 
     * get('/api/getData?pageSize=10&pageNum=1')
     */
    get: function() {

    },

    /**
     * @method post
     * @description post fetch请求
     * @param {object} params 请求必要的参数
     * @example 
     * post({url:'/api/postData',data:{pageSize:10,pageNum:1})
     */
    post: function() {

    }
  };

  /**
   * @module tool/drag
   * @description 拖拽操作模块
   */
  tool.prototype.drag = function() {

  };

  /**
   * @module tool/move
   * @description 运动操作模块
   */
  tool.prototype.move = function() {

  };

  /**
   * @module tool/animation
   * @description 动画模块
   */
  tool.prototype.animate = {

    /**
     * @method show
     * @description 显示
     */
    show: function() {

    },

    /**
     * @method hide
     * @description 隐藏
     */
    hide: function() {

    },

    /**
     * @method toggle
     * @description 显隐切换
     */
    toggle: function() {

    },

    /**
     * @method slideUp
     * @description 上滑
     */
    slideUp: function() {

    },

    /**
     * @method slideDown
     * @description 下滑
     */
    slideDown: function() {

    },

    /**
     * @method slideToggle
     * @description 上下滑切换
     */
    slideToggle: function() {

    },
  };

  /**
   * @module tool/browser
   * @description 获取浏览器相关信息模块
   */
  tool.prototype.browser = {

    /**
     * @method getBrowserType
     * @description 获取浏览器类型
     * @returns {string} 浏览器类型
     */
    getBrowserType: function() {

      if (!isWindow(context)) return;

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

    /**
     * @method getBrowserVersion
     * @description 获取浏览器版本
     * @returns {string} 浏览器版本信息
     */
    getBrowserVersion: function() {

      if (!isWindow(context)) return;

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

  /**
   * @module tool/other
   * @description 浏览器端其他操作
   */
  tool.prototype.other = {

    /**
     * @method tagUsage
     * @description 查看网页各标签使用率
     */
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

})(window);

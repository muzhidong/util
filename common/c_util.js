(function(context) {

	var util = Object.create(null);

	// 获取随机颜色
	util.getRandomColor = function() {
		var arr = "0123456789ABCDEF";
		var color = "#";
		for (var i = 0; i < 6; i++) {
			color += arr[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	// 指定范围内获取随机数
	util.getRandomNumber = function(value) {
		return parseInt(Math.random() * value);
	};

	// 获取字符的16进制编码
	util.getHexCode = function(str) {
		if (str === null || str.length === 0) {
			return null;
		} else if (str.length > 1) {
			console.log("请输入一个字符");
			return null;
		}
		return str.charCodeAt(0).toString(16);
	};

	// 获取占位长度
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

	// 类Promise判断
	util.isPromise = function(obj) {
		return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}

	// 同步阻塞组合函数。特点：若有下一中间件，则执行完再执行当前中间件
	util.composeAsync = function(middleWares) {
		return function() {
			return dispatch(0)

			function dispatch(i) {
				let fn = middleWares[i]
				if (!fn) {
					return Promise.resolve()
				}
				return Promise.resolve(
					fn(function next() {
						return dispatch(i + 1)
					})
				)
			}
		}
	}

	// 异步非阻塞组合函数。特点：上个中间件输出作为下个中间件输入
	util.compose = function(middleWares) {
		return function() {
			// [first, ...others] = middleWares
			// let ret = first()
			// others.forEach(fn => {
			// 	ret = fn(ret)
			// })

			let ret = middleWares[0]();
			middleWares.slice(1).forEach(function(fn) {
				ret = fn(ret);
			})

			return ret
		}
	}

	// 异步非阻塞组合函数实现2
	// function compose(...funcs) {

	// 	funcs = funcs.filter(func => typeof func === 'function')

	// 	if (funcs.length === 0) {
	// 		return arg => arg
	// 	}

	// 	if (funcs.length === 1) {
	// 		return funcs[0]
	// 	}

	// 	const last = funcs[funcs.length - 1]
	// 	const rest = funcs.slice(0, -1)
	// 	return (...args) => rest.reduceRight((returnValue, func) => func(returnValue), last(...args))

	// }
	util.compose2 = function() {

		var funcs = Array.prototype.slice.call(arguments, 0);

		funcs = funcs.filter(function(func) {
			return typeof func === 'function'
		});

		if (funcs.length === 0) {
			return function() {
				return arguments
			};
		}

		if (funcs.length === 1) {
			return funcs[0]
		}

		const last = funcs[funcs.length - 1]
		const rest = funcs.slice(0, -1)
		return function() {
			// FIXME:支持多参数
			args = arguments[0];
			return rest.reduceRight(function(returnValue, func) {
				return func(returnValue)
			}, last(args))
		}

	}

	// TODO:是否为纯对象，下面的判断依据是什么？有没有更通用的解决方案
	util.isPlainObject = function(obj) {

		if (!obj || obj.toString() !== "[object Object]" || obj.nodeType || obj.setInterval) {
			return false;
		}

		if (obj.constructor && !obj.hasOwnProperty("constructor") && !obj.constructor.prototype.hasOwnProperty("isPrototypeOf")) {
			return false;
		}

		for (var key in obj) {}

		return key === undefined || obj.hasOwnProperty(key);

	}


	if (typeof define === 'function') {
		define(function() {
			return util;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = util;
	} else {
		for (let key in util) {
			context[key] = util[key];
		}
	}

})(this)
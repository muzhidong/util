(function() {

  var time = Object.create(null);

  // 时间差
  time.getDateDiff = function(dateTimeStamp) {

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var year = day * 365;
    var now = new Date().getTime();

    var diffValue = now - dateTimeStamp;

    if (diffValue < 0) return;

    var yearC = diffValue / year;
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    var result;

    if (yearC >= 1) {
      result = parseInt(yearC) + '年以前';
    } else if (monthC >= 1) {
      result = parseInt(monthC) + '个月前';
    } else if (weekC >= 1) {
      result = parseInt(weekC) + '星期前';
    } else if (dayC >= 1) {
      result = parseInt(dayC) + '天前';
    } else if (hourC >= 1) {
      result = parseInt(hourC) + '小时前';
    } else if (minC >= 5) {
      result = parseInt(minC) + '分钟前';
    } else {
      result = '刚刚';
    }

    return result;
  }

  // 时间格式化
  time.formatTime = function(time, fmt = 'yyyy-MM-dd HH:mm:ss') {

    let date = null;
    if (typeof time === 'number') {
      date = new Date(time);
    } else if (typeof time === 'string') {
      date = new Date(time.replace(new RegExp('\\-', 'g'), '/'));
    } else {
      date = new Date();
    }

    var o = {
      "M+": date.getMonth() + 1, //月份   
      "d+": date.getDate(), //日   
      "H+": date.getHours(), //小时   
      "m+": date.getMinutes(), //分   
      "s+": date.getSeconds(), //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds() //毫秒   
    };

    if (new RegExp('(y+)').test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;

  };

  if (typeof define === 'function') {
    define(function() {
      return time;
    });
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = time;
  }
  if (typeof window !== 'undefined' && window === this) {
    for (let key in time) {
      window[key] = time[key];
    }
  }

})()

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

  // 获取今天的时间戳
  time.getTodayTimeStamp = function(now) {
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    return new Date(year, month, day, 0, 0, 0).getTime();
  },

  // 获取昨天的时间戳
  time.getYesterDayTimeStamp = function(now) {
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    let yesterday = -1;
    if (day === 1) {
      if (month === 0) {
        yesterday = new Date(year - 1, 11, this.getLastDay(year - 1, 11), hour, minute, second).getTime();
      } else {
        yesterday = new Date(year, month - 1, this.getLastDay(year, month - 1), hour, minute, second).getTime();
      }
    } else {
      yesterday = new Date(year, month, day - 1, hour, minute, second).getTime();
    }
    return yesterday;
  },

  // 获取距离现在一周的时间戳
  time.getLastWeekTimeStamp = function(now) {

    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    let lastWeek = -1;
    if (day <= 7) {
      if (month === 0) {
        lastWeek = new Date(year - 1, 11, this.getLastDay(year - 1, 11) -
          (7 - day), hour, minute, second).getTime();
      } else {
        lastWeek = new Date(year, month - 1, this.getLastDay(year, month - 1) - (7 - day), hour, minute, second).getTime();
      }
    } else {
      lastWeek = new Date(year, month, day - 7, hour, minute, second).getTime();
    }
    return lastWeek;
  },

  // 星期数字转汉字
  time.getWeekDay = function(num) {
    switch (num) {
      case 0:
        return "日";
      case 1:
        return "一";
      case 2:
        return "二";
      case 3:
        return "三";
      case 4:
        return "四";
      case 5:
        return "五";
      case 6:
        return "六";
      default:
        break;
    }
  },

  // 获取某年某月的最后一天是几号
  time.getLastDay = function(year, month) {
    // 判断是哪一月
    // 1，3，5，7，8，10，12  最后一天是31号
    // 4，6，9，11           最后一天是30号
    // 2                    若为闰年则29号，若为平年则28号
    switch (month) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31;
      case 3:
      case 5:
      case 8:
      case 10:
        return 30;
      case 1:
        return this.isLeapYear(year) ? 29 : 28;
    }
  },

  // 判断某年是否是闰年
  time.isLeapYear = function(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  }

  if (typeof define === 'function') {
    define(function() {
      return time;
    });
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = time;
  }

  function isInWindow() {
    return 'undefined' !== typeof window && /^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(window));
  }
  if (isInWindow()) {
    for (let key in time) {
      window[key] = time[key];
    }
  }

})()

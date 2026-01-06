(function (context) {

  if (!(/^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(context)))) return;

  const WIN = window;
  const NA = WIN.navigator;
  const UA = NA.userAgent.toLowerCase();

  function match(regexp) {
    return regexp.test(UA);
  }

  const isAndroid = match(/android/) || /linux/i.test(NA.platform);
  const isIPad = !isAndroid && match(/ipad/);
  const isiPhone = !isAndroid && match(/ipod|iphone/);
  const isiOS = isiPhone || isiPad;

  const isMobile = match(/applewebkit.*mobile.*/);
  const isPC = !isAndroid && !isiOS;

  const isTouch = "ontouchend" in WIN;

  const isWeixin = match(/micromessenger/);
  const isXiaoMi = isAndroid && match(/mi\s+/);
  const isUC = match(/ucbrowser/);
  const isChrome = !!WIN["chrome"];
  const isSafari = UA.indexOf("chrome") === -1 && match(/webkit|khtml/);

  const device = {
    isAndroid,
    isIPad,
    isIPhone,
    isIOS,

    isPC,
    isMobile,

    isTouch,

    isWeixin,
    isXiaoMi,
    isUC,
    isChrome,
    isSafari
  };

  context.util = context.util || {}
  context.util.device = device;

})(window);

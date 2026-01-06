(function(context) {

  if (!(/^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(context)))) return;

  const WIN = window;
  const NA = WIN.navigator;
  const UA = NA.userAgent.toLowerCase();

  function test(needle) {
    return needle.test(UA);
  }

  const isAndroid = test(/android/) || /linux/i.test(NA.platform + "");
  const isIPad = !isAndroid && test(/ipad/);
  const isiPhone = !isAndroid && test(/ipod|iphone/);
  const isiOS = isiPhone || isiPad;

  const isMobile = test(/applewebkit.*mobile.*/);
  const isPC = !isAndroid && !isiOS;

  const isTouch = "ontouchend" in WIN;

  const isWeixin = test(/micromessenger/);
  const isXiaoMi = isAndroid && test(/mi\s+/);
  const isUC = test(/ucbrowser/);
  const isChrome = !!WIN["chrome"];

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
  };

  context.util = context.util || {}
  context.util.device = device;

})(window);

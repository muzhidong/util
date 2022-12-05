/**
 *  画布工具
 *  目前提供绘制路径、图片、文字、测量文本宽度、转成base64图片5个API
 */ 
(function(context) {

  if (!(/^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(context)))) return;

  let canvasEle;
  let canvasContext;

  /**
   * @param {*} option
   * width   图片宽度
   * height  图片高度
   */
  function MCanvas(option){
    const {
      width = 750,
      height = 1000,
    } = option;
    canvasEle = document.createElement('canvas');
    canvasEle.setAttribute('width', width);
    canvasEle.setAttribute('height', height);
    canvasContext = canvasEle.getContext('2d');
    canvasContext.clearRect(0, 0, width, height);
  }

  /**
   * @param {*} option
   * paths   路径数组，如[{type:line,pos:{startX,startY,endX,endY}},{type:arc,pos:{x,y,radius,startAngle,endAngle}}]
   *         其中type为line表示画线，为arc表示画弧，pos存放相关的位置参数
   * color   路径颜色，如black
   * size    路径大小，如2
   */
  MCanvas.prototype.drawPath = function(option){
    const {
      paths = [],
      color = 'black',
      size = 2,
    } = option;
    canvasContext.save();
    canvasContext.lineWidth = size;
    canvasContext.strokeStyle = color;
    canvasContext.beginPath();
    paths.forEach(path => {
      const pos =  path.pos;
      switch(path.type){
        case 'line':
          canvasContext.moveTo(pos.startX, pos.startY);
          canvasContext.lineTo(pos.endX, pos.endY);
          break;
        case 'arc':
          // startAngel、endAngel 表示角度大小，0度是从水平线开始，顺时针旋转
          canvasContext.arc(pos.x, pos.y, pos.radius, Math.PI * pos.startAngle / 180, Math.PI * pos.endAngle / 180);
          break;
        default:
          break;
      }
    })
    canvasContext.closePath();
    canvasContext.stroke();
    canvasContext.restore();
  }

  /**
   * @param {*} option
   * src     图片src
   * x       图片x轴偏移量
   * y       图片y轴偏移量
   * width   图片宽度
   * height  图片高度
   */
  MCanvas.prototype.drawImage = function(option){
    const {
      src,
      x = 0,
      y = 0,
      width = 100,
      height = 100,
    } = option;
    return new Promise((resolve)=>{
      const img = new Image();
      img.src = src;
      img.crossOrigin = "anonymous";
      img.addEventListener('load',function(){
        try {
          canvasContext.drawImage(img, x, y, width, height);
          resolve();
        } catch (error) {
          console.warn(error);
        }
      })
    })
  }

  /**
   * @param {*} option
   * size       文字大小
   * color      文字颜色
   * text       文本
   * x          文字x轴偏移量，左对齐时表示左下角位置，右下角时表示右下角位置
   * y          文字y轴偏移量，同上
   * maxWidth   文字最大宽度
   * textAlign  文字对齐方式
   * fontFamily 文字字体
   * fontWeight 文字权重
   */
  MCanvas.prototype.drawText = function(option){
    const {
      fontFamily = 'sans-serif',
      fontWeight =  'normal',
      size = '14px',
      color = 'black',
      // 值为center时，注意是以传入x值为对称轴
      textAlign = 'left',
      text = '文字',
      x = 0,
      y = 0,
      maxWidth = Number.MAX_SAFE_INTEGER,
    } = option;
    canvasContext.save();
    canvasContext.fillStyle = color;
    canvasContext.font = `${fontWeight} ${size} ${fontFamily}`;
    canvasContext.textAlign = textAlign;
    canvasContext.fillText(text, x, y, maxWidth);
    canvasContext.restore();
  }

  /**
   * 测量文本宽度
   * @param {string} text
   * @param {object} font，包括fontFamily、fontWeight、size
   * @returns 文本宽度
   */
  MCanvas.prototype.getTextWidth = function(text, font){
    const {
      fontFamily = 'sans-serif',
      fontWeight =  'normal',
      size = '14px',
    } = font;
    canvasContext.save();
    canvasContext.font = `${fontWeight} ${size} ${fontFamily}`;
    const w = canvasContext.measureText(text).width;
    canvasContext.restore();
    return w;
  }

  /**
   * @param {*} type   图片类型
   * @param {*} level  图片质量等级，取值范围[0-1]
   * @returns 图片base64 url
   */
  MCanvas.prototype.toDataUrl = function(type = 'image/png', level = 0.92){
    return canvasEle.toDataURL(type, level);
  }

  context.MCanvas = MCanvas;

})(window);

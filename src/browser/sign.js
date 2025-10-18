(function(context) {

  if (!(/^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(context)))) return;

  function Sign(canvasId, options) {

    var self = this;

    this.canvas = document.getElementById(canvasId);

    var obj = {

      canvas: this.canvas,
      context: this.canvas.getContext("2d"),
      // canvas宽高
      canvasWidth: 600,
      canvasHeight: 600,

      // 是否在写
      isWriting: false,

      lastWriteTime: -1,
      lastWriteSpeed: 0,
      lastWriteWidth: 0,

      // 背景色
      bgColor: '#fff',

      // 是否显示网格
      isShowBorder: true,
      // 网格线宽度
      borderWidth: 2,
      // 网格颜色	
      borderColor: "#fff",

      lastPoint: {},

      // 基础轨迹宽度
      writeWidth: 2,
      // 写字模式最大线宽
      maxWriteWidth: 30,
      // 写字模式最小线宽 
      minWriteWidth: 1,
      // 轨迹颜色
      writeColor: '#000',

      // 是否为签名模式，为true表示签名模式，为false为写字模式
      isSignMode: false,

      // 另存为的图片MIME
      mime: 'image/png',
    }

    for (var name in options) {
      obj[name] = options[name];
    }

    // 设置轨迹宽度
    this._setLineWidth = function() {

      var nowTime = new Date().getTime();
      var diffTime = nowTime - obj.lastWriteTime;
      obj.lastWriteTime = nowTime;

      var returnNum = obj.minWriteWidth + (obj.maxWriteWidth - obj.minWriteWidth) * diffTime / 30;
      if (returnNum < obj.minWriteWidth) {
        returnNum = obj.minWriteWidth;
      } else if (returnNum > obj.maxWriteWidth) {
        returnNum = obj.maxWriteWidth;
      }
      returnNum = returnNum.toFixed(2);

      //写字模式和签名模式
      if (obj.isSignMode) {
        obj.context.lineWidth = obj.writeWidth;
      } else {
        obj.context.lineWidth = obj.lastWriteWidth = obj.lastWriteWidth / 4 * 3 + returnNum / 4;
      }
    }

    // 绘制轨迹
    this._draw = function(point) {

      obj.context.beginPath();

      obj.context.moveTo(obj.lastPoint.x, obj.lastPoint.y);
      obj.context.lineTo(point.x, point.y);

      self._setLineWidth();
      obj.context.stroke();

      obj.lastPoint = point;

      obj.context.closePath();

    }

    // 设置轨迹样式
    this._setLineStyle = function() {
      obj.context.beginPath();
      obj.context.strokeStyle = obj.writeColor;
      obj.context.lineCap = 'round';
      obj.context.lineJoin = "round";
    }

    // 开始写
    this._writeBegin = function(point) {

      obj.isWriting = true;
      obj.lastWriteTime = new Date().getTime();
      obj.lastPoint = point;

      self._setLineStyle();

    }

    // 结束写
    this._writeEnd = function() {

      obj.isWriting = false;
    }

    // 绘制网格
    this._drawGrid = function() {

      // 显示网格，且为写字模式
      if (obj.isShowBorder && !obj.isSignMode) {

        obj.context.beginPath();
        var size = obj.borderWidth / 2;
        //画外面的框
        obj.context.moveTo(size, size);
        obj.context.lineTo(obj.canvasWidth - size, size);
        obj.context.lineTo(obj.canvasWidth - size, obj.canvasHeight - size);
        obj.context.lineTo(size, obj.canvasHeight - size);
        obj.context.closePath();
        obj.context.lineWidth = obj.borderWidth;
        obj.context.strokeStyle = obj.borderColor;
        obj.context.stroke();
        //画里面的框
        obj.context.moveTo(0, 0);
        obj.context.lineTo(obj.canvasWidth, obj.canvasHeight);
        obj.context.lineTo(obj.canvasWidth, obj.canvasHeight / 2);
        obj.context.lineTo(obj.canvasWidth, obj.canvasHeight / 2);
        obj.context.lineTo(0, obj.canvasHeight / 2);
        obj.context.lineTo(0, obj.canvasHeight);
        obj.context.lineTo(obj.canvasWidth, 0);
        obj.context.lineTo(obj.canvasWidth / 2, 0);
        obj.context.lineTo(obj.canvasWidth / 2, obj.canvasHeight);
        obj.context.stroke();

      }

    }

    // 清空画板
    this.clearCanvas = function() {

      obj.context.save();
      obj.context.strokeStyle = '#fff';
      obj.context.clearRect(0, 0, obj.canvasWidth, obj.canvasHeight);

      self._drawGrid();

      obj.context.restore();
    };

    // 保存为图片
    this.saveAsImg = function(callback) {

      var base64 = this.canvas.toDataURL(obj.mime);

      if (base64 == this.emptyCanvas) {
        alert('请先书写');
        return;
      }

      callback && callback(base64);
    };

    // 初始化画板
    this._initCanvas = function() {
      this.canvas.width = obj.canvasWidth;
      this.canvas.height = obj.canvasHeight;
      this.emptyCanvas = this.canvas.toDataURL(obj.mime);
      this._drawGrid();
    }

    // PC端
    this.canvas.addEventListener('mousedown', function(e) {
      var point = {
        x: e.offsetX || e.clientX,
        y: e.offsetY || e.clientY
      };
      self._writeBegin(point);
    });

    this.canvas.addEventListener('mouseup', function(e) {
      var point = {
        x: e.offsetX,
        y: e.offsetY
      };
      self._writeEnd(point);
    });

    this.canvas.addEventListener('mouseleave', function(e) {
      var point = {
        x: e.offsetX,
        y: e.offsetY
      };
      self._writeEnd(point);
    });

    this.canvas.addEventListener('mousemove', function(e) {
      if (obj.isWriting) {
        var point = {
          x: e.offsetX,
          y: e.offsetY
        };

        self._draw(point);
      }
    });

    //移动端
    this.canvas.addEventListener('touchstart', function(e) {
      var touch = e.targetTouches[0];
      var point = {
        x: touch.pageX || touch.clientX,
        y: touch.pageY || touch.clientY
      };
      self._writeBegin(point);
    });

    this.canvas.addEventListener('touchend', function(e) {
      var touch = e.changedTouches[0];
      var point = {
        x: touch.pageX,
        y: touch.pageY
      };
      self._writeEnd(point);
    });

    this.canvas.addEventListener('touchmove', function(e) {
      var touch = e.targetTouches[0];
      var point = {
        x: touch.pageX,
        y: touch.pageY
      };
      self._writeEnd(point);
    });

    this.canvas.addEventListener('touchmove', function(e) {
      var touch = e.targetTouches[0];
      var point = {
        x: touch.pageX,
        y: touch.pageY
      };
      self._draw(point);
    });

    this.clearCanvas();

    this._initCanvas();

  }

  context.util = context.util || {}
  context.util.Sign = Sign;

})(window);

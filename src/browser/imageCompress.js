(function(context) {

  if (!(/^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(context)))) return;

  // 图片压缩
  const MAX_WIDTH = 800; // 图片最大宽度

  /**
   * @memberof browser
   * @method compress
   * @description 压缩图片
   * @param {string} base64 图片base64格式内容 
   * @param {number|string} quality 图片质量
   * @param {string} mimeType 压缩后的图片MIME类型
   */
  function compress(base64, quality, mimeType) {

    let canvas = document.createElement("canvas");

    let img = document.createElement("img");
    img.crossOrigin = "anonymous";

    return new Promise((resolve, reject) => {

      img.src = base64;

      img.onload = () => {

        let targetWidth, targetHeight;

        if (img.width > MAX_WIDTH) {
          targetWidth = MAX_WIDTH;
          targetHeight = (img.height * MAX_WIDTH) / img.width;
        } else {
          targetWidth = img.width;
          targetHeight = img.height;
        }

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let imageData = canvas.toDataURL(mimeType, quality);
        resolve(imageData);
      };

    });

  }

  context.util = context.util || {}
  context.util.compress = compress;

})(window);

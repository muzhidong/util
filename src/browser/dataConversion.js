(function(context) {

  if (!(/^\[object (?:Window|DOMWindow|global)\]$/.test(toString.call(context)))) return;

  var dataConversion = Object.create(null);

  //Blob转base64
  dataConversion.blobToB64 = function(blob, cb) {

    var reader = new FileReader();
    reader.addEventListener('load', function() {
      cb && cb(reader.result);
    });
    reader.readAsDataURL(blob, {
      type: blob.type
    });

  }

  //Blob转ArrayBuffer
  dataConversion.blobToAb = function(blob, cb) {

    var reader = new FileReader();
    reader.addEventListener('load', function() {
      cb && cb(reader.result);
    });
    reader.readAsArrayBuffer(blob);

  }

  //ArrayBuffer转base64
  dataConversion.abToB64 = function(arraybuffer, cb) {

    blobToB64(abToBlob(arraybuffer), cb);

  }

  //ArrayBuffer转Blob
  dataConversion.abToBlob = function(arraybuffer, filename) {

    var u8arr = new Uint8Array(arraybuffer);
    if (filename) {
      return new File([u8arr], filename);
    } else {
      return new Blob([u8arr])
    }

  }

  //base64转ArrayBuffer
  dataConversion.b64ToAb = function(base64, cb) {

    blobToAb(b64ToBlob(base64), cb);

  }

  //base64格式转Blob
  dataConversion.b64ToBlob = function(base64, filename) {

    var arr = base64.split(',');

    var mime = arr[0].match(/:(.*?);/)[1];

    var binaryStr = atob(arr[1]);
    var i = binaryStr.length;
    var u8arr = new Uint8Array(i);
    while (i--) {
      u8arr[i] = binaryStr.charCodeAt(i);
    }

    if (filename) {
      return new File([u8arr], filename, {
        type: mime
      });
    } else {
      return new Blob([u8arr], {
        type: mime
      })
    }

  }

  for (let key in dataConversion) {
    context[key] = dataConversion[key];
  }

})(window)

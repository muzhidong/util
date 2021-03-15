let puppeteer = require('puppeteer');
let path = require('path');

const assetsRelativePath = __dirname + '/assets/sunyanzi.jpg';

puppeteer.launch({
  headless: false,
}).then(async browser => {

  // console.log(browser);

  const page = await browser.newPage();
  // console.log(page);

  page.on('console', msg => {
    console.log(msg._text);
  })

  await page.setContent(`<h1>文件压缩</h1>
    <input id="upload" type="file" />
    <img id="result" style="width:100px;height:100px;" />`, {
    waitUtil: 'load',
  });

  await page.addScriptTag({
    path: `${path.resolve().replace('/test','')}/build/compress.min.js`
  });

  await page.addScriptTag({
    content: ` 
      function blobToB64(blob, cb) {
        var reader = new FileReader();
        reader.addEventListener('load', function() {
          cb && cb(reader.result);
        });
        reader.readAsDataURL(blob, {
          type: blob.type
        });
      }

      let inputEle = document.querySelector('#upload');
      let imgEle = document.querySelector("#result");
      inputEle.addEventListener('change', function() {
        var file = this.files.item(0);
        console.log('原文件大小：',file.size);
        blobToB64(file, async function(b64) {
          imgEle.src = await compress(b64, 0.5, file.type);
          console.log('压缩后的文件大小：',imgEle.src.length)
          imgEle.name = file.name;
        })
      })`,
  });

  let uploadEleHandler = await page.$('#upload');
  await uploadEleHandler.uploadFile(assetsRelativePath);

  setTimeout(() => {
    browser.close();
  }, 5000);

})

let puppeteer = require('puppeteer');
let path = require('path');

const BR = '\r\n';
const assetsRelativePath = __dirname + '/assets/sunyanzi.jpg';

puppeteer.launch({
  headless: false,
}).then(async browser => {

  // console.log(browser);

  const page = await browser.newPage();
  // console.log(page);

  await page.setContent(`<h1>导出文件</h1>
    <img id="result" style="width:100px;height:100px;" />
    <input id="upload" type="file" />
    <button id="downloadBtn">导出文件</button>`, {
    waitUtil: 'load',
  });

  await page.addScriptTag({
    path: `${path.resolve().replace('/test','')}/build/exportFile.min.js`
  });

  await page.addScriptTag({
    content: ` 
      const inputEle = document.querySelector('#upload');
      const imgEle = document.querySelector("#result");
      const downloadBtn = document.querySelector("#downloadBtn");
      var file;

      inputEle.addEventListener('change', function() {
        console.log('change...');
        file = this.files.item(0); 
      });

      downloadBtn.addEventListener("click", (event) => {
        console.log('click...');
        if(file !== null){
          exportFile('compressed-' + file.name, file);
          file = null;
        }
      });`,
  });

  let uploadEleHandler = await page.$('#upload');
  await uploadEleHandler.uploadFile(assetsRelativePath);

  await page.click('#downloadBtn');

  await browser.close();

});

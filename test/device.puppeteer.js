let puppeteer = require('puppeteer');
let path = require('path');

const BR = '\r\n';

puppeteer.launch({
  headless: false,
}).then(async browser => {

  // console.log(browser);

  const page = await browser.newPage();
  // console.log(page);

  await page.setContent(`<h1>设备检测</h1><ul></ul>`, {
    waitUtil: 'load',
  });

  await page.addStyleTag({
    content: `
      * {
        margin: 0;
        padding: 0;
      }

      body {
        padding: 1.4rem;
      }

      li {
        list-style: none;
      }

      h1 {
        margin-bottom: 2rem;
      }

      ul {
        font-size: 1.4rem;
      }

      li {
        line-height: 1.5;
      }

      li b.false {
        color: red;
      }

      li b.true {
        color: #4faa33;
      }
    `
  });

  await page.addScriptTag({
    path: `${path.resolve().replace('/test','')}/build/device.min.js`
  });

  await page.addScriptTag({
    content: `// 蓝莓和诺基亚老手机检测不出来
      var html = [];
      for (var i in window.device) {
        html.push("<li>" + i + ": <b class=" + window.device[i] + ">" + window.device[i] + "</b></li>");
      }
      var $ = document.querySelector.bind(document);
      var ul = $("ul");
      ul.innerHTML = html.join("");`,
  });

  let ulEleHandler = await page.$('ul');
  let data = await ulEleHandler.$$eval('li', nodes => nodes.map(node => node.innerText));
  console.log(data.join(`,${BR}`));

  await browser.close();

});

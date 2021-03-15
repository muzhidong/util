const puppeteer = require('puppeteer');
const path = require('path');

function processTable(msg) {
  let arr = msg._args[0]._remoteObject.preview.properties;
  arr = arr.map(item => {
    let i = item.valuePreview;
    let rowData = {};
    i.properties.forEach(subItem => {
      rowData[subItem.name] = subItem.value;
    })
    // console.log(rowData);
    return rowData;
  });
  console.table(arr);
}

puppeteer.launch({
  headless: false,
}).then(async browser => {

  const page = await browser.newPage();

  page.on('console', msg => {
    switch (msg._type) {
      case 'table':
        processTable(msg);
        break;
      case 'log':
      default:
        console.log(msg._text);
        break;
    }
  });

  await page.addScriptTag({
    path: `${path.resolve().replace('/test','')}/build/b_util.min.js`
  });

  await page.addScriptTag({
    content: `
      tool.other.tagUsage();
      console.log(tool.browser.getBrowserType());
      console.log(tool.browser.getBrowserVersion());
      `
  });

  setTimeout(() => {
    browser.close();
  }, 5000);

});

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('http://www.baidu.com');
    await page.type('#kw', 'puppeteer', {delay: 100});//在搜索框里慢慢输入puppeteer
    page.click('#su') //然后点击搜索
    await page.waitFor(1000); // 单位是毫秒
    const targetLink = await page.evaluate(() => {
        // 点击第一个搜索结果
        let url =  document.querySelector('.result a').href
        return url
    });
    console.log(targetLink);
    await page.goto(targetLink);
    await page.waitFor(5000);
    browser.close();
})();
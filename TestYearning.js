const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('yearning登录页地址');
    await page.type('input[placeholder=账号]', '账号', {delay: 10});
    await page.type('input[placeholder=密码]', '密码', {delay: 10});
    const $anchor = await page.$('a.btn-lg');
    await $anchor.click();
    await page.waitFor(1000); // 单位是毫秒
    // 要使用document的话就要用evaluate这种形式
    const CAPTCHAData = await page.evaluate(() => {
        // 点击第一个搜索结果
        let data =  document.querySelector('#s-canvas').toDataURL("image/png");
        return data
    });
    var base64Data = CAPTCHAData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile("E:/CAPTCHA.png", dataBuffer, function(err) {
        if(err){
            console.log(err);
        }else{
            console.log("保存成功！");
        }
    });
    await page.waitFor(5000);
    browser.close();
})();
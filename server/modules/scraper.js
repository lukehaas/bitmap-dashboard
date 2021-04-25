const puppeteer = require('puppeteer');

const getImage = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle2',
  });
  await page.setViewport({ width: 880, height: 528, isLandscape: true });
  const image = await page.screenshot({ fullPage: true });
  await page.close();
  await browser.close();

  return image;
};

module.exports.getImage = getImage;

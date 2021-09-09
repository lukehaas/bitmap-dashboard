const puppeteer = require('puppeteer');

const getImage = async id => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(`${process.env.HOST}/${id}`, {
    waitUntil: 'networkidle2',
  });
  await page.setViewport({ width: 526, height: 878 });
  const image = await page.screenshot({ fullPage: true });
  await page.close();
  await browser.close();

  return image;
};

module.exports.getImage = getImage;

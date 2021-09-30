const puppeteer = require('puppeteer');

const getImage = async (id, charge = 0) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(`${process.env.HOST}/${id}?charge=${charge}`, {
    waitUntil: 'networkidle0',
  });
  await page.setViewport({ width: 478, height: 798 });
  const image = await page.screenshot({ fullPage: true });
  await page.close();
  await browser.close();

  return image;
};

module.exports.getImage = getImage;

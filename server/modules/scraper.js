const puppeteer = require('puppeteer');
const Jimp = require('jimp');

const { getConfig } = require('../config');

const generateImage = async ({ id, charge, dimensions }) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(`${process.env.HOST}/${id}?charge=${charge}`, {
    waitUntil: 'networkidle0',
  });
  await page.setViewport(dimensions);
  const image = await page.screenshot({ fullPage: true });
  await page.close();
  await browser.close();

  return image;
};

const getImage = async (id, charge = 0) => {
  const { dimensions, orientation } = getConfig(id);
  return generateImage({ id, charge, dimensions })
    .then(image => Jimp.read(image))
    .then(image => {
      if (orientation === 'portrait') {
        return image.rotate(90);
      }
      return image;
    })
    .then(image => image.getBufferAsync(Jimp.MIME_BMP));
};

module.exports.getImage = getImage;

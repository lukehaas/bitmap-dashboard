const puppeteer = require('puppeteer');
const Jimp = require('jimp');
const { Canvas, Image } = require('skia-canvas');
const RgbQuant = require('./rgbquant');

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

function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

function drawPixels(idxi8, width0, width1) {
  var idxi32 = new Uint32Array(idxi8.buffer);

  width1 = width1 || width0;

  var can = new Canvas(),
    can2 = new Canvas(),
    ctx = can.getContext('2d'),
    ctx2 = can2.getContext('2d');

  can.width = width0;
  can.height = Math.ceil(idxi32.length / width0);
  can2.width = width1;
  can2.height = Math.ceil((can.height * width1) / width0);

  ctx.imageSmoothingEnabled = false;
  ctx2.imageSmoothingEnabled = false;

  var imgd = ctx.createImageData(can.width, can.height);

  if (typeOf(imgd.data) == 'CanvasPixelArray') {
    var data = imgd.data;
    for (var i = 0, len = data.length; i < len; ++i) data[i] = idxi8[i];
  } else {
    var buf32 = new Uint32Array(imgd.data.buffer);
    buf32.set(idxi32);
  }

  ctx.putImageData(imgd, 0, 0);

  ctx2.drawImage(can, 0, 0, can2.width, can2.height);

  return can2;
}

const getImage = async (id, charge = 0) => {
  const { dimensions, orientation, dithering } = getConfig(id);
  return generateImage({ id, charge, dimensions })
    .then(image => {
      if (!dithering) return image;
      const canvas = new Canvas(dimensions.width, dimensions.height);
      const ctx = canvas.getContext('2d');

      img = new Image();
      img.src = image;

      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

      const quant = new RgbQuant(dithering);

      quant.sample(canvas);

      const arr = quant.reduce(canvas);

      const imageData = drawPixels(arr, dimensions.width, dimensions.width);
      return imageData.toBuffer();
    })
    .then(image => Jimp.read(image))
    .then(image => {
      if (orientation === 'portrait') {
        return image.rotate(90);
      }
      return image;
    })
    .then(image => {
      if (orientation === 'portrait') {
        return image.resize(dimensions.height, dimensions.width);
      }
      return image.resize(dimensions.width, dimensions.height);
    })
    .then(image => image.getBufferAsync(Jimp.MIME_BMP));
};

const getWordOfDay = async () => {
  const url = 'https://www.merriam-webster.com/word-of-the-day';
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({
    width: 1200,
    height: 800,
  });
  const $word = await page.$('.word-header-txt');
  const $definition = await page.$$('.wod-definition-container > p');
  $definition.pop();
  const $type = await page.$('.main-attr');
  const $pronunciation = await page.$('.word-syllables');
  const $etymology = await page.$$('.did-you-know-wrapper > p');
  const word = await page.evaluate($el => $el.textContent, $word);
  const definitions = [];
  for await ($el of $definition) {
    const def = await page.evaluate($el => $el.textContent, $el);
    definitions.push(def);
  }
  const etymology = [];
  const type = await page.evaluate($el => $el.textContent, $type);
  const pronunciation = await page.evaluate($el => $el.textContent, $pronunciation);
  for await ($el of $etymology) {
    const def = await page.evaluate($el => $el.textContent, $el);
    etymology.push(def);
  }
  return {
    word,
    type,
    pronunciation,
    definitions,
    etymology,
  };
};

module.exports = {
  getImage,
  getWordOfDay,
};

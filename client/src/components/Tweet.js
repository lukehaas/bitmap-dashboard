import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import RgbQuant from '../utils/rgbQuant';

import { SmallP } from './Text';
import { TWEET } from 'data/queries';

const Picture = styled.div`
  flex: 1;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${props => `url(${props.src});`};
`;
// https://twitter.com/APainting_ADay

const stripUrls = str => {
  return str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').replace(/(?:@)[\n\S]+/g, '');
};

function typeOf(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

function drawPixels(idxi8, width0, width1) {
  var idxi32 = new Uint32Array(idxi8.buffer);

  width1 = width1 || width0;

  var can = document.createElement('canvas'),
    can2 = document.createElement('canvas'),
    ctx = can.getContext('2d'),
    ctx2 = can2.getContext('2d');

  can.width = width0;
  can.height = Math.ceil(idxi32.length / width0);
  can2.width = width1;
  can2.height = Math.ceil((can.height * width1) / width0);

  ctx.imageSmoothingEnabled = ctx.mozImageSmoothingEnabled = ctx.webkitImageSmoothingEnabled = ctx.msImageSmoothingEnabled = false;
  ctx2.imageSmoothingEnabled = ctx2.mozImageSmoothingEnabled = ctx2.webkitImageSmoothingEnabled = ctx2.msImageSmoothingEnabled = false;

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

const quant = new RgbQuant({
  dithKern: 'FloydSteinberg',
  colors: 7,
  minHueCols: 256,
  palette: [
    [0, 0, 0],
    [255, 255, 255],
    [0, 128, 0],
    [0, 0, 255],
    [255, 0, 0],
    [255, 255, 0],
    [255, 170, 0],
  ],
});

const loadImg = src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => {
      quant.sample(img);
      const img8 = quant.reduce(img);
      const ican = drawPixels(img8, img.width);
      resolve(ican.toDataURL());
    };
    img.onerror = () => reject(new Error('could not load image'));
  });

export const Tweet = () => {
  const [src, setSrc] = useState('preloadimg');

  const { loading, error, data } = useQuery(TWEET);
  useEffect(() => {
    const load = async () => {
      await loadImg(data.tweet.url).then(newSrc => {
        setSrc(newSrc);
      });
    };
    !loading && !error && load();
  }, [data, setSrc]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { text, url } = data.tweet;

  return (
    <>
      {/* {text && <SmallP>{stripUrls(text)}</SmallP>} */}
      {url && <Picture src={src} />}
    </>
  );
};

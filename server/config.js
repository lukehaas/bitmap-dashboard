const has = require('lodash/has');

const componentIds = {
  Today: 'Today',
  Weather: 'Weather',
  News: 'News',
  Word: 'Word',
  Tweet: 'Tweet',
  Custom: 'Custom',
};

const deviceConfigurations = {
  one: {
    components: [componentIds.Today, componentIds.Weather, componentIds.News],
    orientation: 'portrait',
    dimensions: {
      width: 480,
      height: 800,
    },
    dithering: false,
  },
  art: {
    components: [componentIds.Tweet],
    orientation: 'landscape',
    dimensions: {
      width: 598,
      height: 446,
    },
    dithering: {
      dithKern: 'FloydSteinberg',
      minHueCols: 4096,
      colors: 7,
      boxSize: [200, 200],
      palette: [
        [0, 0, 0],
        [255, 255, 255],
        [0, 128, 0],
        [0, 0, 255],
        [255, 0, 0],
        [255, 255, 0],
        [255, 170, 0],
      ],
    },
  },
};

const getConfig = id => {
  if (has(deviceConfigurations, id)) {
    return deviceConfigurations[id];
  }
  return {
    components: [],
    dimensions: { width: 0, height: 0 },
  };
};

module.exports.getConfig = getConfig;

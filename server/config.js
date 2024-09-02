const has = require('lodash/has');

const componentIds = {
  Today: 'Today',
  Weather: 'Weather',
  News: 'News',
  Word: 'Word',
  Tweet: 'Tweet',
  Art: 'Art',
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
  artbw: {
    components: [componentIds.Art],
    orientation: 'portrait',
    dimensions: {
      width: 480,
      height: 800,
    },
    dithering: {
      dithKern: 'FloydSteinberg',
      minHueCols: 4096,
      colors: 2,
      boxSize: [200, 200],
      palette: [
        [0, 0, 0],
        [255, 255, 255],
      ],
    },
  },
  art: {
    components: [componentIds.Art],
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
  word: {
    components: [componentIds.Word],
    orientation: 'portrait',
    dimensions: {
      width: 480,
      height: 800,
    },
    dithering: false,
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

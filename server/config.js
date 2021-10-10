const has = require('lodash/has');

const componentIds = {
  Today: 'Today',
  Weather: 'Weather',
  News: 'News',
  Word: 'Word',
  Tweet: 'Tweet',
};

const deviceConfigurations = {
  one: {
    components: [
      componentIds.Today,
      componentIds.Weather,
      componentIds.News,
      componentIds.Word,
    ],
    orientation: 'portrait',
    dimensions: {
      width: 478,
      height: 798,
    },
  },
  art: {
    components: [componentIds.Today, componentIds.Tweet],
    orientation: 'landscape',
    dimensions: {
      width: 598,
      height: 446,
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

const head = require('lodash/head');
const get = require('lodash/get');

const { getConfig } = require('../config');

const newsUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.news_key}`;

const twitterUrl = 'https://api.twitter.com/2/';

const oedUrl = 'https://od-api.oxforddictionaries.com/';

const weatherbitUrl = 'http://api.weatherbit.io/v2.0/';

const getTweets = async url => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${process.env.twitter_bearer_token}`,
    },
  });
  const json = await response.json();
  return json;
};

const resolvers = {
  Query: {
    news: async () => {
      const response = await fetch(newsUrl);
      const { articles } = await response.json();
      return articles;
    },
    wordOfDay: async () => {
      const queryStr = encodeURIComponent('OED #WordoftheDay:');
      const tweets = await getTweets(
        `${twitterUrl}tweets/search/recent?query="${queryStr}" from:oed`
      );
      const tweet = head(tweets.data);
      const word = tweet.text
        .replace(/^[^:]*/, '')
        .replace(/:/, '')
        .trim()
        .split(/[^A-Za-z]/)[0]
        .toLowerCase();
      const oedResponse = await fetch(`${oedUrl}api/v2/entries/en-gb/${word}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          app_id: process.env.dictionary_app_id,
          app_key: process.env.dictionary_app_key,
        },
      });
      const oedJson = await oedResponse.json();
      // console.log('response', JSON.stringify(oedJson));
      const result = get(oedJson, 'results[0].lexicalEntries[0]');
      const type = get(result, 'lexicalCategory.text');
      const pronunciation = get(
        result,
        'entries[0].pronunciations[0].phoneticSpelling'
      );
      const definitions = get(result, 'entries[0].senses[0].definitions');
      return {
        word,
        type,
        pronunciation,
        definitions,
      };
    },
    tweet: async () => {
      // Pixel_Dailies -> 2586535099
      // APainting_ADay -> 3290279687
      const tweets = await getTweets(
        `${twitterUrl}users/3290279687/tweets?expansions=attachments.media_keys&tweet.fields=attachments&media.fields=url,preview_image_url,media_key&max_results=5`
      );
      const tweet = head(tweets.data);
      const media = head(tweets.includes.media);

      return {
        ...tweet,
        url: get(media, 'url') || get(media, 'preview_image_url'),
      };
    },
    weather: async () => {
      const response = await fetch(
        `${weatherbitUrl}/current?city=peterborough&country=uk&key=${process.env.weatherbit_api_key}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await response.json();
      const result = get(json, 'data[0]');

      return {
        city: get(result, 'city_name'),
        temp: get(result, 'temp'),
        icon: get(result, 'weather.icon'),
        description: get(result, 'weather.description'),
      };
    },
    configuration: (_, { id }) => {
      return getConfig(id);
    },
  },
};

module.exports = resolvers;

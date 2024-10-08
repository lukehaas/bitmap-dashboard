const head = require('lodash/head');
const get = require('lodash/get');
const fs = require('fs');
const path = require('path');

const { getWordOfDay } = require('./scraper');
const { getConfig } = require('../config');

const newsUrl = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.news_key}`;

const twitterUrl = 'https://api.twitter.com/1.1/';

const weatherbitUrl = 'http://api.weatherbit.io/v2.0/';

const instagramUrl = 'https://instagram-scraper-2022.p.rapidapi.com/ig/posts/';

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
      const result = await getWordOfDay();
      return result;
    },
    tweet: async () => {
      // Pixel_Dailies -> 2586535099
      // APainting_ADay -> 3290279687
      // const tweets = await getTweets(
      //   `${twitterUrl}users/3290279687/tweets?expansions=attachments.media_keys&tweet.fields=attachments&media.fields=url,preview_image_url,media_key&max_results=5`
      // );
      const tweets = await getTweets(
        `${twitterUrl}statuses/user_timeline.json?screen_name=APainting_ADay&count=1&include_entities=true&tweet_mode=extended`
      );
      const tweet = head(tweets);
      const media = tweet?.entities?.media[0];

      return {
        text: tweet?.full_text,
        url: media?.media_url_https,
      };
    },
    art: async () => {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.rapid_api_key,
          'X-RapidAPI-Host': process.env.rapid_api_host_instagram,
        },
      };
      // a_painting_a_day_
      const response = await fetch(`${instagramUrl}?id_user=2164355771`, options);
      const json = await response.json();
      const result = get(
        json,
        'data.user.edge_owner_to_timeline_media.edges[0].node'
      );
      const text = get(result, 'edge_media_to_caption.edges[0].node.text', '');

      const image = await fetch(result?.display_url);

      const imageFilename = 'image.jpg';
      const imageBuff = await image.arrayBuffer();

      fs.writeFile(
        path.join(__dirname, '../../public/', imageFilename),
        Buffer.from(imageBuff),
        err => {
          if (err) throw err;
          console.log('Image downloaded successfully!');
        }
      );

      return {
        text: text,
        url: `/${imageFilename}`,
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

      if (!result) {
        throw new Error('error');
      }

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

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Article {
    title: String
  }

  type WordEntry {
    word: String
    type: String
    pronunciation: String
    definitions: [String]
  }

  type Weather {
    city: String
    temp: Float
    icon: String
    description: String
  }

  type Tweet {
    text: String
    url: String
  }

  type Query {
    news: [Article]
    wordOfDay: WordEntry
    weather: Weather
    tweet: Tweet
  }
`;

module.exports = typeDefs;

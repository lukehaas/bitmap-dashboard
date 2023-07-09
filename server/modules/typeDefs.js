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
    etymology: [String]
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

  type Config {
    components: [String]
  }

  type Query {
    news: [Article]
    wordOfDay: WordEntry
    weather: Weather
    tweet: Tweet
    art: Art
    configuration(id: ID!): Config
  }

  type Art {
    text: String
    url: String
  }
`;

module.exports = typeDefs;

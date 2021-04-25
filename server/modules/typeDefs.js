const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Article {
    title: String
  }

  type Query {
    news: [Article]
  }
`;

module.exports = typeDefs;

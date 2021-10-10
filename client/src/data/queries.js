import { gql } from '@apollo/client';

export const NEWS = gql`
  query GetNews {
    news {
      title
    }
  }
`;

export const WORD_OF_DAY = gql`
  query GetWordofDay {
    wordOfDay {
      word
      type
      pronunciation
      definitions
    }
  }
`;

export const WEATHER = gql`
  query GetWeather {
    weather {
      city
      temp
      icon
      description
    }
  }
`;

export const TWEET = gql`
  query GetTweet {
    tweet {
      text
      url
    }
  }
`;

export const CONFIG = gql`
  query GetConfiguration($id: ID!) {
    configuration(id: $id) {
      components
    }
  }
`;

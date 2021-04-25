import { gql } from '@apollo/client';

export const NEWS = gql`
  query GetNews {
    news {
      title
    }
  }
`;

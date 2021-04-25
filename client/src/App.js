import React from 'react';
import { Global, css } from '@emotion/react';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { Wrapper } from 'components/Wrapper';
import { Today } from 'components/Today';
import { News } from 'components/News';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});
// transform: rotate(90deg);
export default () => {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Global
          styles={css`
            html {
              font-family: sans-serif;
              text-rendering: optimizeLegibility;
            }
            body {
              margin: 0;
            }
          `}
        />
        <Today />
        <News />
      </Wrapper>
    </ApolloProvider>
  );
};

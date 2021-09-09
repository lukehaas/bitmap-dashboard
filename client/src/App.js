import React from 'react';
import { Global, css } from '@emotion/react';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import './weather-icons.css';

import { Wrapper } from 'components/Wrapper';
import { Today } from 'components/Today';
import { News } from 'components/News';
import { Word } from 'components/Word';
import { Battery, Weather } from 'components';

const client = new ApolloClient({
  uri: `${process.env.HOST}/graphql`,
  cache: new InMemoryCache(),
});

export default () => {
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        <Global
          styles={css`
            html,
            body,
            #root {
              height: 100%;
            }
            html {
              font-family: sans-serif;
              text-rendering: optimizeLegibility;
              font-size: 16px;
              line-height: 1.4;
            }
            body {
              margin: 0;
            }
            * {
              box-sizing: border-box;
            }
          `}
        />
        <Battery charge={10} />
        <Today />
        <Weather />
        <News />
        <Word />
      </Wrapper>
    </ApolloProvider>
  );
};

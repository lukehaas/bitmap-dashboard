import React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { SmallP } from './Text';
import { TWEET } from 'data/queries';

const Picture = styled.div`
  flex: 1;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${props => `url(${props.src});`};
`;
// https://twitter.com/APainting_ADay

const stripUrls = str => {
  return str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').replace(/(?:@)[\n\S]+/g, '');
};

export const Tweet = () => {
  const { loading, error, data } = useQuery(TWEET);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { text, url } = data.tweet;
  return (
    <>
      {text && <SmallP>{stripUrls(text)}</SmallP>}
      {url && <Picture src={data.tweet.url} />}
    </>
  );
};

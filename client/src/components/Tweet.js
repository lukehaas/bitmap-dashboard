import React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { SmallP } from './Text';
import { TWEET } from 'data/queries';

const Img = styled.img`
  width: 100%;
  height: auto;
`;
// https://twitter.com/APainting_ADay

export const Tweet = () => {
  const { loading, error, data } = useQuery(TWEET);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { text, url } = data.tweet;
  return (
    <div>
      {text && <SmallP>{text}</SmallP>}
      {url && <Img src={data.tweet.url} />}
    </div>
  );
};

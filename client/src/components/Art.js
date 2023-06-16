import React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { Caption } from './Text';
import { ART } from 'data/queries';

const Picture = styled.div`
  flex: 1;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${props => `url(${props.src});`};
  filter: brightness(1.1) saturate(1) contrast(1.5);
`;
// https://twitter.com/APainting_ADay

const stripUrls = str => {
  return str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '').replace(/(?:@)[\n\S]+/g, '');
};

export const Art = () => {
  const { loading, error, data } = useQuery(ART);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { text, url } = data.art;
  const description = stripUrls(text).split(',').slice(0, 3).join(',');

  return (
    <>
      {/* {url && <Picture src="/plad.jpg" />} */}
      {url && <Picture src={url} />}
      {description && <Caption>{description}</Caption>}
    </>
  );
};

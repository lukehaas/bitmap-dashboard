import React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { H2, P, SmallP } from './Text';

import { WORD_OF_DAY } from 'data/queries';

const Figure = styled.figure`
  margin: 28px 0;
`;

export const Word = () => {
  const { loading, error, data } = useQuery(WORD_OF_DAY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { word, type, pronunciation, definitions } = data.wordOfDay;
  return (
    <Figure>
      <H2>{word}</H2>
      <figcaption>
        {type && pronunciation && <SmallP>{`${type} ${pronunciation}`}</SmallP>}
        {definitions?.map((def, index) => (
          <P key={`${index}def`}>{def}</P>
        ))}
      </figcaption>
    </Figure>
  );
};

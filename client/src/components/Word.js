import React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { H3, P } from './Text';

import { WORD_OF_DAY } from 'data/queries';

const TitleWrapper = styled.div`
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: normal;
  margin: 0;
`;

const WordTitle = styled.h2`
  font-size: 42px;
  margin: 8px 0;
`;

const Meta = styled.p`
  font-size: 20px;
  margin: 0;
`;

const WordType = styled.span`
  font-style: italic;
`;

export const Word = () => {
  const { loading, error, data } = useQuery(WORD_OF_DAY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const { word, type, pronunciation, definitions, etymology } = data.wordOfDay;
  return (
    <>
      <TitleWrapper>
        <PageTitle>Word of the Day</PageTitle>
        <WordTitle>{word}</WordTitle>
        <Meta>
          <WordType>{type}</WordType> {pronunciation}
        </Meta>
      </TitleWrapper>
      <div>
        {definitions?.map((def, index) => (
          <P key={`${index}def`}>{def}</P>
        ))}
        {etymology.length ? (
          <>
            <H3>Etymology</H3>
            {etymology.map((txt, index) => (
              <P key={`${index}et`}>{txt}</P>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
};

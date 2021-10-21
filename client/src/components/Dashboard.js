import React from 'react';
import { useQuery } from '@apollo/client';
import { has } from 'lodash-es';

import { CONFIG } from 'data/queries';

import { Today } from './Today';
import { Weather } from './Weather';
import { News } from './News';
import { Word } from './Word';
import { Tweet } from './Tweet';
import { Custom } from './Custom';

const componentIds = {
  Today: 'Today',
  Weather: 'Weather',
  News: 'News',
  Word: 'Word',
  Tweet: 'Tweet',
  Custom: 'Custom',
};

const componentMap = {
  [componentIds.Today]: () => <Today key="today" />,
  [componentIds.Weather]: () => <Weather key="weather" />,
  [componentIds.News]: () => <News key="news" />,
  [componentIds.Word]: () => <Word key="word" />,
  [componentIds.Tweet]: () => <Tweet key="tweet" />,
  [componentIds.Custom]: () => <Custom key="custom" />,
};

export const Dashboard = ({ id }) => {
  const { loading, error, data } = useQuery(CONFIG, { variables: { id } });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return data.configuration.components.map(componentId => {
    if (has(componentMap, componentId)) return componentMap[componentId]();
    return null;
  });
};

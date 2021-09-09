import React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { WEATHER } from 'data/queries';

const Wrapper = styled.div`
  margin-bottom: 26px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.i`
  font-size: 64px;
  margin-right: 20px;
`;

const Location = styled.p`
  font-size: 26px;
  margin: 0;
  font-weight: bold;
`;

const Status = styled.p`
  font-size: 22px;
  margin: 0;
`;

const Temperature = styled.p`
  font-size: 42px;
  margin: 0 0 0 20px;
`;
// icons: https://erikflowers.github.io/weather-icons/
// api codes: https://www.weatherbit.io/api/codes
const iconMap = {
  t01d: 'wi-day-thunderstorm', // thunderstorm day
  t01n: 'wi-night-thunderstorm', // thunderstorm night
  t02d: 'wi-day-storm-showers', // thunderstorm and rain day
  t02n: 'wi-night-alt-storm-showers', // thunderstorm and rain night
  t03d: 'wi-day-storm-showers', // thunderstorm and heavy rain day
  t03n: 'wi-night-alt-storm-showers', // thunderstorm and heavy rain night
  t04d: 'wi-day-storm-showers', // thunderstorm and light drizzle day
  t04n: 'wi-night-alt-storm-showers', // thunderstorm and light drizzle night
  t05d: 'wi-day-sleet-storm', // thunderstorm and hail day
  t05n: 'wi-night-sleet-storm', // thunderstorm and hail night

  d01d: 'wi-day-sprinkle', // light drizzle day
  d01n: 'wi-night-alt-sprinkle', // light drizzle night
  d02d: 'wi-day-sprinkle', // drizzle day
  d02n: 'wi-night-alt-sprinkle', // drizzle night
  d03d: 'wi-day-rain', // heavy drizzle day
  d03n: 'wi-night-rain', // heavy drizzle night
  r01d: 'wi-day-sprinkle', // light rain day
  r01n: 'wi-night-alt-sprinkle', // light rain night
  r02d: 'wi-day-rain', // moderate rain day
  r02n: 'wi-night-rain', // moderate rain night
  r03d: 'wi-day-rain-wind', // heavy rain day
  r03n: 'wi-night-rain-wind', // heavy rain night
  f01d: 'wi-day-rain-mix', // freezing rain day
  f01n: 'wi-night-rain-mix', // freezing rain night
  r04d: 'wi-day-showers', // light shower rain day
  r04n: 'wi-night-showers', // light shower rain night
  r05d: 'wi-day-showers', // shower rain day
  r05n: 'wi-night-showers', // shower rain night
  r06d: 'wi-day-rain-wind', // heavy shower rain day
  r06n: 'wi-night-rain-wind', // heavy shower rain night
  u00d: 'wi-day-rain', // unknown rain day
  u00n: 'wi-night-rain', // unknown rain night

  s01d: 'wi-day-snow', // light snow day
  s01n: 'wi-night-alt-snow', // light snow night
  s02d: 'wi-day-snow', // snow day
  s02n: 'wi-night-alt-snow', // snow night
  s03d: 'wi-day-snow-wind', // heavy snow day
  s03n: 'wi-night-alt-snow-wind', // heavy snow night
  s04d: 'wi-day-sleet', // mix snow/rain day
  s04n: 'wi-night-alt-sleet', // mix snow/rain night
  s05d: 'wi-day-sleet', // sleet day
  s05n: 'wi-night-alt-sleet', // sleet night
  s06d: 'wi-day-snow', // flurries day
  s06n: 'wi-night-alt-snow', // flurries night
  a01d: 'wi-day-fog', // mist
  a01n: 'wi-night-fog', // mist night
  a02d: 'wi-smoke', // smoke day
  a02n: 'wi-smoke', // smoke night
  a03d: 'wi-day-haze', // haze day
  a03n: 'wi-night-haze', // haze night
  a04d: 'wi-sandstorm', // sandstorm day
  a04n: 'wi-sandstorm', // sandstorm night
  a05d: 'wi-day-fog', // fog day
  a05n: 'wi-night-fog', // fog night
  a06d: 'wi-day-fog', // freezing fog
  a06n: 'wi-night-fog', // freezing fog night
  c01d: 'wi-day-sunny', // clear day
  c01n: 'wi-night-clear', // clear night
  c02d: 'wi-day-sunny-overcast', // few clouds day
  c02n: 'wi-night-alt-partly-cloudy', // few clouds night
  c02d: 'wi-day-sunny-overcast', // scattered clouds day
  c02n: 'wi-night-alt-partly-cloudy', // scattered clouds night
  c03d: 'wi-day-cloudy', // broken clouds day
  c03n: 'wi-night-alt-cloudy', // broken clouds night
  c04d: 'wi-cloudy', // overcast
  c04n: 'wi-cloudy', // overcast
};

export const Weather = () => {
  const { loading, error, data } = useQuery(WEATHER);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <Wrapper>
      <Row>
        <Icon className={`wi ${iconMap[data.weather.icon]}`}></Icon>
        <div>
          <Location>{data.weather.city}</Location>
          <Status>{data.weather.description}</Status>
        </div>
        <Temperature>{data.weather.temp}&deg;</Temperature>
      </Row>
    </Wrapper>
  );
};

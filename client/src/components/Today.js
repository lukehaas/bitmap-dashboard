import React from 'react';
import { H1 } from 'components/Text';
import { reduce } from 'lodash-es';

const getOrdinal = number => {
  const pr = new Intl.PluralRules('en-GB', { type: 'ordinal' });

  const ordinals = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    many: 'th',
    zero: 'th',
    other: 'th',
  };
  return `${number}${ordinals[pr.select(number)]}`;
};

const parts = new Intl.DateTimeFormat('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).formatToParts(new Date());

const formattedDate = reduce(
  parts,
  (acc, { type, value }) => {
    if (type === 'day') {
      return `${acc}${getOrdinal(value)}`;
    }
    return `${acc}${value}`;
  },
  ''
);

export const Today = () => {
  return <H1>{formattedDate}</H1>;
};

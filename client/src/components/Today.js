import React from 'react';
import { H1 } from 'components/Headings';

export const Today = () => {
  return (
    <H1>
      {new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }).format(new Date())}
    </H1>
  );
};

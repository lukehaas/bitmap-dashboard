import React from 'react';

import styled from '@emotion/styled';

const Text = styled.p`
  font-size: 42px;
  font-weight: bold;
  span {
    text-decoration: line-through;
  }
`;

export const Custom = () => {
  return (
    <Text>
      Jim, Don't forget <span>to go</span> crackers!
    </Text>
  );
};

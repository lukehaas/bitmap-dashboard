import React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { slice } from 'lodash-es';

import { P } from './Text';
import { NEWS } from 'data/queries';

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin-bottom: 14px;
`;

export const News = () => {
  const { loading, error, data } = useQuery(NEWS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <List>
      {slice(data.news, 0, 5).map(({ title }, index) => (
        <ListItem key={`${index}${title.charAt(0)}`}>
          <P>{title}</P>
        </ListItem>
      ))}
    </List>
  );
};

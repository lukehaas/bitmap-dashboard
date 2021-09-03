import React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { slice } from 'lodash-es';

import { NEWS } from 'data/queries';

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 20px;
  margin-bottom: 16px;
`;

export const News = () => {
  const { loading, error, data } = useQuery(NEWS);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <List>
      {slice(data.news, 0, 6).map(({ title }, index) => (
        <ListItem key={`${index}${title.charAt(0)}`}>{title}</ListItem>
      ))}
    </List>
  );
};

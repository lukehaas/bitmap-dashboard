import React from 'react';
import { useQuery } from '@apollo/client';
import styled from '@emotion/styled';

import { NEWS } from 'data/queries';

const List = styled.ul`
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 14px;
  margin-bottom: 12px;
`;

export const News = () => {
  const { loading, error, data } = useQuery(NEWS);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <List>
      {data.news.map(({ title }, index) => (
        <ListItem key={`${index}${title.charAt(0)}`}>{title}</ListItem>
      ))}
    </List>
  );
};

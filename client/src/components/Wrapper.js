import React from 'react';
import styled from '@emotion/styled';

const StyledWrapper = styled.main`
  padding: 24px 12px 16px 12px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Wrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

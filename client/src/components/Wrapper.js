import React from 'react';
import styled from '@emotion/styled';

const OrientationWrapper = styled.main`
  transform: rotate(90deg);
  transform-origin: bottom left;
  width: 100vh;
  height: 100vw;
  position: absolute;
  top: -100vw;
`;

const StyledWrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = ({ children }) => {
  return (
    <OrientationWrapper>
      <StyledWrapper>{children}</StyledWrapper>
    </OrientationWrapper>
  );
};

import styled from '@emotion/styled';

export const Battery = styled.div`
  border-radius: 3px;
  position: absolute;
  top: 12px;
  right: 12px;
  border: 2px solid black;
  height: 18px;
  width: 38px;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background-color: black;
    width: ${props => `${props.charge}%`};
  }
  &:after {
    content: '';
    position: absolute;
    height: 60%;
    width: 15%;
    right: -15%;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border-radius: 3px;
    background-color: black;
  }
`;

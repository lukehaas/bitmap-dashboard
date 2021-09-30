import styled from '@emotion/styled';

export const Battery = styled.div`
  border-radius: 3px;
  position: absolute;
  top: 8px;
  right: 8px;
  border: 2px solid black;
  height: 15px;
  width: 32px;
  &:before {
    content: '';
    border-radius: 3px;
    position: absolute;
    left: 1px;
    top: 1px;
    height: calc(100% - 2px);
    background-color: black;
    width: ${props => `calc(${props.charge}% - 2px)`};
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

import styled, { css } from 'react-emotion'

const baseError = css`
  width: 100%;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;

  h2 {
    font-weight: 700;
    margin: 20px 0;
    font-size: 22px;
  }
  pre {
    overflow: scroll;
    margin-top: 10px;
    font-size: 10px;
    padding: 5px;
    background: #000;
    color: #00ff00;
    text-align: left;
  }
`

export const ErrorBoundryMessage = styled.div`
  ${baseError};
`

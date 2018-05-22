import styled, { css } from 'react-emotion'

const baseError = css`
  width: 50%;
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
    border: 1px solid #ddd;
    text-align: left;
    border-radius: 4px;
  }
`

export const ErrorBoundryMessage = styled.div`
  ${baseError};
`

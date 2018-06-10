import styled, { css } from 'react-emotion'
import theme from '@/style/common'

const baseError = css`
  width: 100%;
  height: 100%;
  top: ${theme.appHeaderHeight};
  left: 0;
  position: fixed;
  text-align: center;
  background: #000;
  color: #29d829;
  margin-top: 10px;
  font-size: 10px;
  padding: 5px;
  text-align: left;
  padding: 10px;
  h2 {
    font-weight: 700;
    margin: 20px 0;
    font-size: 22px;
  }
  .error-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`

export const ErrorBoundryMessage = styled.div`
  ${baseError};
`

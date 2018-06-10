import { injectGlobal } from 'react-emotion'
import theme from './common.js'

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ::selection {
    background: rgba(106, 180, 173, 0.99);
    color: #d8fdff;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 300;
  }

  body {
    background: ${theme.secColor};
    color: ${theme.mainTextColor};
    font-family: ${theme.fontStack};
    font-weight: 300;
    font-size: 14px;
  }
`

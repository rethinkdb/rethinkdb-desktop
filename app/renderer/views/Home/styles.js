import styled from 'react-emotion'

import theme from '@/style/common'

export const StyledHome = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 760px;

  > .banner,
  > .empty__message {
    text-align: center;
  }

  > .banner {
    > .banner__title {
      font-size: 50px;
      font-weight: 900;
      background: ${theme.mainGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  > .empty__message {
    margin-top: 50px;

    > h2 {
      font-size: 22px;
    }

    > p {
      margin: 10px 0 30px;
    }
  }
`

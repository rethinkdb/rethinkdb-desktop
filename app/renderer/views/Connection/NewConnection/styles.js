import styled from 'react-emotion'
import theme from '@/style/common'

export const StyledNewConnection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  .row {
    width: 100%;
    padding: 15px 0;
    input[type='text'] {
      width: 100%;
      height: 38px;
      background: transparent;
      border: none;
      border-bottom: 1px solid #603e85;
      transition: all ease-in 500ms;
      color: ${theme.mainTextColor};
      &:focus {
        outline: none;
        border-bottom-color: #EB48CA;
      }
    }
    button {
      width: 90px;
      height: 34px;
      background: transparent;
      border: 1px solid #603e85;
      color: #603e85;
      transition: all ease-in 500ms;
      cursor: pointer;
      &:hover {
        border-color: #EB48CA;
        color: #EB48CA;
      }
      &:focus {
        outline: none;
      }
    }
    &.actions {
      display: flex;
      flex-flow: row-reverse;
    }
  }
`

export const ConnectionInfo = styled('p')({
  fontSize: '10px',
  letterSpacing: '1px',
  color: theme.secTextColor,
  position: 'absolute',
  bottom: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  '> span': {
    fontWeight: 700
  }
})

import styled from 'react-emotion';
import theme from '@/style/common'

export const StyledNewConnection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  &-row {
    width: 100%;
    height: 140px;

    .icon, .title  {
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
    .top {
      margin-bottom: 20px;
    }
    .bottom {
      position: relative;
    }
    .browse {
      position: absolute;
      left: 230px;
      top: 10px;
      cursor: pointer;
    }
    input[type="text"] {
      width: 250px;
      height: 38px;
      background: transparent;
      border: none;
      border-bottom: 1px solid #fff;
      transition: all ease-in 500ms;
      color: @MAIN_TEXT_COLOR;
      &:focus {
        outline: none;
        border-bottom-color: #48A4ED;
      }
    }
    button {
      width: 90px;
      background: transparent;
      border: 1px solid @MAIN_TEXT_COLOR;
      color: @MAIN_TEXT_COLOR;
      height: 38px;
      margin-left: 10px;
      transition: all ease-in 500ms;
      cursor: pointer;
      &:hover {
        border-color: @SEC_COLOR;
        color: @SEC_COLOR;
      }
      &:focus {
        outline: none;
      }
    }

  }
`

import styled, { css } from 'react-emotion'
import theme from '@/style/common'

export const StyledEditForm = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '280px',
  '.title': {
    textAlign: 'center',
    'h2': {
      margin: '15px 0'
    },
  },
  '.row': {
    width: '100%',
    padding: '15px 0',
    'input[type="text"]': {
      width: '100%',
      height: '38px',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid #603e85',
      transition: 'all ease-in 500ms',
      color: theme.mainTextColor,
      '&:focus': {
        outline: 'none',
        borderBottomColor: '#eb48ca'
      }
    },
    button: {
      width: '90px',
      height: '34px',
      background: 'transparent',
      border: '1px solid #603e85',
      color: '#603e85',
      transition: 'all ease-in 500ms',
      cursor: 'pointer',
      '&:hover': {
        borderColor: '#eb48ca',
        color: '#eb48ca'
      },
      '&:focus': {
        outline: 'none'
      }
    },
    '&.actions': {
      display: 'flex',
      flexFlow: 'row-reverse'
    }
  }
})

export const GoBackLink = css({
  fontSize: '14px',
  textDecoration: 'none',
  letterSpacing: '1px',
  color: theme.secTextColor,
  position: 'absolute',
  top: '58px',
  left: '20px',
  '&:hover': {
    color: '#eb48ca'
  },
})



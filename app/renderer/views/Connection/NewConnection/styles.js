import styled from 'react-emotion'
import theme from '@/style/common'

export const MainContent = styled('main')(props => ({
  position: 'relative',
  margin: `0 0 0 ${theme.sideBarWidth}`,
  top: theme.appHeaderHeight,
  height: `calc(100vh - ${theme.appHeaderHeight})`
}))

export const Title = styled('h2')({
  textAlign: 'center',
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '280px'
})

export const StyledNewConnection = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '280px',
  '.row': {
    width: '100%',
    padding: '15px 0',
    'input[type="text"],input[type="password"]': {
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

export const ConnectionError = styled('p')({
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '1px',
  color: theme.error,
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
})

export const Connecting = styled('p')({
  fontSize: '14px',
  fontWeight: 700,
  color: theme.info,
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
})

export const Logo = styled('img')({
  position: 'absolute',
  top: '45%',
  left: '30%',
  transform: 'translate(-50%, -50%)'
})

import styled from 'react-emotion'
import theme from '@/style/common'

export const StyledSideBar = styled('aside')(props => ({
  position: 'fixed',
  top: theme.appHeaderHeight,
  height: '100vh',
  width: theme.sideBarWidth,
  background: '#603e85',
  zIndex: 2
}))

export const Logo = styled('div')(props => ({
  position: 'absolute',
  bottom: '100px',
  textAlign: 'center',
  width: '100%',

  '> span':  {
    fontSize: '22px',
    fontFamily: 'Quicksand',
    fontWeight: 700,
    color: theme.contrastTextColor,
    border: 'solid #fff',
    borderWidth: '3px 0'
  }
}))
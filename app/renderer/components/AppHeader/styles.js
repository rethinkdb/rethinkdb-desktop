import styled from 'react-emotion'
import theme from '@/style/common'

export const StyledAppHeader = styled('header')(props => ({
  position: 'fixed',
  width: '100%',
  top: 0,
  backgroundColor: theme.secColor,
  borderBottom: `1px solid ${theme.mainBorderColor}`,
  zIndex: 2,
  height: theme.appHeaderHeight,
  padding: '10px 15px 10px 0'
}))

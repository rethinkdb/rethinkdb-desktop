import styled from 'react-emotion'
import theme from '@/style/common'

export const StyledMainContent = styled('main')(props => ({
  position: 'relative',
  margin: `0 0 0 ${theme.sideBarWidth}`,
  top: theme.appHeaderHeight,
  height: `calc(100vh - ${theme.appHeaderHeight})`
}))
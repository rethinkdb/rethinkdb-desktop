import styled from 'react-emotion'
import theme from '@/style/common'

export const StyledActionsBar = styled('header')(props => ({
  display: 'flex',
  width: '100%',
  backgroundColor: theme.contrastColor,
  borderBottom: `1px solid ${theme.mainBorderColor}`,
  height: '50px',
  padding: '15px',
  'h3': {
    fontWeight: 500
  }
}))
import styled from 'react-emotion'
import theme from '@/style/common'

export const StyledConnectionList = styled('ul')({
  padding: '10px',
  listStyle: 'none'
})

export const StyledConnectionItem = styled('div')(props => ({
  fontSize: '11px',
  padding: '5px 0',
  borderRadius: '5px',
  marginBottom: '5px',
  position: 'relative',
  paddingLeft: '15px',
  wordBreak: 'break-word',
  color: theme.mainColorLight,
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '10px',
    background: props.color,
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  '&.active': {
    color: theme.contrastTextColor
  }
}))

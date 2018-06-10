import styled, { css } from 'react-emotion'
import theme from '@/style/common'

export const StyledConnectionList = styled('ul')({
  padding: '10px',
  listStyle: 'none'
})

export const StyledConnectionItem = styled('li')(props => ({
  fontSize: '14px',
  padding: '5px 0',
  marginBottom: '5px',
  position: 'relative',
  paddingLeft: '15px',
  color: theme.mainColorLight,
  display: 'flex',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '9px',
    background: props.color,
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  '&.active': {
    color: theme.contrastTextColor
  }
}))

export const StyledConnectionName = styled('span')(props => ({
  marginRight: 'auto',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  '&:hover': {
    color: theme.contrastTextColor
  }
}))

export const StyledActionsButton = styled('span')(props => ({
  cursor: 'pointer',
  '&:hover': {
    color: theme.contrastTextColor
  }
}))

export const MenuItemIcon = css({
  'i': {
    marginRight: '10px'
  }
})
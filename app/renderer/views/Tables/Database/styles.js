import styled, { css } from 'react-emotion'
import theme from '@/style/common'

export const StyledDatabaseList = styled('ul')({
  padding: '15px',
  listStyle: 'none'
})

export const StyledDatabaseItem = styled('li')({
  border: `1px solid ${theme.mainBorderColor}`,
  marginBottom: '10px',
  header: {
    background: theme.contrastColor,
    padding: '8px',
    borderBottom: `1px solid ${theme.mainBorderColor}`,
    display: 'flex',
    '.db-name': {
      paddingLeft: '20px',
      fontWeight: 500,
      fontSize: '16px'
    }
  }
})

export const DBLabel = styled('span')({
  display: 'inline-block',
  padding: '0 7px',
  height: '22px',
  lineHeight: '20px',
  textAlign: 'center',
  color: '#eb2f96',
  background: '#fff0f6',
  border: '1px solid #ffadd2',
  fontSize: '12px'
})

export const DBActions = css({
  marginLeft: 'auto'
})

export const DBActionButton = css({
  marginLeft: '8px',
  padding: '5px 12px',
  background: 'transparent',
  border: '1px solid #603e85',
  color: '#603e85',
  transition: 'all ease-in 250ms',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#eb48ca',
    color: '#eb48ca'
  },
  '&:focus': {
    outline: 'none'
  },
  '&:disabled': {
    border: '1px solid #aaa',
    color: '#aaa',
    cursor: 'auto'
  }
})

export const EmptyList = styled('div')({
  textAlign: 'center',
  fontSize: '15px',
  padding: '15px 0'
})

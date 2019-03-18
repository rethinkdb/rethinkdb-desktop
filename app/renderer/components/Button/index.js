import styled from 'react-emotion'

export const Button = styled('button')(props => ({
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
}))

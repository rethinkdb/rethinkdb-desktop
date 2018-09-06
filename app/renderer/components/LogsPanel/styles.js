import styled from 'react-emotion'
import theme from '@/style/common'

export const Message = styled('div')({
  flex: 1,
  div: {
    div: {
      margin: '0.5rem 0'
    }
  }
})

export const Server = styled('span')({
  color: `${theme.info}`,
  fontStyle: 'italic'
})

export const Box = styled('div')({
  border: `1px solid ${theme.mainBorderColor}`,
  background: `${theme.contrastColor}`,
  boxShadow: '0 2px 1px rgba(0, 0, 0, 0.04), inset 0 -1px 2px rgba(0, 0, 0, 0.05)',
  margin: '2rem',
  h1: {
    padding: '1rem'
  },
  hr: {
    margin: '0 1rem 0.5rem 1rem',
    display: 'block',
    height: '1px',
    border: 0,
    borderTop: `1px solid ${theme.mainBorderColor}`,
    padding: 0
  },
  ul: {
    listStyle: 'none'
  },
  li: {
    display: 'flex',
    alignItems: 'center'
  }
})

export const Level = styled('div')(({ value }) => ({
  margin: '1rem',
  width: '1rem',
  height: '1rem',
  borderRadius: '50%',
  background: `${value === 'info' ? theme.info : theme.grayTextColor}`
}))

export const Time = styled('div')({
  width: '6rem',
  marginLeft: '2rem'
})

import styled, { css } from 'react-emotion'
import theme from '@/style/common'

export const Panels = styled('div')({
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  backgroundColor: '#fff',
  boxShadow: '1px 1px 3px rgba(88, 66, 88, 0.1)'
})

export const Panel = styled('div')({
  outline: 'none',
  padding: '10px',
  margin: '5px'
})


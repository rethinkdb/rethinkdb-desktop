import styled from 'react-emotion'
import theme from '@/style/common'

export const Panel = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  height: '20rem',
  margin: '2rem',
  borderBottom: `1px solid ${theme.mainBorderColor}`,
  border: `1px solid ${theme.mainBorderColor}`,
  background: `${theme.contrastColor}`,
  boxShadow: '0 2px 1px rgba(0, 0, 0, 0.04), inset 0 -1px 2px rgba(0, 0, 0, 0.05)'
})

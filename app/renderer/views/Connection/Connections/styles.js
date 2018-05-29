import styled from 'react-emotion'
import theme from '@/style/common'
import randomColor from 'random-color'

export const StyledConnectionList = styled('ul')({
  padding: '10px',
  color: theme.contrastTextColor,
  listStyle: 'none',
})

export const StyledConnectionItem = styled('div')(
  {
    fontSize: '11px',
    padding: '5px 0',
    background: randomColor()
  },
)
// const AnotherComponent = styled('h1')(
//   {
//     color: 'hotpink'
//   },
//   props => ({ flex: props.flex })
// )
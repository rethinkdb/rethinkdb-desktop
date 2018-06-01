import React from 'react'
import randomColor from 'randomcolor'
import { StyledConnectionItem } from './styles'

const ConnectionItem = props => {
  const { onItemClick, item } = props
  const { id, name, address } = item
  const color = randomColor({ seed: id, luminosity: 'bright' })
  const handleClick = () => onItemClick({ id, name, address })

  return (
    <StyledConnectionItem color={color} onClick={handleClick}>
      {name}
    </StyledConnectionItem>
  )
}

export default ConnectionItem

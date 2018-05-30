import React from 'react'
import randomColor from 'randomcolor'
import { StyledConnectionItem } from './styles'

const ConnectionItem = props => {
  const { id, name } = props.item
  const color = randomColor({ seed: id, luminosity: 'bright' })
  return <StyledConnectionItem color={color}>{name}</StyledConnectionItem>
}

export default ConnectionItem

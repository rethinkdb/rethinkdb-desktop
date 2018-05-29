import React from 'react'
import { StyledConnectionItem } from './styles'
const ConnectionItem = props => {
  const { id, name, address } = props.item
  return <StyledConnectionItem id={id}>{name}</StyledConnectionItem>
}

export default ConnectionItem

import React from 'react'
import randomColor from 'randomcolor'
import ConnectionItemActions from './ConnectionItemActions'
import { StyledConnectionItem, StyledConnectionName } from './styles'

const ConnectionItem = props => {
  const { item, onItemClick, onEdit, onDelete } = props
  const { id, name, address, connectionId } = item
  const color = randomColor({ seed: connectionId, luminosity: 'bright' })
  const handleClick = () => onItemClick({ id, name, address })

  return (
    <StyledConnectionItem color={color}>
      <StyledConnectionName onClick={handleClick}>{name}</StyledConnectionName>
      <ConnectionItemActions connectionId={id} onEdit={onEdit} onDelete={onDelete} />
    </StyledConnectionItem>
  )
}

export default ConnectionItem

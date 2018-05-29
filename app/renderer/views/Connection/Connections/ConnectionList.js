import React from 'react'
import ConnectionListHeader from './ConnectionListHeader'
import ConnectionItem from './ConnectionItem'
import { StyledConnectionList } from './styles'
const ConnectionList = props => {
  const { data } = props
  return (
    <StyledConnectionList>
      <ConnectionListHeader />
      <ul>{data.map(c => <ConnectionItem key={c.id} item={c} />)}</ul>
    </StyledConnectionList>
  )
}

export default ConnectionList

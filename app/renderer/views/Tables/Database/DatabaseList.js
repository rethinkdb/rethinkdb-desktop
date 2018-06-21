import React from 'react'
import { StyledDatabaseList} from './styles'
import DatabaseItem from './DatabaseItem'

const DatabaseList = props => {
  const { list } = props
  return (
    <StyledDatabaseList>
      {list.map(db => (
        <DatabaseItem key={db.id} item={db} />
      ))}
    </StyledDatabaseList>
  )
}

export default DatabaseList
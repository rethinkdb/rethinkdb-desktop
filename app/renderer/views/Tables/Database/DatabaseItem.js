import React from 'react'
import { StyledDatabaseItem, DBLabel} from './styles'

const DatabaseItem = props => {
  const { name } = props.item
  return (
    <StyledDatabaseItem>
      <header>
        <DBLabel>Database</DBLabel>
        <span className="db-name">{name}</span>
      </header>
      <section>tables list</section>
    </StyledDatabaseItem>
  )
}

export default DatabaseItem
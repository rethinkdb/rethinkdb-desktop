import React from 'react'
import TableItem from '../Table/TableItem'
import { StyledDatabaseItem, DBLabel, DBActions, DBActionButton } from './styles'
import { StyledTableList } from '../Table/styles'

const DatabaseItem = props => {
  const { item, onTableSelect } = props
  const { name, tables } = item

  const renderTables = () =>
    tables.map(t => <TableItem key={t.id} table={t} onTableSelect={onTableSelect} />)

  return (
    <StyledDatabaseItem>
      <header>
        <DBLabel>Database</DBLabel>
        <span className="db-name">{name}</span>
        <div className={DBActions}>
          <button className={DBActionButton}>Add Table</button>
          <button className={DBActionButton}>Delete Database</button>
        </div>
      </header>
      <StyledTableList>{renderTables()}</StyledTableList>
    </StyledDatabaseItem>
  )
}

export default DatabaseItem

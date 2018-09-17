import React from 'react'
import TableItem from '../Table/TableItem'
import { StyledDatabaseItem, DBLabel, DBActions, DBActionButton, EmptyList } from './styles'
import { StyledTableList } from '../Table/styles'

const DatabaseItem = props => {
  const { item, onTableSelect, openDeleteDatabaseModal, openAddTableModal } = props
  const { name, tables } = item

  const renderEmptyList = () => <EmptyList>There are no tables in this database.</EmptyList>

  const renderTables = () =>
    tables.map(t => <TableItem key={t.id} table={t} onTableSelect={onTableSelect} />)

  const onDBDelete = () => {
    openDeleteDatabaseModal(name)
  }

  const onAddTable = () => {
    openAddTableModal(name)
  }

  return (
    <StyledDatabaseItem>
      <header>
        <DBLabel>Database</DBLabel>
        <span className='db-name'>{name}</span>
        <div className={DBActions}>
          <button className={DBActionButton} onClick={onAddTable}>
            Add Table
          </button>
          <button className={DBActionButton} onClick={onDBDelete}>
            Delete Database
          </button>
        </div>
      </header>
      <StyledTableList>{tables.length ? renderTables() : renderEmptyList()}</StyledTableList>
    </StyledDatabaseItem>
  )
}

export default DatabaseItem

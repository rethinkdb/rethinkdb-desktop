import React from 'react'
import { StyledDatabaseList, EmptyList } from './styles'
import DatabaseItem from './DatabaseItem'

const DatabaseList = props => {
  const { list, onTableSelect } = props

  const renderEmptyList = () => <EmptyList>There are no databases in this cluster.</EmptyList>
  const renderList = () =>
    list.map(db => <DatabaseItem key={db.id} item={db} onTableSelect={onTableSelect} />)

  return <StyledDatabaseList>{list.length ? renderList() : renderEmptyList()}</StyledDatabaseList>
}

export default DatabaseList

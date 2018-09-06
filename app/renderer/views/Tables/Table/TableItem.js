import React from 'react'
import { humanizeTableReadiness } from '../../../helpers/format'
import Icon from '../../../components/Icon'
import { StyledTableItem, TableStatus } from './styles'

const TableItem = props => {
  const { table, onTableSelect } = props
  const { id, name, db, replicas, replicasReady, shards, status } = table
  const { label, value } = humanizeTableReadiness(status, replicasReady, replicas)

  const handleSelect = () => onTableSelect({ id, name, db })

  return (
    <StyledTableItem>
      <div className="tableSelect">
        <input type="checkbox" name="tableSelect" onChange={handleSelect} />
      </div>
      <div className="tableName">
        <a href={`#/tables/?id=${id}`}>{name}</a>
      </div>
      <div className="tableShardsReplicas">
        <Icon type="copy" size={16} color="#333" className="tableShardsReplicasIcon" />
        <span className="tableShardsReplicasText">
          replicas: {replicas}, shards: {shards}
        </span>
      </div>
      <div className="tableStatus">
        <TableStatus status={label}>{value}</TableStatus>
      </div>
    </StyledTableItem>
  )
}

export default TableItem

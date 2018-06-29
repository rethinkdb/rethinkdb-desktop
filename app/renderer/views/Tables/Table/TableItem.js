// db: 'c'
// id: '54036e34-0c46-4dbe-bb94-a1cbe1dc7da5'
// name: 'c1'
// raft_leader: 'c97aa6d70b80_1nl'
// replicas: 1
// replicasReady: 1
// shards: 1
// status: all_replicas_ready: true
// ready_for_outdated_reads: true
// ready_for_reads: true
// ready_for_writes: true
import React from 'react'
import { humanizeTableReadiness } from '../../../helpers/format'
import Icon from '../../../components/Icon'
import theme from '@/style/common'
import { StyledTableItem, TableStatus } from './styles'

const TableItem = props => {
  const { table, onTableSelect } = props
  const { id, name, db, replicas, replicasReady, shards, status } = table
  const { label, value } = humanizeTableReadiness(status, replicasReady, replicas)

  const handleSelect = () => onTableSelect({id, name, db})

  return (
    <StyledTableItem>
      <div className="tableSelect">
        <input type="checkbox" name="tableSelect" onChange={handleSelect} />
      </div>
      <div className="tableName">
        <a href={`#/tables/?id=${id}`}>{name}</a>
      </div>
      <div className="tableShardsReplicas">
        <Icon
          type="copy"
          size={16}
          color="#333"
          className="tableShardsReplicasIcon"
        />
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

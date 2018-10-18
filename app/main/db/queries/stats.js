const { r } = require('rethinkdb-ts')
const driver = require('../driver')
const { SYSTEM_DB } = require('../../helpers/constants')

const connection = () => driver.getConnection()
const sysTable = name => r.db(SYSTEM_DB).table(name)

const getServerStats = () => {
  const serverConfig = sysTable('server_config')
  const serverStatus = sysTable('server_status')
  const tableConfig = sysTable('table_config')

  return r
    .do(
      serverConfig.nth(0),
      // All connected servers
      serverStatus('name').coerceTo('array'),
      // All servers assigned to tables
      tableConfig
        .concatMap(row => row('shards').default([]))
        .concatMap(row => row('replicas'))
        .distinct(),
      (server, connectedServers, assignedServers) => ({
        server,
        serversConnected: connectedServers.count(),
        serversMissing: assignedServers.setDifference(connectedServers),
        unknownMissing: tableConfig
          .filter(row => row.hasFields('shards').not())('name')
          .isEmpty()
          .not()
      })
    )
    .run(connection())
}

const getTableStats = async () => {
  const tableStatus = sysTable('table_status')

  const tablesReady = await tableStatus
    .count(row => row('status')('all_replicas_ready'))
    .run(connection())

  const tablesNotReady = await tableStatus
    .count(row => row('status')('all_replicas_ready').not())
    .run(connection())

  return {
    tablesReady,
    tablesNotReady
  }
}

const getIndexStats = async () => {
  const tableConfig = sysTable('table_config')
  const jobs = sysTable('jobs')

  const secondaryIndexes = await tableConfig.sum(row => row('indexes').count()).run(connection())
  const secondaryIndexesConstructing = await jobs
    .filter({ type: 'index_construction' })('info')
    .map(row => ({
      db: row('db'),
      table: row('table'),
      index: row('index'),
      progress: row('progress')
    }))
    .coerceTo('array')
    .run(connection())

  return {
    secondaryIndexes,
    secondaryIndexesConstructing
  }
}

const getResourceStats = async () => {
  const stats = sysTable('stats')
  const serverStatus = sysTable('server_status')

  const cacheUsed = await stats
    .filter(stat => stat('id').contains('table_server'))('storage_engine')('cache')('in_use_bytes')
    .sum()
    .run(connection())

  const cacheTotal = await serverStatus('process')('cache_size_mb')
    .map(row => row.mul(1024 * 1024))
    .sum()
    .run(connection())

  const diskUsed = await stats
    .filter(row => row('id').contains('table_server'))('storage_engine')('disk')('space_usage')
    .map(data =>
      data('data_bytes')
        .add(data('garbage_bytes'))
        .add(data('metadata_bytes'))
        .add(data('preallocated_bytes'))
    )
    .sum()
    .run(connection())

  return {
    cacheUsed,
    cacheTotal,
    diskUsed
  }
}

const getIssuesStats = () => {
  return sysTable('current_issues')
    .coerceTo('array')
    .run(connection())
}

module.exports = {
  getIssuesStats,
  getServerStats,
  getTableStats,
  getIndexStats,
  getResourceStats
}

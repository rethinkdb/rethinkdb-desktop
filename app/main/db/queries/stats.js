const { r } = require('rebirthdb-ts')

module.exports = {
  getServers,
  getTables
}

function getServers() {
  return r
    .db('rethinkdb')
    .table('stats')
    .filter(row =>
      row('id')
        .nth(0)
        .eq('server')
    )
    .coerceTo('array')
}

function getTables() {
  return r
    .db('rethinkdb')
    .table('table_config')
    .coerceTo('array')
}

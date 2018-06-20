const { r } = require('rebirthdb-ts')

const tableList = () => {
  return r
    .db('rethinkdb')
    .table('table_config')
    .coerceTo('array')
}

module.exports = {
  tableList
}

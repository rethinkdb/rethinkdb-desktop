const { r } = require('rebirthdb-ts')
const driver = require('../driver')

const connection = () => driver.getConnection()

const tableList = () => {
  return r
    .db('rethinkdb')
    .table('table_config')
    .coerceTo('array')
    .run(connection())
}

module.exports = {
  tableList
}
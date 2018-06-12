const { r } = require('rebirthdb-ts')
const driver = require('../driver')

const connection = () => driver.getConnection()

const serverList = () => {
  const conn = connection()
  return r
    .db('rethinkdb')
    .table('stats')
    .filter(row =>
      row('id')
        .nth(0)
        .eq('server')
    )
    .coerceTo('array')
    .run(conn)
}

module.exports = {
  serverList
}
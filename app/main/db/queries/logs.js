const { r } = require('rethinkdb-ts')
const driver = require('../driver')
const { SYSTEM_DB } = require('../../helpers/constants')

const connection = () => driver.getConnection()

module.exports = {
  getLogs
}

function getLogs () {
  return r
    .db(SYSTEM_DB)
    .table('logs')
    .limit(10)
    .coerceTo('array')
    .run(connection())
}

const { r } = require('rethinkdb-ts')
const driver = require('../driver')
const { SYSTEM_DB } = require('../../helpers/constants')

const connection = () => driver.getConnection()

module.exports = {
  getReadWriteChanges
}

function getReadWriteChanges () {
  return r
    .db(SYSTEM_DB)
    .table('stats')
    .get(['cluster'])
    .changes()
    .run(connection())
}

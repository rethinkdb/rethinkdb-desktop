const { r } = require('rebirthdb-ts')
const driver = require('../driver')
const { SYSTEM_DB } = require('../../helpers/constants')

const connection = () => driver.getConnection()
const addDatabase = ({ name }) => {
  return r
    .db(SYSTEM_DB)
    .table('db_config')
    .insert({ name })
    .run(connection())
}

const deleteDatabase = ({ name }) => {
  return r.dbDrop(name).run(connection())
}

module.exports = {
  addDatabase,
  deleteDatabase
}

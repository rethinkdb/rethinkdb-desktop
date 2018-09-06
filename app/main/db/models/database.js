const { addDatabase, deleteDatabase } = require('../queries/database')

const database = {
  add(name) {
    return addDatabase(name)
  },
  del(name) {
    return deleteDatabase(name)
  }
}

module.exports = database

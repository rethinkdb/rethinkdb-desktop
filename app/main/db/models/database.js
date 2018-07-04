const { addDatabase } = require('../queries/database')

const database = {
  add (name) {
    return addDatabase(name)
  }
}

module.exports = database
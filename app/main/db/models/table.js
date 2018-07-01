const { tablesByDb, deleteTables } = require('../queries/table')

const table = {
  tablesByDb () {
    return tablesByDb()
  },

  deleteTables (tables) {
    return deleteTables(tables)
  },
  
  getTable(matchers = {}) {}
}

module.exports = table

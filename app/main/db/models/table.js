const { tablesByDb, addTable, deleteTables } = require('../queries/table')

const table = {
  tablesByDb () {
    return tablesByDb()
  },
  add (table) {
    try {
      return addTable(table)
    } catch (e) {
      console.log('e', e)
    }
  },
  del (tables) {
    return deleteTables(tables)
  },

  getTable (matchers = {}) {}
}

module.exports = table

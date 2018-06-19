const { tableList } = require('../queries/table')

const table = {
  getTables() {
    return tableList()
  },

  getTable(matchers = {}) {

  }
}

module.exports = table
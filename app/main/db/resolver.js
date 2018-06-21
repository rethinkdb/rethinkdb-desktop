const table = require('./models/table')

const queries = {
  'tablesByDb': table.tablesByDb
}
const queryResolver = (query='query', args) => {
  if (!queries[query]) {
    throw new Error(`Could not resolve query "${query}"`)
  }
  return queries[query](args)
}

module.exports = queryResolver

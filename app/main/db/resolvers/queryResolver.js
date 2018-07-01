const table = require('../models/table')

const queries = {
  'tablesByDb': table.tablesByDb
}
const queryResolver = ({name = 'query', payload = {}}) => {
  if (!queries[name]) {
    throw new Error(`Could not resolve query "${name}"`)
  }
  return queries[name](payload)
}

module.exports = queryResolver

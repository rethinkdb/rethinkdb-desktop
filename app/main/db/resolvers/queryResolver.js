const table = require('../models/table')
const logs = require('../models/logs')

const queries = {
  'tablesByDb': table.tablesByDb,
  'getLogs': logs.getLogs
}
const queryResolver = ({name = 'query', payload = {}}) => {
  if (!queries[name]) {
    throw new Error(`Could not resolve query "${name}"`)
  }
  return queries[name](payload)
}

module.exports = queryResolver

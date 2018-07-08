const table = require('../models/table')
const database = require('../models/database')

const actions = {
  'addDatabase': database.add,
  'deleteDatabase': database.del,
  'addTable': table.add,
  'deleteTables': table.del
}
const actionResolver = ({name = 'action', payload = {}}) => {
  if (!actions[name]) {
    throw new Error(`Could not resolve action "${name}"`)
  }
  return actions[name](payload)
}

module.exports = actionResolver

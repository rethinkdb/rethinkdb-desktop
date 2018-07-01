const table = require('../models/table')

const actions = {
  'deleteTables': table.deleteTables
}
const actionResolver = ({name = 'action', payload = {}}) => {
  if (!actions[name]) {
    throw new Error(`Could not resolve action "${name}"`)
  }
  return actions[name](payload)
}

module.exports = actionResolver

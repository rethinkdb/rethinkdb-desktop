const { r } = require('rethinkdb-ts')

const serverList = () => {
  return r
    .db('rethinkdb')
    .table('stats')
    .filter(row =>
      row('id')
        .nth(0)
        .eq('server')
    )
    .coerceTo('array')
}

module.exports = {
  serverList
}

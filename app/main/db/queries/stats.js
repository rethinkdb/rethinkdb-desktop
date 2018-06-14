const driver = require('../driver')
const { serverList } = require('./server')
const { tableList } = require('./table')

const connection = () => driver.getConnection()

const getStats = () => {
  if(!connection()) return
  const serverPromise = serverList().run(connection())
  const tablePromise = tableList().run(connection())
  return Promise.all([serverPromise, tablePromise])
}

module.exports = {
  getStats
}
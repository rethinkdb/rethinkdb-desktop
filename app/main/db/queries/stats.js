const driver = require('../driver')
const { serverList } = require('./server')
const { tableList } = require('./table')

const connection = () => driver.getConnection()

const getStats = () => {
  if(!connection()) return
  return Promise.all([serverList(), tableList()])
}

module.exports = {
  getStats
}
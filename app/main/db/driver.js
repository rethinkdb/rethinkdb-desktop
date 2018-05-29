const r = require('rethinkdbdash')

let connection

const driver = {
  connect(config) {
    if (connection) {
      driver.disconnect()
    }
    return r(config)
  },
  disconnect() {
    if (connection && connection.getPoolMaster) {
      connection.getPoolMaster().drain()
    }
  }
}

module.exports = driver

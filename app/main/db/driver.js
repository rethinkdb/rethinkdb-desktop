const r = require('rethinkdb')

let connection

const driver = {
  getConnection() {
    if (connection) {
      return connection
    } else {
      throw new Error('there is no active connection')
    }
  },
  async connect(config) {
    if (connection) {
      console.info('there is an active connection - closing current connection')
      await driver.disconnect()
      console.info('closed')
    }
    console.info('new connection request')
    connection = await r.connect(config)
    console.info('connected')
    return connection
  },
  async disconnect() {
    if (connection && connection.close) {
      return connection.close()
    }
  }
}

module.exports = driver

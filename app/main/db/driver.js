const { r } = require('rebirthdb-ts')
const { getServers, getTables } = require('./queries/stats')
// const r = require('rethinkdb')

let connection

const driver = {
  getConnection() {
    return connection
  },
  getServers() {
    return getServers().run(connection)
  },
  getTables() {
    return getTables().run(connection)
  },
  connect: async function(config = {}) {
    try {
      if (connection) {
        console.info('there is an active connection - closing current connection')
        await driver.disconnect()
        console.info('closed')
      }

      console.info('new connection request')
      connection = await r.connect(config)
      console.info('connected')
      return connection
    } catch (error) {
      console.error(error)
      return { error }
    }
  },
  async disconnect() {
    if (connection && connection.close) {
      return connection.close()
    }
  }
}

module.exports = driver

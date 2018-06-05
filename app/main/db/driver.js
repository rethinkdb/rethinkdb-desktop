const { r } = require('rebirthdbts')
// const r = require('rethinkdb')

let connection

const driver = {
  getConnection() {
    return connection
  },
  async getStats() {
    const data = await r.db('rethinkdb').table('stats').filter(row => row('id').nth(0).eq('server')).coerceTo('array').run(connection)
    return data
  },
  connect: async function(config = {}) {
    try {
      const options = { pool: false, servers: [{ ...config }] }
      if (connection) {
        console.info('there is an active connection - closing current connection')
        await driver.disconnect()
        console.info('closed')
      }

      console.info('new connection request')
      connection = await r.connect(options)
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

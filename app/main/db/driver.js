const { r } = require('rebirthdbts')
// const r = require('rethinkdb')

let connection

const driver = {
  getConnection() {
    return connection
  },
  async getStats() {
    const stam1 = await r.table('stam').get('80b4ce56-659e-48a2-a518-75be1b53a5d0')
    console.log(stam1) //{ [Function]
                       // term: [ 16, [ [Array], '80b4ce56-659e-48a2-a518-75be1b53a5d0' ] ] }

    const stam2 = await connection.table('stam').get('80b4ce56-659e-48a2-a518-75be1b53a5d0')
    console.log(stam2) // stuck...
    console.log('oooo')
    return stam1;
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

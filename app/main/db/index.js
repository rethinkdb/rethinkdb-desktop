const ipc = require('electron-better-ipc')
const { connect } = require('./driver')
const { startLiveStats } = require('./models/stats')

const url = require('../helpers/url')

// const queries = {
//   servers: getServers,
//   tables: getTables
// }

ipc.answerRenderer('connect', async ({ name, address }) => {
  const { host, port } = url.extract(address)
  const connectResult = await connect({ host, port })
  // connection created - we can start pushing updates
  startLiveStats()
  return connectResult
})

// ipc.callRenderer(win, 'stats', getLiveStats())

// Object.keys(queries).forEach(name => {
//   const action = queries[name]
//   ipc.answerRenderer(name, () => {
//     try {
//       return action(arguments)
//     } catch (e) {
//       console.error(name, e)
//       throw e
//     }
//   })
// })

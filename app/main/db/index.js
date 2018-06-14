const ipc = require('electron-better-ipc')
const { connect } = require('./driver')
const { startLiveStats } = require('./models/stats')

const url = require('../helpers/url')

ipc.answerRenderer('connect', async ({ name, address }) => {
  const { host, port } = url.extract(address)
  const connectResult = await connect({ host, port })
  // connection created - we can start pushing updates
  startLiveStats()
  return connectResult
})

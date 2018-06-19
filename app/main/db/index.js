const ipc = require('electron-better-ipc')
const { connect } = require('./driver')
const { startLiveStats } = require('./models/stats')
const url = require('../helpers/url')
const { CONNECT_CHANNEL_NAME } = require('../../shared/channels')

ipc.answerRenderer(CONNECT_CHANNEL_NAME, async ({ name, address }) => {
  const { host, port } = url.extract(address)
  const connectResult = await connect({ host, port })
  // connection created - we can start pushing updates
  startLiveStats()
  return connectResult
})

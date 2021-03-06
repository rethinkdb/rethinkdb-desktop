const ipc = require('electron-better-ipc')
const { connect } = require('./driver')
const evalQuery = require('./evalQuery')
const { startLiveStats } = require('./models/stats')
const { startClusterReadWriteChanges } = require('./models/cluster')
const queryResolver = require('./resolvers/queryResolver')
const actionResolver = require('./resolvers/actionResolver')
const url = require('../helpers/url')
const {
  CONNECT_CHANNEL_NAME,
  QUERIES_CHANNEL_NAME,
  ACTIONS_CHANNEL_NAME,
  EVAL_QUERY_CHANNEL_NAME
} = require('../../shared/channels')

ipc.answerRenderer(CONNECT_CHANNEL_NAME, async ({ name, address, username, password }) => {
  const { host, port } = url.extract(address)
  const connectResult = await connect({ host, port, username, password })
  // connection created - we can start pushing updates
  startLiveStats()
  startClusterReadWriteChanges()
  return connectResult
})

ipc.answerRenderer(QUERIES_CHANNEL_NAME, async query => {
  return queryResolver(query)
})

ipc.answerRenderer(ACTIONS_CHANNEL_NAME, async action => {
  return actionResolver(action)
})

ipc.answerRenderer(EVAL_QUERY_CHANNEL_NAME, async code => {
  return evalQuery(code)
})

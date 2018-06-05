const { connect, getServers } = require('./driver')
const ipc = require('electron-better-ipc')
const url = require('../helpers/url')

ipc.answerRenderer('connect', ({ name, address }) => {
  const { host, port } = url.extract(address)
  return connect({ host, port })
})

ipc.answerRenderer('servers', () => getServers())

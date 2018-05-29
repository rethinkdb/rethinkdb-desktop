const { URL } = require('url')

const { connect } = require('./driver')

const ipc = require('electron-better-ipc')

ipc.answerRenderer('connect', ({ name, address }) => {
  const { protocol, hostname, port } = new URL(address)
  const host = ['http://', 'https://'].includes(protocol) ? protocol + hostname : hostname
  return connect({ host, port })
})

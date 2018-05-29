const { URL } = require('url')

const { connect } = require('./driver')

const ipc = require('electron-better-ipc')

ipc.answerRenderer('connect', async ({ name, address }) => {
  try {
    const { protocol, hostname, port } = new URL(address)
    const host = ['http://', 'https://'].includes(protocol) ? protocol + hostname : hostname
    await connect({ host, port })
    return Promise.resolve({ status: 'success', name })
  } catch (e) {
    console.error(e)
    return Promise.reject({ error: e })
  }
})

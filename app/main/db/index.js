const r = require('rethinkdbdash')

const ipc = require('electron-better-ipc')

ipc.answerRenderer('connect', async path => {
  // Connect to Driver here
})

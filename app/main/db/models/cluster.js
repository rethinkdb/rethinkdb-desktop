const { BrowserWindow } = require('electron')
const ipc = require('electron-better-ipc')

const { getReadWriteChanges } = require('../queries/cluster')

const { CLUSTER_CHANNEL_NAME } = require('../../../shared/channels')

const stats = {
  async startClusterReadWriteChanges () {
    console.info('starting live cluster read write changes...')
    try {
      const readWriteChanges = await getReadWriteChanges()
      readWriteChanges.each((err, data) => {
        if (err) {
          console.error(err)
          return
        }
        const win = BrowserWindow.getAllWindows()
        if (win.length) {
          ipc.callRenderer(win[0], CLUSTER_CHANNEL_NAME, data.new_val.query_engine)
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = stats

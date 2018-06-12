const { BrowserWindow } = require('electron')

const ipc = require('electron-better-ipc')
const { getStats } = require('../queries/stats')

let statsInterval = null

const stats = {
  startLiveStats() {
    if (statsInterval) {
      console.info('clearing stats interval...')
      clearInterval(statsInterval)
    }
    console.info('starting live stats...')
    statsInterval = setInterval(async () => {
      try {
        const result = await getStats()
        if(!result) return
        const [servers, tables] = result
        const win = BrowserWindow.getAllWindows()
        if(win.length) {
          ipc.callRenderer(win[0], 'stats', {servers, tables})
        }
      } catch (e) {
        console.warn('startLiveStats failed: ', e)
      }
    }, 2000)
  }
}

module.exports = stats

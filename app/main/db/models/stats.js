const { BrowserWindow } = require('electron')

const ipc = require('electron-better-ipc')
const { getStats } = require('../queries/stats')
const {
  STATS_CHANNEL_NAME
} = require('../../../shared/constants')

let statsInterval = null

const stats = {
  async onTick() {
    try {
      const result = await getStats()
      if(!result) return
      const [servers, tables] = result
      const win = BrowserWindow.getAllWindows()
      if(win.length) {
        ipc.callRenderer(win[0], STATS_CHANNEL_NAME, {servers, tables})
      }
    } catch (e) {
      console.warn('startLiveStats failed: ', e)
    }
  },
  async startLiveStats() {
    if (statsInterval) {
      console.info('clearing stats interval...')
      clearInterval(statsInterval)
    }
    console.info('starting live stats...')
    await stats.onTick()
    statsInterval = setInterval(stats.onTick, 2000)
  }
}

module.exports = stats

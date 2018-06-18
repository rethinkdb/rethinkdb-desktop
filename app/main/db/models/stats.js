const { BrowserWindow } = require('electron')

const ipc = require('electron-better-ipc')
const {
  getServerStats,
  getTableStats,
  getIndexStats,
  getResourceStats
} = require('../queries/stats')

const { STATS_CHANNEL_NAME } = require('../../../shared/channels')

let statsInterval = null

const stats = {
  async onTick() {
    try {
      const servers = await getServerStats()
      const tables = await getTableStats()
      const indexes = await getIndexStats()
      const resources = await getResourceStats()

      const win = BrowserWindow.getAllWindows()
      if (win.length) {
        ipc.callRenderer(win[0], STATS_CHANNEL_NAME, { servers, tables, indexes, resources })
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

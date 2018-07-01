const { getLogs } = require('../queries/logs')

const logs = {
  async getLogs () {
    return getLogs()
  }
}

module.exports = logs
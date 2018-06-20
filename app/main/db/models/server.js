const { serverList } = require('../queries/server')

const server = {
  getServers() {
    return serverList()
  },

  getServer(matchers = {}) {}
}

module.exports = server

import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from 'react-router'
import Routes from './routes'
import { ServersProvider } from './contexts/servers'
import { TablesProvider } from './contexts/tables'
import createHashHistory from 'history/createHashHistory'

import './components/Icon/icons'
import './style/app.js'

const history = createHashHistory()

class App extends Component {
  state = {
    tables: [],
    servers: []
  }

  componentDidMount() {}

  onConnected = connection => {
    this.registerForStats(connection)
  }

  registerForStats(connection) {
    if (this.statsFetchInterval) {
      clearInterval(this.statsFetchInterval)
    }

    this.statsFetchInterval = setInterval(async () => {
      const [servers, tables] = await Promise.all([connection.getServers(), connection.getTables()])

      this.setState({ servers, tables })
    }, 2000)
  }

  render() {
    const { servers, tables } = this.state
    return (
      <ServersProvider value={servers}>
        <TablesProvider value={tables}>
          <Router history={history}>
            <Routes onConnected={this.onConnected} />
          </Router>
        </TablesProvider>
      </ServersProvider>
    )
  }
}

export default hot(module)(App)

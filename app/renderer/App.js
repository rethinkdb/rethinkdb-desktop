import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from 'react-router'
import Routes from './routes'
import {ServersProvider} from './contexts/servers'
import createHashHistory from 'history/createHashHistory'

import './components/Icon/icons'
import './style/app.js'

const history = createHashHistory()

class App extends Component {
  state = {
    servers: []
  }

  componentDidMount() {}

  onConnected = (connection) => {
    this.registerForStats(connection);
  }

  registerForStats(connection) {
    if (this.statsFetchInterval) {
      clearInterval(this.statsFetchInterval);
    }

    this.statsFetchInterval = setInterval(async () => {
      const servers = await connection.getServers()
      this.setState({servers})
    }, 2000);
  }

  render() {
    const {servers} = this.state
    return (
      <ServersProvider value={servers} >
        <Router history={history}>
          <Routes onConnected={this.onConnected}/>
        </Router>
      </ServersProvider>
    )
  }
}

export default hot(module)(App)

import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from 'react-router'
import createHashHistory from 'history/createHashHistory'
import Routes from './routes'
import { ServersProvider } from './contexts/servers'
import { TablesProvider } from './contexts/tables'
import query from './service/query'
import './components/Icon/icons'
import './style/app.js'

const history = createHashHistory()

class App extends Component {
  state = {
    tables: [],
    servers: []
  }

  onLiveStats = (data) => {
    const { servers, tables } = data
    this.setState({ servers, tables })
  }

  componentDidMount() {
    query.subscribeToLiveStats(this.onLiveStats)
  }

  render() {
    const { servers, tables } = this.state
    return (
      <ServersProvider value={servers}>
        <TablesProvider value={tables}>
          <Router history={history}>
            <Routes />
          </Router>
        </TablesProvider>
      </ServersProvider>
    )
  }
}

export default hot(module)(App)

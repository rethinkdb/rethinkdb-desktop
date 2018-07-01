import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from 'react-router'
import createHashHistory from 'history/createHashHistory'
import Routes from './routes'
import StatsProvider from './contexts/StatsContext'
import './components/Icon/icons'
import './style/app.js'

const history = createHashHistory()

class App extends Component {
  render () {
    return (
      <StatsProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </StatsProvider>
    )
  }
}

export default hot(module)(App)

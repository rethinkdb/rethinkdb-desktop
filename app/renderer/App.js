import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from 'react-router'
import Routes from './routes'
import createHashHistory from 'history/createHashHistory'

import './components/Icon/icons'

import './style/app.js'

const history = createHashHistory()

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    )
  }
}

export default hot(module)(App)

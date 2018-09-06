import React, { Component, Fragment } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from 'react-router'
import createHashHistory from 'history/createHashHistory'
import Routes from './routes'
import StatsProvider from './contexts/StatsContext'
import { ToastContainer } from './components/Toast'
import './components/Icon/icons'
import './style/app.js'

const history = createHashHistory()

class App extends Component {
  render() {
    return (
      <Fragment>
        <ToastContainer stack effect="slide" timeout={8000} offset={20} />
        <StatsProvider>
          <Router history={history}>
            <Routes />
          </Router>
        </StatsProvider>
      </Fragment>
    )
  }
}

export default hot(module)(App)

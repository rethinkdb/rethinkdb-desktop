import React, { Component, createContext } from 'react'
import { Route } from 'react-router'
import { query } from '../service/ipc'

export const LogsContext = createContext()
const LogsContextProvider = LogsContext.Provider

class LogsProviderRoute extends Component {
  state = {
    logs: []
  }

  async componentDidMount () {
    const logs = await query({ name: 'getLogs' })
    this.setState({ logs })
  }

  render () {
    const { logs } = this.state
    const { component: Component, ...rest } = this.props
    return <Route {...rest}>
      <LogsContextProvider value={logs}>
        <Component/>
      </LogsContextProvider>
    </Route>
  }
}

export default LogsProviderRoute

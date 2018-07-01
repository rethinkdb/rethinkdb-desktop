import React, { Component, createContext } from 'react'
import { liveStats } from '../service/ipc'

export const StatsContext = createContext()
const StatsContextProvider = StatsContext.Provider

class StatsProvider extends Component {
  state = {
    stats: {}
  }

  onLiveStats = (statsData) => {
    this.setState({ stats: statsData })
  }

  componentDidMount () {
    liveStats(this.onLiveStats)
  }

  render () {
    const { stats } = this.state
    const { children } = this.props
    return (
      <StatsContextProvider value={stats}>
        {children}
      </StatsContextProvider>
    )
  }
}

export default StatsProvider

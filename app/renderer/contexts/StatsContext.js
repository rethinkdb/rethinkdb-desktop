import React, { Component, createContext } from 'react'
import { liveStats, liveClusterReadWrite } from '../service/ipc'

export const StatsContext = createContext()
const StatsContextProvider = StatsContext.Provider

class StatsProvider extends Component {
  state = {
    stats: {}
  }

  onLiveStats = statsData => {
    this.setState({ stats: statsData })
  }

  onLiveClusterReadWrites = data => {
    this.setState({ cluster: data })
  }

  componentDidMount () {
    liveStats(this.onLiveStats)
    liveClusterReadWrite(this.onLiveClusterReadWrites)
  }

  render () {
    const { stats, cluster } = this.state
    const { children } = this.props
    return <StatsContextProvider value={{ stats, cluster }}>{children}</StatsContextProvider>
  }
}

export default StatsProvider

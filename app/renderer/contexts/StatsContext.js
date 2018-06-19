import React, { Component, createContext } from 'react'
import query from '../service/query'

export const StatsContext = createContext()
const StatsContextProvider = StatsContext.Provider

class StatsProvider extends Component {
  state = {
    stats: {}
  }

  onLiveStats = (statsData) => {
    this.setState({ stats: statsData })
  }

  componentDidMount() {
    query.subscribeToLiveStats(this.onLiveStats)
  }

  render() {
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






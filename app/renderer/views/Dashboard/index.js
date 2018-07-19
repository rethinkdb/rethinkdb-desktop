import React from 'react'
import { StatsContext } from '../../contexts/StatsContext'
import Dashboard from './Dashboard'

export default props => (
  <StatsContext.Consumer>
    {stats => <Dashboard {...props} stats={stats} />}
  </StatsContext.Consumer>
)

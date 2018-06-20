import React from 'react'
import ServersPanel from './Servers'
import TablesPanel from './Tables'
import IndexesPanel from './Indexes'
import ResourcesPanel from './Resources'
import { StyledPanels, StyledPanel } from './panelStyles'

const Panels = props => {
  const { servers, tables, indexes, resources } = props

  return (
    <StyledPanels>
      <StyledPanel>
        <ServersPanel data={servers} />
      </StyledPanel>
      <StyledPanel>
        <TablesPanel data={tables} />
      </StyledPanel>
      <StyledPanel>
        <IndexesPanel data={indexes} />
      </StyledPanel>
      <StyledPanel>
        <ResourcesPanel data={resources} />
      </StyledPanel>
    </StyledPanels>
  )
}

Panels.defaultProps = {
  servers: {
    serversMissing: [],
    unknownMissing: 0,
    serversConnected: 0
  },
  tables: {
    tablesReady: 0,
    tablesNotReady: 0
  },
  indexes: {
    secondaryIndexes: 0,
    secondaryIndexesConstructing: []
  },
  resources: {
    cacheUsed: 0,
    cacheTotal: 0,
    diskUsed: 0
  }
}

export default Panels

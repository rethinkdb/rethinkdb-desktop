import React, { Fragment } from 'react'
import Page from '../../components/Page'
import ServersPanel from './DashboardPanels/Servers'
import TablesPanel from './DashboardPanels/Tables'
import IndexesPanel from './DashboardPanels/Indexes'
import ResourcesPanel from './DashboardPanels/Resources'
import { Panels, Panel } from './styles'

const Dashboard = props => {
  const {
    servers = {
      serversMissing: [],
      unknownMissing: 0,
      serversConnected: 0
    },
    tables = {
      tablesReady: 0,
      tablesNotReady: 0
    },
    indexes = {
      secondaryIndexes: 0,
      secondaryIndexesConstructing: [],
    },
    resources = {
      cacheUsed: 0,
      cacheTotal: 0,
      diskUsed: 0
    }
  } = props.stats
  return (
    <Page>
      <Panels>
        <Panel>
          <ServersPanel data={servers} />
        </Panel>
        <Panel>
          <TablesPanel data={tables} />
        </Panel>
        <Panel>
          <IndexesPanel data={indexes} />
        </Panel>
        <Panel>
          <ResourcesPanel data={resources} />
        </Panel>
      </Panels>
    </Page>
  )
}

export default Dashboard

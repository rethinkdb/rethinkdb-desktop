import React from 'react'
import Page from '../../components/Page'
import LogsPanel from '../../components/LogsPanel'
import Panels from './DashboardPanels/Panels'
import { LogsContext } from '../../contexts/LogsContext'

const Dashboard = props => {
  const { servers, tables, indexes, resources } = props.stats
  return (
    <Page>
      <Panels servers={servers} tables={tables} indexes={indexes} resources={resources} />
      <LogsContext.Consumer>{logs => <LogsPanel records={logs} />}</LogsContext.Consumer>
    </Page>
  )
}

export default Dashboard

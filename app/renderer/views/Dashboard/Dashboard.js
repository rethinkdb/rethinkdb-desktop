import React from 'react'
import Page from '../../components/Page'
import LogsPanel from '../../components/LogsPanel'
import Panels from './DashboardPanels/Panels'
import Chart from './Chart'
import { LogsContext } from '../../contexts/LogsContext'

const Dashboard = props => {
  const { servers, tables, indexes, resources } = props.stats
  const { read_docs_per_sec: reads = 0, written_docs_per_sec: writes = 0 } = props.cluster || {}

  return (
    <Page>
      <Panels servers={servers} tables={tables} indexes={indexes} resources={resources} />
      <Chart reads={reads} writes={writes} />
      <LogsContext.Consumer>{logs => <LogsPanel records={logs} />}</LogsContext.Consumer>
    </Page>
  )
}

export default Dashboard

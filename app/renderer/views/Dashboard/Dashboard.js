import React from 'react'
import Page from '../../components/Page'
import Panels from './DashboardPanels/Panels'

const Dashboard = props => {
  const { servers, tables, indexes, resources } = props.stats
  return (
    <Page>
      <Panels servers={servers} tables={tables} indexes={indexes} resources={resources} />
    </Page>
  )
}

export default Dashboard

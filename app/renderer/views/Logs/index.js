import React from 'react'
import Page from '../../components/Page'
import LogsPanel from '../../components/LogsPanel'
import { LogsContext } from '../../contexts/LogsContext'

const Logs = () => (
  <Page>
    <LogsContext.Consumer>{logs => <LogsPanel records={logs} />}</LogsContext.Consumer>
  </Page>
)

export default Logs

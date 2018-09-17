import React from 'react'
import pluralize from 'pluralize'
import PanelContent from './PanelContent'

const TablesPanel = props => {
  const {
    data: { tablesReady, tablesNotReady }
  } = props

  const hasIssues = tablesNotReady > 0
  const tablesData = [
    { text: `${pluralize('table', tablesReady)} ready`, value: tablesReady },
    { text: `${pluralize('table', tablesNotReady)} with issues`, value: tablesNotReady }
  ]

  return <PanelContent title='Tables' hasIssues={hasIssues} statsData={tablesData} />
}

export default TablesPanel

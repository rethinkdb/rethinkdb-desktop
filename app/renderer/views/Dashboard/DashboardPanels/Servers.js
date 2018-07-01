import React from 'react'
import pluralize from 'pluralize'
import PanelContent from './PanelContent'

const ServersPanel = props => {
  const { data: {serversMissing = [], unknownMissing = 0, serversConnected = 0} } = props
  const numMissing = serversMissing.length
  const missing =
    unknownMissing && (numMissing > 0)
      ? `${numMissing}+`
      : unknownMissing && (numMissing <= 0)
        ? '1+'
        : `${numMissing}`
  const hasIssues = unknownMissing || (numMissing !== 0)

  const serversData = [
    { text: `${pluralize('server', serversConnected)} connected`, value: serversConnected },
    { text: `${pluralize('server', missing)} missing`, value: numMissing }
  ]

  return (
    <PanelContent title='Servers' hasIssues={hasIssues} statsData={serversData} />
  )
}

export default ServersPanel

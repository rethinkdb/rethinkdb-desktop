import React from 'react'
import PanelContent from './PanelContent'
import { formatBytes } from '../../../helpers/format'

const ResourcesPanel = props => {
  const {
    data: { cacheUsed, cacheTotal, diskUsed }
  } = props

  const cachePercent = Math.ceil((cacheUsed / cacheTotal) * 100)
  const diskUsedFormat = formatBytes(diskUsed)

  const resourcesData = [
    { text: 'cache used', value: `${cachePercent}%` },
    { text: 'disk used', value: diskUsedFormat }
  ]

  return (
    <PanelContent title='Resources' hasIssues={false} statsData={resourcesData} />
  )
}

export default ResourcesPanel

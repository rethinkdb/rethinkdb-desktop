import React from 'react'
import pluralize from 'pluralize'
import PanelContent from './PanelContent'

const IndexesPanel = props => {
  const { data: {secondaryIndexes, secondaryIndexesConstructing } } = props

  const indexesData = [
    {text: 'secondary indexes', value: secondaryIndexes},
    {text: 'indexes building', value: secondaryIndexesConstructing.length}
  ]

  return (
    <PanelContent title="Indexes" hasIssues={false} statsData={indexesData} />
  )
}

export default IndexesPanel
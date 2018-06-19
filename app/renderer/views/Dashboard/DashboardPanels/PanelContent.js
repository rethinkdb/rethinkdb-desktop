import React from 'react'
import { StyledPanelContent } from './panelStyles'

const PanelContent = props => {
  const { hasIssues, title, statsData } = props
  return (
    <StyledPanelContent hasIssues={hasIssues}>
      <h3>{title}</h3>
      <ul>
        {statsData.map(item => {
          return (
            <li key={item.text}>
              <span>{item.value} </span>
              {item.text}
            </li>
          )
        })}
      </ul>
    </StyledPanelContent>
  )
}

export default PanelContent

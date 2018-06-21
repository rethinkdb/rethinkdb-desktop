import React from 'react'
import { StyledActionsBar } from './styles.js'

const ActionsBar = ({ title, children }) => {
  return (
    <StyledActionsBar>
      <h3>{title}</h3>
      {children}
    </StyledActionsBar>
  )
}

export default ActionsBar

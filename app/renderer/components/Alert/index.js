import React from 'react'
import { StyledAlert } from './styles.js'

const Alert = ({ type = 'basic', children }) => {
  return (
    <StyledAlert type={type}>
      {children}
    </StyledAlert>
  )
}

export default Alert

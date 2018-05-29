import React from 'react'
import { StyledSideBar, Logo } from './styles.js'
const SideBar = ({ children }) => {
  return (
    <StyledSideBar>
      {children}
      <Logo><span>ReBirth</span></Logo>
    </StyledSideBar>
  )

}

export default SideBar

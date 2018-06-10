import React from 'react'
import RC_Dropdown from 'rc-dropdown'
import './dropdown.css'

const Dropdown = (props) => {
  return <RC_Dropdown {...props}>{props.children}</RC_Dropdown>
}

export default Dropdown

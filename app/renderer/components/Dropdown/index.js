import React from 'react'
import RCDropdown from 'rc-dropdown'
import './dropdown.css'

const Dropdown = props => {
  return <RCDropdown {...props}>{props.children}</RCDropdown>
}

export default Dropdown

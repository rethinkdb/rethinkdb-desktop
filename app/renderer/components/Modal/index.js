import React from 'react'
import RCModal from 'rc-dialog'
import 'rc-dialog/assets/index.css'

const Modal = props => {
  return <RCModal {...props}>{props.children}</RCModal>
}

export default Modal

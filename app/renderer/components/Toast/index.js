import React from 'react'
import Alert from 'react-s-alert'
import './toast.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

const Toast = Alert
export const ToastContainer = props => {
  return <Alert {...props} />
}

export default Toast

import React from 'react'
import './error.less'
import ErrorImg from '../../static/svg/error.svg'

const toTitle = (error, componentStack) => {
  return `${error.toString()}\n\nThis is located at:${componentStack}`
}

const ErrorBoundaryFallbackComponent = ({ componentStack, error }) => (
  <div className="RebirthDB_errorBoundryMessage">
    <img width="96" src={ErrorImg} />
    <h2>Something went wrong...</h2>
    <pre>{toTitle(error, componentStack)}</pre>
  </div>
)

export default ErrorBoundaryFallbackComponent

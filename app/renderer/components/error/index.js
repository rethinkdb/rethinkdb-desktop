import React from 'react'
import ErrorImg from '../../static/svg/error.svg'

import { ErrorBoundryMessage } from './styles'

const toTitle = (error, componentStack) => {
  return `${error.toString()}\n\nThis is located at:${componentStack}`
}

const ErrorBoundaryFallbackComponent = ({ componentStack, error }) => (
  <ErrorBoundryMessage>
    <img width="96" src={ErrorImg} />
    <h2>Something went wrong...</h2>
    <pre>{toTitle(error, componentStack)}</pre>
  </ErrorBoundryMessage>
)

export default ErrorBoundaryFallbackComponent

import React from 'react'
import Icon from '../../components/Icon'

import { ErrorBoundryMessage } from './styles'

const toTitle = (error, componentStack) => {
  return `${error.toString()}\n\nThis is located at:${componentStack}`
}

const ErrorBoundaryFallbackComponent = ({ componentStack, error }) => (
  <ErrorBoundryMessage>
    <Icon type="error" size={96} />
    <h2>Something went wrong...</h2>
    <pre>{toTitle(error, componentStack)}</pre>
  </ErrorBoundryMessage>
)

export default ErrorBoundaryFallbackComponent

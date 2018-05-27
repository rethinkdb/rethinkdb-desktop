import React from 'react'
import ErrorBoundary from 'react-error-boundary'
import Error from '../components/error'
import { Switch, Route } from 'react-router'
import Home from '../views/Home'
import Index from '../views/Connection/NewConnection'

export default () => (
  <ErrorBoundary FallbackComponent={Error}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/newConnection" component={Index} />
    </Switch>
  </ErrorBoundary>
)

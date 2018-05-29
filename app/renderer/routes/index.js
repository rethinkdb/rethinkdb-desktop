import React from 'react'
import ErrorBoundary from 'react-error-boundary'
import Error from '../components/error'
import { Switch, Route } from 'react-router'
import Home from '../views/Home'
import NewConnection from '../views/Connection/NewConnection'
import Dashboard from '../views/Dashboard'
import Tables from '../views/Tables'
import Explorer from '../views/Explorer'
import Logs from '../views/Logs'

export default () => (
  <ErrorBoundary FallbackComponent={Error}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/newConnection" component={NewConnection} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/tables" component={Tables} />
      <Route exact path="/explorer" component={Explorer} />
      <Route exact path="/logs" component={Logs} />
    </Switch>
  </ErrorBoundary>
)

import React from 'react'
import ErrorBoundary from 'react-error-boundary'
import Error from '../components/error'
import { Switch, Route } from 'react-router'
import Home from '../views/home'
import NewConnection from '../views/connection/NewConnection'
export default () => (
	<ErrorBoundary FallbackComponent={Error}>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/newConnection" component={NewConnection} />
		</Switch>
	</ErrorBoundary>
)


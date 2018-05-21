import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { Router } from 'react-router'
import Routes from './routes'
import createHashHistory from 'history/createHashHistory'
const history = createHashHistory()

import './style/app.less'

class App extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {}

	render() {
		return (
			<Router history={history}>
				<Routes />
			</Router>
		)
	}
}

export default hot(module)(App)

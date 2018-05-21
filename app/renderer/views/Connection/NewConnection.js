const { dialog } = require('electron').remote

import React, { PureComponent } from 'react'
import {connect} from '../../service/ipc'
import './NewConnection.less'
import CloudIcon from '../../static/svg/cloud.svg'


class NewConnection extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			local: ''
		}
	}

	onOpen = () => {}
    onInputChange = event => {
		this.setState({ local: event.target.value })
	}
	render() {
		return (
			<div className="RebirthDB_NewConnection">
				<div className="RebirthDB_NewConnection-row RebirthDB_remoteConnection">
					<div className="top">
						<img className="icon" src={CloudIcon} width={32} />
						<h2 className="title">Remote Connection</h2>
					</div>
					<div className="bottom">
						<input type="text" placeholder="https://localhost:28015" onChange={this.onInputChange} />
						<button onClick={() => {}}>Connect</button>
					</div>
				</div>
			</div>
		)
	}
}
NewConnection.propTypes = {}

export default NewConnection

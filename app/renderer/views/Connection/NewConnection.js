import React, { PureComponent } from 'react'
import { connect } from '../../service/ipc'
import Icon from '../../components/Icon'

import { StyledNewConnection } from './NewConnection.styles.js'

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
  onButtonClick = event => {
    connect(this.state.local)
  }
  render() {
    return (
      <StyledNewConnection>
        <div className="row RebirthDB_remoteConnection">
          <div className="top">
            <Icon type="cloud" size={32} />
            <h2 className="title">Remote Connection</h2>
          </div>
          <div className="bottom">
            <input
              type="text"
              placeholder="https://localhost:28015"
              onChange={this.onInputChange}
            />
            <button onClick={this.onButtonClick}>Connect</button>
          </div>
        </div>
      </StyledNewConnection>
    )
  }
}
NewConnection.propTypes = {}

export default NewConnection

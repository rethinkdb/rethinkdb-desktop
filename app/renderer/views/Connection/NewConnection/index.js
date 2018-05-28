import React, { PureComponent } from 'react'

import { connect } from '../../../service/ipc'
import { isValidUrl } from '../../../helpers/validator'
import { StyledNewConnection, ConnectionInfo, ConnectionError, Connecting } from './styles'
import AppHeader from '../../../components/AppHeader'
import SideBar from '../../../components/SideBar'
import MainContent from '../../../components/MainContent'
import {
  CONNECTION_DEFAULT_NAME,
  CONNECTION_DEFAULT_HOST,
  CONNECTION_DEFAULT_PORT
} from '../../../helpers/constants'

class NewConnection extends PureComponent {
  constructor(props) {
    super(props)
    this.defaultName = CONNECTION_DEFAULT_NAME
    this.defaultAddress = `${CONNECTION_DEFAULT_HOST}:${CONNECTION_DEFAULT_PORT}`
    this.state = {
      name: this.defaultName,
      address: this.defaultAddress,
      connecting: false,
      error: undefined
    }
  }

  onCreate = async () => {
    let { name, address } = this.state
    if (!name.trim().length) {
      name = this.defaultName
    }
    if (!address.trim().length) {
      address = this.defaultAddress
    }
    if (!isValidUrl(address)) {
      this.setState({ error: `seems like "${address}" is not a valid URL` })
    } else {
      this.setState({ error: undefined, connecting: true })
      const connection = await connect({ name, address })
      if (connection.error) {
        this.setState({ error: connection.error })
      } else {
        this.setState({ connecting: false })
        // show success message
        // update connection list
        // redirect to Dashboard
      }
    }
  }

  onNameChange = event => {
    this.setState({ name: event.target.value })
  }

  onAddressChange = event => {
    this.setState({ address: event.target.value })
  }

  render() {
    const { error, connecting } = this.state
    return (
      <div>
        <AppHeader />
        <SideBar />
        <MainContent>
          {error && <ConnectionError>{error}</ConnectionError>}
          {connecting && <Connecting>Connecting...</Connecting>}
          <StyledNewConnection>
            <div className="row">
              <input
                type="text"
                placeholder={this.defaultName}
                onChange={this.onNameChange}
                maxLength={20}
              />
            </div>
            <div className="row">
              <input
                type="text"
                placeholder={this.defaultAddress}
                onChange={this.onAddressChange}
              />
            </div>
            <div className="row actions">
              <button onClick={this.onCreate}>Connect</button>
            </div>
          </StyledNewConnection>

          <ConnectionInfo>
            By default RebirthDB will connect to <span>{this.defaultAddress}</span> with connection
            name <span>{this.defaultName}</span>
          </ConnectionInfo>
        </MainContent>
      </div>
    )
  }
}
NewConnection.propTypes = {}

export default NewConnection

import React, { PureComponent, Fragment } from 'react'
import { withRouter } from 'react-router'
import connection from '../../../service/connection'
import AppHeader from '../../../components/AppHeader'
import SideBar from '../../../components/SideBar'
import ConnectionList from '../Connections/ConnectionList'
import NewConnectionForm from './NewConnectionForm'

import {
  CONNECTION_DEFAULT_NAME,
  CONNECTION_DEFAULT_HOST,
  CONNECTION_DEFAULT_PASSWORD,
  CONNECTION_DEFAULT_PORT,
  CONNECTION_DEFAULT_USERNAME
} from '../../../helpers/constants'

import { MainContent, ConnectionInfo, ConnectionError, Connecting, Logo } from './styles'
import logoImg from '../../../static/png/rebirth_logo.png'

class NewConnection extends PureComponent {
  constructor (props) {
    super(props)
    this.defaultName = CONNECTION_DEFAULT_NAME
    this.defaultAddress = `${CONNECTION_DEFAULT_HOST}:${CONNECTION_DEFAULT_PORT}`
    this.defaultUsername = CONNECTION_DEFAULT_USERNAME
    this.defaultPassword = CONNECTION_DEFAULT_PASSWORD
    this.state = {
      error: undefined,
      connecting: false
    }
  }

  makeConnectionRequest = async ({ name, address, username, password }) => {
    this.setState({ error: undefined, connecting: true })
    const result = await connection.create({ name, address, username, password })
    if (result.error) {
      this.setState({ error: result.error.code, connecting: false })
    } else {
      const { history } = this.props
      this.setState({ connecting: false })
      // this.props.onConnected(connection)
      history.push('/dashboard')
    }
  }
  onCreate = (name, address, username, password) => {
    if (!name.trim().length) {
      name = this.defaultName
    }
    if (!address.trim().length) {
      address = this.defaultAddress
    }
    if (!username.trim().length) {
      username = this.defaultUsername
    }
    if (!password.trim().length) {
      password = this.defaultPassword
    }
    return this.makeConnectionRequest({ name, address, username, password })
  }

  onQuickConnect = ({ address }) => this.makeConnectionRequest({ address })

  render () {
    const { error, connecting } = this.state
    return (
      <Fragment>
        <AppHeader />
        <SideBar>
          <ConnectionList onItemClick={this.onQuickConnect} />
        </SideBar>
        <MainContent>
          {error && <ConnectionError>{error}</ConnectionError>}
          {connecting && <Connecting>Connecting...</Connecting>}
          <Logo src={logoImg} />
          <NewConnectionForm
            defaultName={this.defaultName}
            defaultAddress={this.defaultAddress}
            defaultUsername={this.defaultUsername}
            defaultPassword={this.defaultPassword}
            onCreate={this.onCreate}
          />
          <ConnectionInfo>
            By default RethinkDB will connect to <span>{this.defaultAddress}</span> with connection
            name <span>{this.defaultName}</span>
          </ConnectionInfo>
        </MainContent>
      </Fragment>
    )
  }
}
NewConnection.propTypes = {}

export default withRouter(NewConnection)

import React, { PureComponent, Fragment } from 'react'
import { withRouter } from 'react-router'
import connection from '../../../service/connection'
import { ConnectionInfo, ConnectionError, Connecting } from './styles'
import AppHeader from '../../../components/AppHeader'
import SideBar from '../../../components/SideBar'
import MainContent from '../../../components/MainContent'
import ConnectionList from '../Connections/ConnectionList'
import NewConnectionForm from './NewConnectionForm'

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
      connections: []
    }
  }

  makeConnectionRequest = async ({ name, address }) => {
    this.setState({ error: undefined, connecting: true })
    const result = await connection.create({ name, address })
    if (result.error) {
      this.setState({ error: result.error, connecting: false })
    } else {
      const { history } = this.props
      this.setState({ connecting: false })
      this.fetchConnections()
      this.props.onConnected(connection)
      history.push('/dashboard')
    }
  }
  onCreate = (name, address) => {
    if (!name.trim().length) {
      name = this.defaultName
    }
    if (!address.trim().length) {
      address = this.defaultAddress
    }
    return this.makeConnectionRequest({ name, address })
  }

  onQuickConnect = ({ address }) => this.makeConnectionRequest({ address })

  fetchConnections = () => {
    const connectionList = connection.getConnections()
    this.setState({ connections: connectionList })
  }

  componentDidMount() {
    this.fetchConnections()
  }

  render() {
    const { error, connecting, connections } = this.state
    return (
      <Fragment>
        <AppHeader />
        <SideBar>
          <ConnectionList data={connections} onItemClick={this.onQuickConnect} />
        </SideBar>
        <MainContent>
          {error && <ConnectionError>{error}</ConnectionError>}
          {connecting && <Connecting>Connecting...</Connecting>}
          <NewConnectionForm
            defaultName={this.defaultName}
            defaultAddress={this.defaultAddress}
            onCreate={this.onCreate}
          />
          <ConnectionInfo>
            By default RebirthDB will connect to <span>{this.defaultAddress}</span> with connection
            name <span>{this.defaultName}</span>
          </ConnectionInfo>
        </MainContent>
      </Fragment>
    )
  }
}
NewConnection.propTypes = {}

export default withRouter(NewConnection)

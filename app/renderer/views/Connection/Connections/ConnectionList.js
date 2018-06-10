import React, { PureComponent } from 'react'
import ConnectionListHeader from './ConnectionListHeader'
import ConnectionItem from './ConnectionItem'
import { StyledConnectionList } from './styles'
import connection from '../../../service/connection'

class ConnectionList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      connections: []
    }
  }

  fetchConnections = () => {
    const connectionList = connection.getConnections()
    this.setState({ connections: connectionList })
  }

  onEditConnection = (id) => {
    window.location.hash = `#/editConnection/${id}`
  }

  onDeleteConnection = (id) => {
    connection.deleteConnection(id)
    this.fetchConnections()
  }

  componentDidMount() {
    this.fetchConnections()
  }

  render() {
    const { onItemClick } = this.props
    const { connections } = this.state
    return (
      <StyledConnectionList>
        <ConnectionListHeader />
        <ul>
          {connections.map(c => (
            <ConnectionItem
              key={c.id}
              item={c}
              onItemClick={onItemClick}
              onEdit={this.onEditConnection}
              onDelete={this.onDeleteConnection}
            />
          ))}
        </ul>
      </StyledConnectionList>
    )
  }
}

export default ConnectionList

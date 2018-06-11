import { connect } from './ipc'
import {
  saveConnection,
  getConnectionList,
  removeConnection,
  getConnection,
  updateConnection
} from '../helpers/connectionStore'

const connection = {
  async create({ name, address }) {
    try {
      const result = await connect({ name, address })
      if (result.socket.isOpen) {
        // if we got name in args - it's a new connection, we need to save it
        if (name) saveConnection({ name, address })
        return { status: 'OK' }
      } else {
        return { error: 'could not establish connection' }
      }
    } catch (e) {
      return { error: e.message }
    }
  },
  update(id, values) {
    updateConnection(id, values)
  },
  deleteConnection(id) {
    removeConnection(id)
  },
  getConnectionById(id) {
    return getConnection(id)
  },
  getConnections() {
    return getConnectionList()
  }
}

export default connection

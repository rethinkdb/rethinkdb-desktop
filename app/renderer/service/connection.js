import { connect } from './ipc'
import { saveConnection, getConnectionList } from '../helpers/connectionStore'

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
  getConnections() {
    return getConnectionList()
  }
}

export default connection

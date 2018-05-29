import { connect } from './ipc'
import { saveConnection, getConnectionList } from '../helpers/connectionStore'

const connection = {
  async create({ name, address }) {
    try {
      const result = await connect({ name, address })
      if (result.open) {
        saveConnection({ name, address })
        return { status: 'success' }
      }
    } catch (e) {
      return { error: e.message }
    }
  },
  getConnections () {
    return getConnectionList()
  }
}

export default connection

import { liveStats } from './ipc'

const query = {
  subscribeToLiveStats(callback) {
    liveStats(callback)
  }
}

export default query

import { liveStats } from './ipc'

const query = {
  subscribeToLiveStats(statsListener) {
    liveStats(statsListener)
  }
}

export default query

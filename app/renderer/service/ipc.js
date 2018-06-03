const ipc = require('electron-better-ipc')

export const connect = ({ name, address }) => {
  return ipc.callMain('connect', { name, address })
}

export const getStats = () => {
  return ipc.callMain('stats')
}

const ipc = require('electron-better-ipc')

export const connect = ({ name, address }) => {
  return ipc.callMain('connect', { name, address })
}

export const getServers = () => {
  return ipc.callMain('servers')
}

export const getTables = () => {
  return ipc.callMain('tables')
}

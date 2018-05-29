import stringHash from '../helpers/stringHash'
import storage from '../helpers/storage'
import {
  CONNECTION_DEFAULT_NAME,
  CONNECTION_DEFAULT_HOST,
  CONNECTION_DEFAULT_PORT
} from './constants'

const getHash = str => stringHash(str)
export const removeConnection = uid => storage.delete(uid)
export const getConnectionList = () => storage.store
export const clear = () => storage.clear()

export const addConnection = ({
  name = CONNECTION_DEFAULT_NAME,
  host = CONNECTION_DEFAULT_HOST,
  port = CONNECTION_DEFAULT_PORT
}) => {
  const uid = getHash(name + host + port)
  if (!storage.has(uid)) {
    storage.set(uid, { name, host, port })
    return uid
  }
}

export const updateConnection = (uid, { name, host, port }) => {
  const obj = { name, host, port }
  const current = getConnection(uid)
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
  const updated = Object.assign({}, current, obj)
  storage.set(uid, updated)
  return updated
}

export const getConnection = uid => {
  const connection = storage.get(uid)
  return connection || {}
}

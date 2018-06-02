import stringHash from '../helpers/stringHash'
import storage from '../helpers/storage'
import {
  CONNECTION_DEFAULT_NAME,
  CONNECTION_DEFAULT_HOST,
  CONNECTION_DEFAULT_PORT
} from './constants'

const getHash = str => stringHash(str)
export const removeConnection = uid => storage.delete(uid)
export const clear = () => storage.clear()

export const saveConnection = ({
  name = CONNECTION_DEFAULT_NAME,
  address = `${CONNECTION_DEFAULT_HOST}:${CONNECTION_DEFAULT_PORT}`
}) => {
  const uid = getHash(name + address)
  if (!storage.has(uid)) {
    storage.set(uid, { name, address })
    return uid
  }
}

export const updateConnection = (uid, { name, address }) => {
  const obj = { name, address }
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

export const getConnectionList = () => {
  // transform from key:value to collection
  const items = storage.store
  const keys = Object.keys(items)
  if (keys.length) {
    return keys.map(key => ({ id: key, ...items[key] }))
  } else {
    return []
  }
}

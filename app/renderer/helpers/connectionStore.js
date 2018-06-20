import shortid from 'shortid'
import stringHash from '../helpers/stringHash'
import storage from '../helpers/storage'
import {
  CONNECTION_DEFAULT_NAME,
  CONNECTION_DEFAULT_HOST,
  CONNECTION_DEFAULT_PORT,
  CONNECTION_DEFAULT_USERNAME,
  CONNECTION_DEFAULT_PASSWORD
} from './constants'

const getHash = str => stringHash(str)

const isExist = connectionId => {
  const list = getConnectionList()
  const result = list.find(el => el.connectionId === connectionId)
  return !!result
}
export const removeConnection = uid => storage.delete(uid)
export const clear = () => storage.clear()

export const saveConnection = ({
  name = CONNECTION_DEFAULT_NAME,
  address = `${CONNECTION_DEFAULT_HOST}:${CONNECTION_DEFAULT_PORT}`,
  username = CONNECTION_DEFAULT_USERNAME,
  password = CONNECTION_DEFAULT_PASSWORD
}) => {
  const connectionId = getHash(name + address)
  if (!isExist(connectionId)) {
    const uid = shortid.generate()
    storage.set(uid, { connectionId, name, address, username, password })
    return uid
  }
}

export const updateConnection = (uid, values) => {
  const newConnectionId = getHash(values.name + values.address)
  const current = getConnection(uid)
  Object.keys(values).forEach(key => values[key] === undefined && delete values[key])

  const updated = Object.assign({}, current, values, { connectionId: newConnectionId })
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

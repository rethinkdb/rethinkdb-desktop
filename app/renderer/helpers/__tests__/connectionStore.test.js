import {
  CONNECTION_DEFAULT_HOST,
  CONNECTION_DEFAULT_NAME,
  CONNECTION_DEFAULT_PORT
} from '../constants'

import {
  getConnection,
  addConnection,
  getConnectionList,
  removeConnection,
  updateConnection,
  clear
} from '../connectionStore'



function cleanTest() {
  clear()
}

beforeEach(() => {
  cleanTest()
})

test('use defaults ---> default name', () => {
  let uid = addConnection({ host: 'foo' })
  const result = getConnection(uid)
  expect(result.name).toBe(CONNECTION_DEFAULT_NAME)
})

test('use defaults ---> default host', () => {
  let uid = addConnection({ name: 'foo' })
  const result = getConnection(uid)
  expect(result.host).toBe(CONNECTION_DEFAULT_HOST)
})

test('use defaults ---> default port', () => {
  let uid = addConnection({ name: 'foo' })
  const result = getConnection(uid)
  expect(result.port).toBe(CONNECTION_DEFAULT_PORT)
})

test('remove connection', () => {
  let uid = addConnection({ host: 'test' })
  const result = getConnection(uid)
  expect(result.name).toBe(CONNECTION_DEFAULT_NAME)
  removeConnection(uid)
  const deleteResult = getConnection(uid)
  expect(deleteResult).toEqual({})
})

test('prevents duplicate entries', () => {
  addConnection({ name: 'test', host: 'test', port: 8888 })
  addConnection({ name: 'test', host: 'test', port: 8888 })
  expect(Object.keys(getConnectionList()).length).toBe(1)
})

test('adding multiple', () => {
  addConnection({ name: 'test', host: 'test', port: 1 })
  addConnection({ name: 'test', host: 'test', port: 2 })
  expect(Object.keys(getConnectionList()).length).toBe(2)
})

test('able to update connection', () => {
  let uid = addConnection({ name: 'test1', host: 'test', port: 1 })
  updateConnection(uid, { name: 'test2' })
  const result = getConnection(uid)
  expect(result.name).toBe('test2')
})

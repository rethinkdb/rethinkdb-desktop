/* eslint-env jest */

import {
  CONNECTION_DEFAULT_HOST,
  CONNECTION_DEFAULT_NAME,
  CONNECTION_DEFAULT_PORT
} from '../constants'

import {
  getConnection,
  saveConnection,
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
  let uid = saveConnection({ host: 'foo' })
  const result = getConnection(uid)
  expect(result.name).toBe(CONNECTION_DEFAULT_NAME)
})

test('use defaults ---> default address', () => {
  let uid = saveConnection({ name: 'foo' })
  const result = getConnection(uid)
  expect(result.address).toBe(`${CONNECTION_DEFAULT_HOST}:${CONNECTION_DEFAULT_PORT}`)
})

test('remove connection', () => {
  let uid = saveConnection({ address: 'test:123' })
  const result = getConnection(uid)
  expect(result.name).toBe(CONNECTION_DEFAULT_NAME)
  removeConnection(uid)
  const deleteResult = getConnection(uid)
  expect(deleteResult).toEqual({})
})

test('prevents duplicate entries', () => {
  saveConnection({ name: 'test', address: 'test:8888' })
  saveConnection({ name: 'test', address: 'test:8888' })
  expect(getConnectionList().length).toBe(1)
})

test('saving multiple', () => {
  saveConnection({ name: 'test', address: 'test:8888' })
  saveConnection({ name: 'test', address: 'test:8889' })
  expect(getConnectionList().length).toBe(2)
})

test('able to update connection', () => {
  let uid = saveConnection({ name: 'test1', address: 'test:8888' })
  updateConnection(uid, { name: 'test2' })
  const result = getConnection(uid)
  expect(result.name).toBe('test2')
})

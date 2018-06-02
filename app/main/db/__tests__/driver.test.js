import driver from '../driver'
import { r as mockedR } from 'rebirthdbts'

const conn = { pool: false, servers: [{ host: 'test', port: 3000 }] }
const conn2 = { pool: false, servers: [{ host: 'test2', port: 3000 }] }
const disconnect = driver.disconnect

beforeEach(() => {
  // need to figure out why driver.disconnect.mockClear not working
  driver.disconnect = disconnect
})

test('driver - does not disconnect if no active connection', async () => {
  driver.disconnect = jest.fn()
  await driver.connect(conn)
  expect(driver.disconnect).not.toBeCalled()
})

test('driver - disconnect if has active connection', async () => {
  driver.disconnect = jest.fn()
  await driver.connect(conn)
  await driver.connect(conn2)
  expect(driver.disconnect).toBeCalled()
})

test('driver - disconnect', async () => {
  const connection = await driver.connect(conn)
  await driver.disconnect()
  expect(connection.close).toBeCalled()
})

test('driver - return connection', async () => {
  await driver.connect(conn)
  const c = driver.getConnection()
  expect(c).toBeDefined()
})

test('driver - connect can handle exceptions', async () => {
  const error = 'Oy Vi'
  mockedR.connect.mockImplementationOnce(() => Promise.reject(error))
  const result = await driver.connect(conn)
  expect(result.error).toBe(error)
})

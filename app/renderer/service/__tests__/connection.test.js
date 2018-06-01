import connection from '../connection'
import { connect } from '../ipc'
import { saveConnection as mockedSaveConnection } from '../../helpers/connectionStore'

jest.mock('../ipc')
jest.mock('../../helpers/connectionStore')

const conn = { name: 'test', address: 'foo:3000' }
const conn2 = { address: 'foo:3000' }
const error = { error: 'oi vy' }

test('create - unsuccessful connection return error object', async () => {
  connect.mockImplementationOnce(() => Promise.reject(new Error('oi vy')))
  const result = await connection.create(conn)
  expect(result).toEqual(error)
})

test('create - verified successful connection return status', async () => {
  connect.mockImplementationOnce(() => Promise.resolve({ socket: { isOpen: true } }))
  const result = await connection.create(conn)
  expect(result).toEqual({ status: 'OK' })
})

test('create - verified successful connection trigger save', async () => {
  connect.mockImplementationOnce(() => Promise.resolve({ socket: { isOpen: true } }))
  await connection.create(conn)
  const m = mockedSaveConnection
  expect(m).toHaveBeenCalledTimes(1)
  expect(m).toHaveBeenCalledWith(conn)
})

test('create - does not trigger save if there is no name argument', async () => {
  connect.mockImplementationOnce(() => Promise.resolve({ socket: { isOpen: true } }))
  await connection.create(conn2)
  const m = mockedSaveConnection
  expect(m).not.toBeCalled()
})

test('create - un-verified successful connection return error', async () => {
  connect.mockImplementationOnce(() => Promise.resolve({ socket: { isOpen: false } }))
  const result = await connection.create(conn)
  expect(result).toEqual({ error: 'could not establish connection' })
})

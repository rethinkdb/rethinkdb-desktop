// ToDo: convert this to real tests
import {
  getConnection,
  addConnection,
  getConnectionList,
  removeConnection,
  updateConnection,
  clear
} from '../connectionStore'

let uid = null

function clean() {
  clear()
  uid = null
}
export default function testing() {
  clean()
  // use defaults
  uid = addConnection({name: 'foo'})
  console.log('use defaults: ', getConnectionList())
  clean()
  // remove
  uid = addConnection({ name: 'test', host: 'test', port: 8888 })
  removeConnection(uid)
  console.log('remove: ', getConnectionList())
  clean()
  // adding one
  uid = addConnection({ name: 'test', host: 'test', port: 8888 })
  console.log('adding one: ', getConnectionList())
  clean()
  // no duplicates
  uid = addConnection({ name: 'test', host: 'test', port: 8888 })
  let uid2 = addConnection({ name: 'test', host: 'test', port: 8888 })
  console.log('not adding dupes: ', getConnectionList())
  console.log('uid2: ', uid2)
  clean()
  // adding multiple
  uid = addConnection({ name: 'test1', host: 'test', port: 1 })
  let uid3 = addConnection({ name: 'test1', host: 'test2', port: 1 })
  let uid4 = addConnection({ name: 'test1', host: 'test2', port: 2 })
  console.log('adding multiple: ', getConnectionList())
  clean()
  // updates
  uid = addConnection({ name: 'test1', host: 'test', port: 1 })
  let u = updateConnection(uid, { name: 'test2' })
  console.log('updates: ', getConnectionList())
  console.log('updates return: ', u)
  clean()
  // get single
  uid = addConnection({ name: 'test1', host: 'test', port: 1 })
  let single = getConnection(uid)
  console.log('get single: ', single)
  clean()
}

const runnable = {
  run: Promise.resolve({})
}
const query = Object.assign(
  jest.fn(),
  {
    merge: jest.fn(() => query),
    filter: jest.fn(() => query),
    map: jest.fn(() => query),
    reduce: jest.fn(() => query),
    slice: jest.fn(() => query),
    limit: jest.fn(() => query),
    pluck: jest.fn(() => query),
    sum: jest.fn(() => query),
    count: jest.fn(() => query),
    coerceTo: jest.fn(() => query),
    each: jest.fn(() => query),
    eq: jest.fn(() => query),
    ne: jest.fn(() => query),
    gt: jest.fn(() => query),
    lt: jest.fn(() => query),
    and: jest.fn(() => query),
    or: jest.fn(() => query),
    changes: jest.fn(() => query),
    replace: jest.fn(() => query),
    without: jest.fn(() => query),
    withFields: jest.fn(() => query)
  },
  runnable
)

const connection = {
  close: jest.fn(() => Promise.resolve({})),
  reconnect: jest.fn(() =>Promise.resolve({}))
}

const table = Object.assign(
  jest.fn(),
  {
    insert: jest.fn(() => query),
    get: jest.fn(() => query),
    getAll: jest.fn(() => query)
  },
  query,
  runnable
)

const db = {
  table,
  tableCreate: jest.fn(() => query),
  tableDrop: jest.fn(() => query),
  tableList: jest.fn(() => query),
  do: jest.fn(() => query)
}

const r = Object.assign(
  {
    connection,
    connect: jest.fn(() => Promise.resolve(connection)),
    expr: jest.fn(() => query),
    row: jest.fn(() => query),
    mock: {
      run: query.run,
      connection: connection
    }
  },
  db
)

r.db = jest.fn(() => db)

module.exports = { r }

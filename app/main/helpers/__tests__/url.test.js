import url from '../url'

test('extract - with protocol - http', () => {
  const http = 'http://localhost:1111'
  const actual = url.extract(http)
  expect(actual.host).toBe('http://localhost')
  expect(actual.port).toBe('1111')
})

test('extract - with protocol - https', () => {
  const https = 'https://localhost:2222'
  const actual = url.extract(https)
  expect(actual.host).toBe('https://localhost')
  expect(actual.port).toBe('2222')
})

test('extract - without protocol', () => {
  const addr = 'localhost:3333'
  const actual = url.extract(addr)
  expect(actual.host).toBe('localhost')
  expect(actual.port).toBe('3333')
})

test('extract - without protocol - ip', () => {
  const addr = '34.193.202.51:4444'
  const actual = url.extract(addr)
  expect(actual.host).toBe('34.193.202.51')
  expect(actual.port).toBe('4444')
})

test('extract - without protocol - domain', () => {
  const addr = 'foo.bar.baz.maz:5555'
  const actual = url.extract(addr)
  expect(actual.host).toBe('foo.bar.baz.maz')
  expect(actual.port).toBe('5555')
})
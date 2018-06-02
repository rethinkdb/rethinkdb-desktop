import React from 'react'
import ConnectionItem from '../ConnectionItem'
import renderer from 'react-test-renderer'

jest.mock('../styles', () => {
  return {
    StyledConnectionItem: ''
  }
})

test('ConnectionList render items', () => {
  const connection = { id: 1, name: 'test' }
  const component = renderer.create(<ConnectionItem item={connection} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

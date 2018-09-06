import React from 'react'
import ConnectionItem from '../ConnectionItem'
import renderer from 'react-test-renderer'

jest.mock('../styles', () => {
  return {
    StyledConnectionName: '',
    StyledConnectionItem: ''
  }
})

jest.mock('../ConnectionItemActions', () => () => (
  <div id='ConnectionItemActions'>ConnectionItemActions</div>
))

test.only('ConnectionList render items', () => {
  const connection = { id: 'H53er6x', name: 'test', connectionId: '123' }
  const component = renderer.create(<ConnectionItem item={connection} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

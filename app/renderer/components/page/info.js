import React from 'react'
import styled from 'react-emotion'
import theme from '@/style/common'
import {ServersConsumer} from '../../contexts/servers'

const List = styled.ul`
  background: ${theme.infoBarsColor};
  width: 100%;
  display: flex;
  padding: 1rem 10%;
  list-style: none;
  color: black;
`

const Item = styled.li`
  flex: 1;
  width: 100%;
  text-align: center;
`

const Info = () => (
  <ServersConsumer>
    {servers => {
      return <List>
        <Item>Connected to {servers[0] ? JSON.stringify(servers[0].server) : ''}</Item>
        <Item>Issued</Item>
        <Item>{servers.length} {servers.length > 1 ? 'Servers' : 'Server'}</Item>
        <Item>Tables</Item>
      </List>
    }}
  </ServersConsumer>
)

export default Info

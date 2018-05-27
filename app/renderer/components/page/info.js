import React from 'react'
import styled from 'react-emotion'
import theme from '@/style/common'

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

const Info = () =>
  <List>
    <Item>Connected to</Item>
    <Item>Issued</Item>
    <Item>Servers</Item>
    <Item>Tables</Item>
  </List>

export default Info

import React from 'react'
import styled from 'react-emotion'
import Icon from '../../components/Icon'
import theme from '@/style/common'

const List = styled.ul`
  background: ${theme.infoBarsColor};
  width: 100%;
  display: flex;
  padding: 1rem 10%;
  list-style: none;
  color: black;
  border-bottom: thin solid ${theme.mainBorderColor};
`

const Item = styled.li`
  flex: 1;
  width: 100%;
  text-align: center;
`
const Header = styled.div`
  display: inline-block;
  padding: 0.5rem;
  margin-right: 1rem;
`

const Body = styled.div`
  display: inline-block;
  vertical-align: top;
  text-align: left;
  padding-top: 0.25rem;
`

const Title = styled.div`
  color: #909090;
`

const Value = styled.div`
  color: #4d535c;
  font-size: 1rem;
  font-weight: bold;
`

const Info = () => (
  <List>
    <Item>
      <Header>
        <Icon type="connections" size={30} color={theme.mainColorLight} />
      </Header>
      <Body>
        <Title>Connected to</Title>
        {/* <ServersConsumer> */}
        {/* {servers => <JJ>{servers[0] ? JSON.stringify(servers[0].server) : ''}</JJ>} */}
        {/* </ServersConsumer> */}
      </Body>
    </Item>
    <Item>
      <Header>
        <Icon type="danger" size={30} color={theme.mainColorLight} />
      </Header>
      <Body>
        <Title>Issues</Title>
        <Value>No Issues</Value>
      </Body>
    </Item>
    <Item>
      <Header>
        <Icon type="servers" size={30} color={theme.mainColorLight} />
      </Header>
      <Body>
        <Title>Servers</Title>
        {/* <ServersConsumer>{servers => <JJ>{servers.length} Connected</JJ>}</ServersConsumer> */}
      </Body>
    </Item>
    <Item>
      <Header>
        <Icon type="table" size={30} color={theme.mainColorLight} />
      </Header>
      <Body>
        <Title>Tables</Title>
        {/* <TablesConsumer> */}
        {/* {tables => ( */}
        {/* <Value> */}
        {/* {tables.length}/{tables.length} ready */}
        {/* </Value> */}
        {/* )} */}
        {/* </TablesConsumer> */}
      </Body>
    </Item>
  </List>
)

export default Info

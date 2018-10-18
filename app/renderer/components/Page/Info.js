import React from 'react'
import styled from 'react-emotion'
import Icon from '../../components/Icon'
import theme from '@/style/common'
import { StatsContext } from '../../contexts/StatsContext'

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
  <StatsContext.Consumer>
    {({ stats }) => {
      const { servers, tables, issues = [] } = stats || {}
      const { server: { name = '' } = {}, serversConnected = 0 } = servers || {}
      const { tablesReady = 0, tablesNotReady = 0 } = tables || {}
      return (
        <List>
          <Item>
            <Header>
              <Icon type='connections' size={30} color={theme.mainColorLight} />
            </Header>
            <Body>
              <Title>Connected to</Title>
              <Value>{name}</Value>
            </Body>
          </Item>
          <Item>
            <Header>
              <Icon type='danger' size={30} color={theme.mainColorLight} />
            </Header>
            <Body>
              <Title>Issues</Title>
              <Value>{issues.length || 'No'} Issues</Value>
            </Body>
          </Item>
          <Item>
            <Header>
              <Icon type='servers' size={30} color={theme.mainColorLight} />
            </Header>
            <Body>
              <Title>Servers</Title>
              <Value>{serversConnected} connected</Value>
            </Body>
          </Item>
          <Item>
            <Header>
              <Icon type='table' size={30} color={theme.mainColorLight} />
            </Header>
            <Body>
              <Title>Tables</Title>
              <Value>
                {tablesReady}/{tablesNotReady + tablesReady} ready
              </Value>
            </Body>
          </Item>
        </List>
      )
    }}
  </StatsContext.Consumer>
)

export default Info

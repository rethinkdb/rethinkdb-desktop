import React from 'react'
import styled from 'react-emotion'
import theme from '@/style/common'
import {ServersConsumer} from '../../contexts/servers'
import {TablesConsumer} from '../../contexts/tables'
import _Icon from '../Icon'

const List = styled.ul`
  background: ${theme.infoBarsColor};
  width: 100%;
  display: flex;
  padding: 1rem 10%;
  list-style: none;
  color: black;
  box-shadow: 0 1px 0 rgba(255,255,255,.4), inset 0 -1px 1px #c3c3c3;
  border-bottom: thin solid #d0d0d0;
`

const Item = styled.li`
  flex: 1;
  width: 100%;
  text-align: center;
`

const Icon = styled(_Icon)`
  svg {
    fill: white;
  }
`

const DD = styled.div`
  background: #3873ea;
  display: inline-block;
  padding: 0.5rem;
  margin-right: 1rem;
`

const FF = styled.div`
  display: inline-block;
  vertical-align: top;
  text-align: left;
  padding-top: 0.25rem;
`

const KK = styled.div`
  color: #909090;
`

const JJ = styled.div`
  color: #4d535c;
  font-size: 1rem;
  font-weight: bold;
`

const Info = () =>
  <List>
    <Item>
      <DD>
        <Icon type="database" size={28} color={theme.mainColorLight} />
      </DD>
      <FF>
        <KK>Connected to</KK>
        <ServersConsumer>
        {servers => <JJ>{servers[0] ? JSON.stringify(servers[0].server) : ''}</JJ>}
        </ServersConsumer>
      </FF>
    </Item>
    <Item>
      <DD>
        <Icon type="database" size={28} color={theme.mainColorLight} />
      </DD>
      <FF>
        <KK>Issues</KK>
        <JJ>No Issues</JJ>
      </FF>
    </Item>
    <Item>
      <DD>
        <Icon type="database" size={28} color={theme.mainColorLight} />
      </DD>
      <FF>
        <kk>Servers</kk>
        <ServersConsumer>
        {servers => <JJ>{servers.length} Connected</JJ>}
        </ServersConsumer>
      </FF>
    </Item>
    <Item>
      <DD>
        <Icon type="database" size={28} color={theme.mainColorLight} />
      </DD>
      <FF>
        <KK>Tables</KK>
        <TablesConsumer>
        {tables => <JJ>{tables.length}/{tables.length} ready</JJ>}
        </TablesConsumer>
      </FF>
    </Item>
  </List>

export default Info

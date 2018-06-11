import React from 'react'
import styled from 'react-emotion'
import theme from '@/style/common'
import {ServersConsumer} from '../../contexts/servers'
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

const Info = () => (
  <ServersConsumer>
    {servers => {
      return <List>
        <Item>
          <DD>
            <Icon type="database" size={28} color={theme.mainColorLight} />
          </DD>
          <FF>
            <KK>Connected to</KK>
            <JJ>{servers[0] ? JSON.stringify(servers[0].server) : ''}</JJ>
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
            <JJ>{servers.length} Connected</JJ>
          </FF>
        </Item>
        <Item>
          <DD>
            <Icon type="database" size={28} color={theme.mainColorLight} />
          </DD>
          <FF>
            <KK>Tables</KK>
            <JJ>0/0 ready</JJ>
          </FF>
        </Item>
      </List>
    }}
  </ServersConsumer>
)

export default Info

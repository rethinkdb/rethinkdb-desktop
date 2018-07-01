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

const DD = styled.div`
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
  <List>
    <Item>
      <DD>
        <Icon type='connections' size={30} color={theme.mainColorLight} />
      </DD>
      <FF>
        <KK>Connected to</KK>
        {/* <ServersConsumer> */}
        {/* {servers => <JJ>{servers[0] ? JSON.stringify(servers[0].server) : ''}</JJ>} */}
        {/* </ServersConsumer> */}
      </FF>
    </Item>
    <Item>
      <DD>
        <Icon type='danger' size={30} color={theme.mainColorLight} />
      </DD>
      <FF>
        <KK>Issues</KK>
        <JJ>No Issues</JJ>
      </FF>
    </Item>
    <Item>
      <DD>
        <Icon type='servers' size={30} color={theme.mainColorLight} />
      </DD>
      <FF>
        <kk>Servers</kk>
        {/* <ServersConsumer>{servers => <JJ>{servers.length} Connected</JJ>}</ServersConsumer> */}
      </FF>
    </Item>
    <Item>
      <DD>
        <Icon type='table' size={30} color={theme.mainColorLight} />
      </DD>
      <FF>
        <KK>Tables</KK>
        {/* <TablesConsumer> */}
        {/* {tables => ( */}
        {/* <JJ> */}
        {/* {tables.length}/{tables.length} ready */}
        {/* </JJ> */}
        {/* )} */}
        {/* </TablesConsumer> */}
      </FF>
    </Item>
  </List>
)

export default Info

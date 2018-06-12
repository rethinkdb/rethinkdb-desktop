import React, { Fragment } from 'react'
import Page from '../../components/Page'
import styled from 'react-emotion'
import { ServersConsumer } from '../../contexts/servers'
import { TablesConsumer } from '../../contexts/tables'

const Box = styled.div`
  border: 1px solid #cfcfcf;
  background: #fbfbfb;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.04), inset 0 -1px 2px rgba(0, 0, 0, 0.05);
  margin: 2rem;
  display: flex;

  h3 {
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  h3:before {
    content: '';
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.5rem;
    background: green;
    border-radius: 50%;
    display: inline-block;
  }
`

const Stat = styled.div`
  padding: 2rem;
  flex: 1;
  border-right: thin solid #f0f0f0;
`

const Dashboard = () => (
  <Page>
    <Box>
      <Stat>
        <ServersConsumer>
          {servers => (
            <Fragment>
              <h3>Servers</h3>
              <div>
                <b>{servers.length}</b> server connected
              </div>
              <div>
                <b>0</b> servers missing
              </div>
            </Fragment>
          )}
        </ServersConsumer>
      </Stat>
      <Stat>
        <TablesConsumer>
          {tables => (
            <Fragment>
              <h3>Tables</h3>
              <div>
                <b>{tables.length}</b> tables ready
              </div>
              <div>
                <b>0</b> tables with issues
              </div>
            </Fragment>
          )}
        </TablesConsumer>
      </Stat>
      <Stat>
        <TablesConsumer>
          {tables => {
            const indexCount = tables.reduce((acc, table) => {
              return acc + table.indexes.length
            }, 0)
            return (
              <Fragment>
                <h3>Indexed</h3>
                <div>
                  <b>{indexCount}</b> secondary indexes
                </div>
                <div>
                  <b>0</b> indexes building
                </div>
              </Fragment>
            )
          }}
        </TablesConsumer>
      </Stat>
      <Stat>
        <h3>Resources</h3>
        <div>
          <b>0%</b> cache used
        </div>
        <div>
          <b>0</b> Bytes disk used
        </div>
      </Stat>
    </Box>
  </Page>
)

export default Dashboard

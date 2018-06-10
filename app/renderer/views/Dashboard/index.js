import React from 'react'
import Page from '../../components/Page'
import styled from 'react-emotion'

const Box = styled.div`
  border: 1px solid grey;
  padding: 2rem;
  margin: 2rem;
`

const Dashboard = () => (
  <Page>
    <Box>servers, tables, indexes, Resource</Box>
    <Box>Cluster Performance</Box>
    <Box>Recent Logs entries</Box>
  </Page>
)

export default Dashboard

import React from 'react'
import moment from 'moment'
import {Box, Message, Server, Time, Level} from './styles'

const LogsPanel = ({records}) => <Box>
  <h1>Recent log entries</h1>
  <hr/>
  <ul>
    {records.map(({ id, level, message, timestamp, server }) =>
      <li key={id}>
        <Level value={level}/>
        <Message>
          <div>{message}</div>
          <div>Posted By: <Server>{server}</Server></div>
        </Message>
        <Time>{ moment(timestamp).fromNow()}</Time>
      </li>)}
  </ul>
</Box>

export default LogsPanel
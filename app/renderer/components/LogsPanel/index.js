import React from 'react'
import styled from 'react-emotion'
import theme from '@/style/common'
import moment from 'moment'

const Box = styled.div` 
  border: 1px solid ${theme.mainBorderColor}; 
  background: ${theme.contrastColor}; 
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.04), inset 0 -1px 2px rgba(0, 0, 0, 0.05); 
  margin: 2rem; 
 
  h1 {
    padding: 1rem; 
  }
  
  hr {
    margin: 0 1rem 0.5rem 1rem;
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid ${theme.mainBorderColor};
    padding: 0; 
  }
  
  ul {
    list-style: none; 
  }
  
  li {
    display: flex;
    align-items: center;
  }
`

const Level = styled.div`
  margin: 1rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: ${props => {
  if (props.value === 'info'){
    return theme.info;
  }
  return theme.grayTextColor;
}};
`

const Time = styled.div`
  width: 6rem;
  margin-left: 2rem;
`

const Message = styled.div`
  flex: 1;
  
  > div {
    margin: 0.5rem 0;
  }
`

const Server =  styled.span`
  color: ${theme.info};
  font-style: italic;
`

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
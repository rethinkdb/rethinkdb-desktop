import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../../components/Icon'

import { StyledHome } from './styles.js'

function Home (props) {
  return (
    <StyledHome>
      <div className='banner'>
        <h1 className='banner__title'>RebirthDB</h1>
      </div>
      <div className='empty__message'>
        <h2>No database connections added.</h2>
        <p>Click the "+" to add a RebirthDB connection.</p>
        <Link to='/newConnection'>
          <Icon type='plus' size={32} />
        </Link>
      </div>
    </StyledHome>
  )
}

export default Home

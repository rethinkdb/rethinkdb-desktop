import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import Icon from '../../components/Icon'

import { StyledHome } from './styles.js'

function Home (props) {
  return (
    <Fragment>
      <AppHeader />
      <StyledHome>
        <div className='banner'>
          <h1 className='banner__title'>RethinkDB</h1>
        </div>
        <div className='empty__message'>
          <h2>No database connections added.</h2>
          <p>Click the "+" to add a RethinkDB connection.</p>
          <Link to='/newConnection'>
            <Icon type='plus' size={32} />
          </Link>
        </div>
      </StyledHome>
    </Fragment>
  )
}

export default Home

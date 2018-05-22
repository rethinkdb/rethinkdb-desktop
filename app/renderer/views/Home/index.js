import React from 'react'
import { Link } from 'react-router-dom'
import Add from '../../static/svg/plus.svg'

import { StyledHome } from './styles.js'

function Home(props) {
  return (
    <StyledHome>
      <div className="banner">
        <h1 className="banner__title">RebirthDB</h1>
      </div>
      <div className="empty__message">
        <h2>No database connections added.</h2>
        <p>Click the "+" to add a RebirthDB connection.</p>
        <Link to="/newConnection">
          <img src={Add} width={32} />
        </Link>
      </div>
    </StyledHome>
  )
}

export default Home

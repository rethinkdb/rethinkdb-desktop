import React from 'react'
import { Link } from 'react-router-dom'
import Add from '../../static/svg/plus.svg'
import './home.less'

function Home(props) {
	return (
		<div className="RebirthDB_home">
			<div className="RebirthDB_home__banner">
				<h1 className="RebirthDB_home__banner__title">RebirthDB</h1>
			</div>
			<div className="RebirthDB_home__empty__message">
				<h2>No database connections added.</h2>
				<p>Click the "+" to add a RebirthDB connection.</p>
				<Link to="/newConnection">
					<img src={Add} width={32} />
				</Link>
			</div>
		</div>
	)
}

export default Home

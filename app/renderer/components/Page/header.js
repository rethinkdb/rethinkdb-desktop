import React from 'react'
import Link from 'react-router-dom/es/Link'
import styled from 'react-emotion'

const Container = styled.header`
  background: black;
  display: flex;
  padding: 1rem 10%;

  nav {
    flex: 1;
    margin-left: 5rem;
  }

  ul {
    display: flex;
    list-style: none;

    li {
      flex: 1;
      text-align: center;
      a {
        color: white;
        text-decoration: none;
      }
    }
  }
`

const Header = () => (
  <Container>
    <Link to="/newConnection">
      Rebirth<span>DB</span>
    </Link>
    <nav>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/tables">Tables</Link>
        </li>
        <li>
          <Link to="/explorer">Data Explorer</Link>
        </li>
        <li>
          <Link to="/logs">Logs</Link>
        </li>
      </ul>
    </nav>
  </Container>
)

export default Header

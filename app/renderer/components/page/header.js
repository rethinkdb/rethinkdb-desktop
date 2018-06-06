import React from 'react'
import styled from 'react-emotion'
import { NavLink, Link } from 'react-router-dom'
import theme from '@/style/common'

const Container = styled.header`
  background: ${theme.headerBackground};
  box-shadow: ${theme.headerGradient};
  display: flex;
  padding: 1rem 10%;
  align-items: center;

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
        color: ${theme.grayTextColor};
        font-size: 1rem;
        text-decoration: none;
        font-weight: bolder;
        
        &.active {
          color: white;
        }
      }
    }
  }
`

const Logo = styled(Link)`
  font-family: "Copse";
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bolder;
  
  span {
    color: ${theme.info};
  }
`

const Header = () => (
  <Container>
    <Logo to="/newConnection">Rebirth<span>DB</span></Logo>
    <nav>
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
        </li  >
        <li>
          <NavLink to="/tables" activeClassName="active">Tables</NavLink>
        </li>
        <li>
          <NavLink to="/explorer" activeClassName="active">Data Explorer</NavLink>
        </li>
        <li>
          <NavLink to="/logs" activeClassName="active">Logs</NavLink>
        </li>
      </ul>
    </nav>
  </Container>
)

export default Header

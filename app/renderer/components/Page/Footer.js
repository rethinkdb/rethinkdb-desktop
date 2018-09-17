import React from 'react'
import styled from 'react-emotion'
import theme from '@/style/common'

const Container = styled.footer`
  background: ${theme.infoBarsColor};
  display: flex;
  padding: 1rem 10%;
  color: black;

  > * {
    flex: 1;
  }

  ul {
    display: flex;
    list-style: none;

    li {
      flex: 1;
    }
  }
`

const Footer = () => (
  <Container>
    <nav>
      <ul>
        <li>RethinkDB</li>
      </ul>
    </nav>
  </Container>
)

export default Footer

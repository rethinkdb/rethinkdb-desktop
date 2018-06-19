import React from 'react'
import Header from './header'
import Footer from './footer'
import Info from './info'
import styled from 'react-emotion'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Body = styled.div`
  flex: 1;
`

const Page = ({ children }) => (
  <Container>
    <Header />
    <Info />
    <Body>{children}</Body>
    <Footer />
  </Container>
)

export default Page

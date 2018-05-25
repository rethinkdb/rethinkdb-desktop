import React  from 'react'
import Header from './Header'
import Footer from './Footer'
import Info from './Info'
import styled from 'react-emotion'

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Body = styled.div`
  flex: 1;
  background: white;
  color: black;
`

const Pagee = ({children}) =>
  <Container>
    <Header/>
    <Info/>
    <Body>
      {children}
    </Body>
    <Footer/>
  </Container>

export default Pagee

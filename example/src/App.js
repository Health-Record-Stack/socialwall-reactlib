import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { Socialwall } from 'socialwall-reactlib'
import 'socialwall-reactlib/dist/index.css'

const App = () => {
  return (
    <Container>
      <Row>
        <Col md="3">--Left Content--</Col>
        <Col md="6">
          <Socialwall />
        </Col>
        <Col md="3">--Right Content--</Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default App

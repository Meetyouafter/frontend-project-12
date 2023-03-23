import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './style.css';

const LayoutContainer = ({ auth, height, children }) => (
  auth ? (
    <Container className="layout_auth_wrapper" style={{ height: `${height}` }}>
      <Row>
        <Col lg={6} md={8} sm={10} xs={10} className="layout_auth_container">
          {children}
        </Col>
      </Row>
    </Container>
  ) : (
    <div className="layout_container">
      {children}
    </div>
  )
);

export default LayoutContainer;

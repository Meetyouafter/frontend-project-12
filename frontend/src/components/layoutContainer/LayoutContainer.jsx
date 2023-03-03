import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './style.css';

const LayoutContainer = ({ children }) => (
  <div className="layout_container">
    {children}
  </div>
);

const LayoutContainerForAuth = ({ children, height }) => (
  <Container className="layout_auth_wrapper" style={{ height: `${height}` }}>
    <Row>
      <Col lg={6} md={9} sm={12} className="layout_auth_container">
        {children}
      </Col>
    </Row>
  </Container>
);

export { LayoutContainer, LayoutContainerForAuth };

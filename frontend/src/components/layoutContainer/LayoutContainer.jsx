import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
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

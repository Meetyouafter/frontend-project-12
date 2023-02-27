import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const LayoutContainer = ({ children }) => (
  <div className="layout_container">
    {children}
  </div>
);

LayoutContainer.propTypes = {
  children: PropTypes.element,
};

export default LayoutContainer;

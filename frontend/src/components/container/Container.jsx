import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Container = ({ children, width }) => (
  <div className="primary_container" style={{ width: `${width}%` }}>
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number,
};

export default Container;

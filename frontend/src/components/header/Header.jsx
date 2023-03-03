import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import './styles.css';

const Header = () => {
  const logout = () => {
    localStorage.clear();
    return <Navigate to="/login" />;
  };

  return (
    <div className="primary_header">
      <p className="header_content">Chat by Meetyouafter</p>
      <Button type="button" variant="light" onClick={logout} disabled={!localStorage.token}>Выйти</Button>
    </div>
  );
};

export default Header;

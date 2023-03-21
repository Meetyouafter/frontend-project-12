import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './style.css';

const Error = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className="error_page_wrapper">
      <p className="error_page_description">{error}</p>
      <Button
        id="errorPage_button"
        className="primary_button"
        onClick={() => navigate('/')}
      >
        Вернуться на главную
      </Button>
    </div>
  );
};

export default Error;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import RouteService from '../../api/RouteService';
import './style.css';

const Error = ({ error }) => {
  const navigate = useNavigate();

  return (
    <div className="error_page_wrapper">
      <p className="error_page_description">{error}</p>
      <Button
        id="errorPage_button"
        onClick={() => navigate(RouteService.root)}
      >
        Вернуться на главную
      </Button>
    </div>
  );
};

export default Error;

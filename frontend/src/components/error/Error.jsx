import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import LayoutContainer from '../layoutContainer/LayoutContainer';
import errorImg from '../../assets/images/errorImg.png';
import './style.css';
import Header from '../header/Header';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <LayoutContainer width={50}>
        <img src={errorImg} alt="404 error" className="error_image" />
        <p className="error_page_description">Страница не найдена</p>
        <Button
          id="errorPage_button"
          className="primary_button"
          onClick={() => navigate('/')}
        >
          Вернуться на главную
        </Button>
      </LayoutContainer>
    </>
  );
};

export default ErrorPage;

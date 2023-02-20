import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Container from '../container/Container';
import errorImg from '../../assets/images/errorImg.png';
import './style.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Container width={50}>
      <img src={errorImg} alt="404 error" className="error_image" />
      <p className="error_page_description">Страница не найдена</p>
      <Button
        id="errorPage_button"
        className="primary_button"
        onClick={() => navigate('/')}
      >
        Вернуться на главную
      </Button>
    </Container>
  );
};

export default ErrorPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import errorImg from '../../assets/images/errorImg.png';
import RouteService from '../../api/RouteService';
import './style.css';

const Error404 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rootNavigation = () => navigate(RouteService.root, { replace: true });

  return (
    <div className="error_page_wrapper">
      <img src={errorImg} alt="404 error" className="error_image" />
      <p className="error_page_description">{t('error.not_found')}</p>
      <Button
        id="errorPage_button"
        onClick={rootNavigation}
      >
        {t('error.button')}
      </Button>
    </div>
  );
};

export default Error404;

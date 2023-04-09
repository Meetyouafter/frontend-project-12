import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import RouteService from '../../api/RouteService';
import './style.css';

const Error = ({ error }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rootNavigation = () => navigate(RouteService.root, { replace: true });

  return (
    <div className="error_page_wrapper">
      <p className="error_page_description">{error}</p>
      <Button
        id="errorPage_button"
        onClick={rootNavigation}
      >
        {t('error.button')}
      </Button>
    </div>
  );
};

export default Error;

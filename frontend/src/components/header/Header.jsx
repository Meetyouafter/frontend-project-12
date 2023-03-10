import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import logOutImg from '../../assets/images/logout_icon.svg';
import lngImg from '../../assets/images/language_icon.svg';
import Notification from '../notification/Notification';
import './styles.css';

const Header = ({ withBackBtn }) => {
  const [showNotification, setShowNotification] = useState(false);

  const toggleShow = () => setShowNotification(!showNotification);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tocken');
    return navigate('/');
  };

  const handleClick = (value) => {
    window.localStorage.setItem('language', value);
    i18n.changeLanguage(value);
    toggleShow();
  };

  return (
    <div className="primary_header">
      <p className="header_content"> Chat by Meetyouafter</p>
      <div className="header_btn_container">
        {withBackBtn
        && (
        <Button
          type="button"
          variant="light"
          onClick={logout}
        >
          <img src={logOutImg} alt="log out" />
        </Button>
        )}
        <Dropdown>
          <Dropdown.Toggle variant="light">
            <img src={lngImg} alt="change language" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="ru" onClick={() => handleClick('ru')}>{t('header.ru')}</Dropdown.Item>
            <Dropdown.Item eventKey="en" onClick={() => handleClick('en')}>{t('header.en')}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Notification variant="info" text={t('header.notification')} show={showNotification} toggleShow={toggleShow} />
    </div>
  );
};

export default Header;

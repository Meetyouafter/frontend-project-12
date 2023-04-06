import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logOutImg from '../../assets/images/logout_icon.svg';
import lngImg from '../../assets/images/language_icon.svg';
import RouteService from '../../api/RouteService';
import './styles.css';

const Header = ({ withBackBtn }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return navigate(RouteService.logIn);
  };

  const handleClick = (value) => {
    window.localStorage.setItem('language', value);
    i18n.changeLanguage(value);
    toast.info(t('header.notification'));
  };

  return (
    <div className="header_wrapper">
      <a className="header_content" href={useLocation().pathname}>{t('header.title')}</a>
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
    </div>
  );
};

export default Header;

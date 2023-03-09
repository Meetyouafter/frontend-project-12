import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Header = ({ withBackBtn }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tocken');
    return navigate('/');
  };

  const onChange = (e) => {
    window.localStorage.setItem('language', e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="primary_header">
      <p className="header_content"> Chat by Meetyouafter</p>
      {withBackBtn && <Button type="button" variant="light" onClick={logout} disabled={!localStorage.token}>{t('header.button')}</Button>}
      <Form.Select aria-label="Default select example" onChange={onChange}>
        <option>{t('header.choise_lng')}</option>
        <option value="ru">{t('header.ru')}</option>
        <option value="en">{t('header.en')}</option>
      </Form.Select>
    </div>
  );
};

export default Header;

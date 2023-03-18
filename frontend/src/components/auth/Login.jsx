import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Row, Button, Form, InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { setNotificationProps } from '../../store/slices/notification/notificationSlice';
import AuthService from '../../api/auth';
import './style.css';

const Login = () => {
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: async ({ name, password }) => {
      try {
        const { data } = await AuthService.postLoginData({ name, password });

        if (data.token) {
          setAuthError('');
          localStorage.setItem('user', JSON.stringify(data.name));
          localStorage.setItem('token', JSON.stringify(data.token));
          navigate('/chat');
        }
      } catch (error) {
        if (error.code === 'ERR_NETWORK') {
          dispatch(setNotificationProps({
            variant: 'error',
            text: t('network_error'),
            isShow: true,
          }));
        }

        if (error.response.status === 401) {
          setAuthError(t('login.errors.unregister'));
        }
      }
    },
  });

  return (
    <div className="login_container">
      <Row className="auth_header">
        {t('login.pages_data.title')}
      </Row>
      <Row className="form_wrapper">

        <Form onSubmit={formik.handleSubmit} className="form_container">

          <Form.Group controlId="name">
            <InputGroup hasValidation>
              <Form.Label
                visuallyHidden
              >
                {t('login.forms.name')}
              </Form.Label>
              <Form.Control
                name="name"
                type="text"
                required
                placeholder={t('login.forms.name')}
                isInvalid={!!authError}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="password">
            <InputGroup hasValidation>
              <Form.Label
                visuallyHidden
              >
                {t('login.forms.password')}
              </Form.Label>
              <Form.Control
                name="password"
                type="text"
                required
                placeholder={t('login.forms.password')}
                isInvalid={!!authError}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <Form.Control.Feedback type="invalid">
                {authError}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="primary_button"
          >
            {t('login.pages_data.button')}
          </Button>
        </Form>
      </Row>
      <Row className="auth_footer">
        {t('login.pages_data.footer_description')}
        <a href="/signup" className="link">{t('login.pages_data.footer_link')}</a>
      </Row>
    </div>
  );
};

export default Login;

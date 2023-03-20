import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Row, Button, Form, InputGroup, Col, Container,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { setNotificationProps } from '../../store/slices/notification/notificationSlice';
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
    onSubmit: async (values) => {
      try {
        await axios
          .post('/api/v1/login', { username: values.name, password: values.password }, { headers: { Authorization: `Bearer ${localStorage.token}` } })
        // AuthService.postLoginData({ username: values.name, password: values.password })
          .then((response) => {
            console.log('response', response);
            if (!response.data.username) {
              setAuthError(t('login.errors.unregister'));
              console.log(authError);
            } else {
              setAuthError('');
              localStorage.setItem('user', JSON.stringify(response.data.username));
              localStorage.setItem('token', JSON.stringify(response.data.token));
              navigate('/chat');
            }
          });
      } catch (error) {
        console.log('error', error);
        if (error.message === 'Request failed with status code 401') {
          setAuthError(t('login.errors.unregister'));
          console.log(authError);
        } else {
          dispatch(setNotificationProps({
            variant: 'error',
            text: t('network_error'),
            isShow: true,
          }));
        }
      }
    },
  });

  return (
    <Container>
      <Row>
        <Col className="auth_header">
          {t('login.pages_data.title')}
        </Col>
      </Row>
      <Row className="form_wrapper">
        <Col>
          <Form onSubmit={formik.handleSubmit} className="form_container">

            <Form.Group controlId="name">
              <InputGroup hasValidation size="md">
                <Form.Label
                  visuallyHidden
                >
                  {t('login.forms.name')}
                </Form.Label>
                <Form.Control
                  name="name"
                  id="form"
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
              <InputGroup hasValidation size="md">
                <Form.Label
                  visuallyHidden
                >
                  {t('login.forms.password')}
                </Form.Label>
                <Form.Control
                  name="password"
                  id="form"
                  type="password"
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
              className="auth_button"
            >
              {t('login.pages_data.button')}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="auth_footer">
          {t('login.pages_data.footer_description')}
          <a href="/signup" className="link">{t('login.pages_data.footer_link')}</a>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

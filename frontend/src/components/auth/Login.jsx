import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Row, Col, Button, Form, InputGroup, FloatingLabel, Container,
} from 'react-bootstrap';
import Header from '../header/Header';
import AuthService from '../../api/auth';
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
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(t('sign_up.errors.required')),
      password: Yup.string()
        .required(t('sign_up.errors.required')),
    }),
    onSubmit: async (values) => {
      AuthService.postLoginData({ username: values.name, password: values.password })
        .then((response) => {
          if (!response.data.username) {
            setAuthError(t('login.errors.unregister'));
          } else {
            setAuthError('');
            localStorage.setItem('user', JSON.stringify(response.data.username));
            localStorage.setItem('token', JSON.stringify(response.data.token));
            navigate('/chat');
          }
        })
        .catch((error) => {
          if (error.message === 'Request failed with status code 401') {
            setAuthError(t('login.errors.unregister'));
          } else {
            dispatch(setNotificationProps({
              variant: 'error',
              text: t('network_error'),
              isShow: true,
            }));
          }
        });
    },
  });

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col lg={6} md={8} sm={10} xs={10} className="auth_header">
            {t('login.pages_data.title')}
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={8} sm={10} xs={10}>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="name">
                <InputGroup hasValidation>
                  <FloatingLabel
                    controlId="floatingInput"
                    label={t('login.forms.name')}
                    className="mb-3"
                  >
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder={t('login.forms.name')}
                      isInvalid={!!authError || !!formik.errors.name}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group controlId="password">
                <InputGroup hasValidation>
                  <FloatingLabel
                    controlId="floatingInput"
                    label={t('login.forms.password')}
                    className="mb-3"
                  >
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder={t('login.forms.password')}
                      isInvalid={!!authError || !!formik.errors.password}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {authError || formik.errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
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
          <Col lg={6} md={8} sm={10} xs={10} className="auth_footer">
            {t('login.pages_data.footer_description')}
            <a href="/signup" className="link">{t('login.pages_data.footer_link')}</a>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;

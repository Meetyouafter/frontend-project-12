import React, { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Row, Col, Button, Form, FloatingLabel, Container,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Header from '../header/Header';
import AuthService from '../../api/AuthService';
import RouteService from '../../api/RouteService';
import { useAuth } from '../../context/AuthContext';
import './style.css';

const Login = () => {
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .required(t('sign_up.errors.required')),
      password: Yup.string()
        .required(t('sign_up.errors.required')),
    }),
    onSubmit: async (values) => {
      await AuthService
        .postLoginData({ username: values.name, password: values.password }, auth.getToken())
        .then((response) => {
          if (!response.data.username) {
            setAuthError(t('login.errors.unregister'));
          } else {
            setAuthError('');
            const username = JSON.stringify(response.data.username);
            const token = JSON.stringify(response.data.token);
            auth.login(username, token);
            navigate(RouteService.root);
          }
        })
        .catch((error) => {
          if (error.message === 'Request failed with status code 401') {
            setAuthError(t('login.errors.unregister'));
          } else {
            toast.error(t('network_error'));
          }
        });
    },
  });

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col lg={5} md={7} sm={9} xs={9} className="auth_header">
            {t('login.pages_data.title')}
          </Col>
        </Row>
        <Row>
          <Col lg={5} md={7} sm={9} xs={9}>
            <Form onSubmit={formik.handleSubmit}>
              <fieldset disabled={formik.isSubmitting}>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="name"
                    label={t('login.forms.name')}
                  >
                    <Form.Control
                      name="name"
                      type="text"
                      placeholder={t('login.forms.name')}
                      isInvalid={!!authError || !!formik.errors.name}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Control.Feedback type="invalid" tooltip={!!formik.errors.name}>
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="password"
                    label={t('login.forms.password')}
                  >
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder={t('login.forms.name')}
                      isInvalid={!!authError || !!formik.errors.password}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {authError || formik.errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="auth_button"
                >
                  {t('login.pages_data.button')}
                </Button>
              </fieldset>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col lg={5} md={7} sm={9} xs={9} className="auth_footer">
            {t('login.pages_data.footer_description')}
            <a href="/signup" className="link">{t('login.pages_data.footer_link')}</a>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;

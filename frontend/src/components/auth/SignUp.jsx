import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Row, Button, Form, Container, Col, FloatingLabel,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Header from '../header/Header';
import AuthService from '../../api/AuthService';
import RouteService from '../../api/RouteService';
import { useAuth } from '../../context/AuthContext';
import './style.css';

const SignUp = () => {
  const [uniqUserError, setUniqUserError] = useState('');
  const navigate = useNavigate();

  const { t } = useTranslation();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, t('sign_up.errors.name_length'))
        .max(20, t('sign_up.errors.name_length'))
        .required(t('sign_up.errors.required')),
      password: Yup.string()
        .min(6, t('sign_up.errors.password_length'))
        .required(t('sign_up.errors.required')),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')], t('sign_up.errors.password_match'))
        .required(t('sign_up.errors.required')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const response = await AuthService
          .postSignUpData({ username: values.name, password: values.password }, auth.getToken());
        const username = JSON.stringify(response.data.username);
        const token = JSON.stringify(response.data.token);
        auth.login(username, token);
        setUniqUserError('');
        navigate(RouteService.root, { replace: true });
      } catch (error) {
        if (error.message === 'Request failed with status code 409') {
          setUniqUserError(t('sign_up.errors.user_not_uniq'));
        } else {
          toast.error(t('network_error'));
        }
      }
    },
  });

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col lg={5} md={7} sm={9} xs={9} className="auth_header">
            {t('sign_up.pages_data.title')}
          </Col>
        </Row>
        <Row>
          <Col lg={5} md={7} sm={9} xs={9}>
            <Form onSubmit={formik.handleSubmit}>
              <fieldset>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="name"
                    label={t('sign_up.forms.name')}
                  >
                    <Form.Control
                      name="name"
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      placeholder={t('sign_up.forms.name')}
                      isInvalid={!!formik.errors.name || uniqUserError}
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.name || uniqUserError}
                    </Form.Control.Feedback>
                  </FloatingLabel>

                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="password"
                    label={t('sign_up.forms.password')}
                  >
                    <Form.Control
                      name="password"
                      type="password"
                      placeholder={t('sign_up.forms.password')}
                      isInvalid={!!formik.errors.password}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="passwordConfirmation"
                    label={t('sign_up.forms.password_repeat')}
                  >
                    <Form.Control
                      name="passwordConfirmation"
                      type="password"
                      placeholder={t('sign_up.forms.password_repeat')}
                      isInvalid={!!formik.errors.passwordConfirmation}
                      onChange={formik.handleChange}
                      value={formik.values.passwordConfirmation}
                      onBlur={formik.handleBlur}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.passwordConfirmation}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="auth_button"
                >
                  {t('sign_up.pages_data.button')}
                </Button>
              </fieldset>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col lg={5} md={7} sm={9} xs={9} className="auth_footer">
            {t('sign_up.pages_data.footer_description')}
            <a href="/" className="link">{t('sign_up.pages_data.footer_link')}</a>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;

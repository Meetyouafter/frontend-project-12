import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Row, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { setNotificationProps } from '../../store/slices/notification/notificationSlice';
import LoginServise from '../../api/auth';
import './style.css';

const Login = () => {
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const LoginSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('login.errors.required')),
    password: Yup.string()
      .required(t('login.errors.required')),
  });

  const initialForm = {
    name: '',
    password: '',
  };

  return (
    <div className="login_container">
      <Row className="auth_header">
        {t('login.pages_data.title')}
      </Row>
      <Row className="form_wrapper">
        <Formik
          initialValues={initialForm}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            LoginServise.postLoginData({ username: values.name, password: values.password })
              .then((response) => {
                setNameError('');
                localStorage.setItem('user', JSON.stringify(values.name));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                navigate('/chat');
              })
              .catch((error) => {
                console.log(error);
                if (error.message === 'Request failed with status code 401') {
                  setNameError(t('login.errors.unregister'));
                } else {
                  dispatch(setNotificationProps({
                    variant: 'error',
                    text: t('network_error'),
                    isShow: true,
                  }));
                }
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className="form_container">
              <Field
                name="name"
                type="name"
                placeholder={t('login.forms.name')}
                className={errors.name || nameError ? 'form_input form_error' : 'form_input'}
              />
              {touched.name && errors.name && (
              <div className="error_block">{errors.name}</div>
              )}
              <Field
                name="password"
                type="password"
                placeholder={t('login.forms.password')}
                className={errors.name || nameError ? 'form_input form_error' : 'form_input'}
              />
              {touched.password && errors.password && (
              <div className="error_block">{errors.password}</div>
              )}
              {nameError && (
              <div className="error_block">{nameError}</div>
              )}
              <Button
                type="submit"
                variant="primary"
              >
                {t('login.pages_data.button')}
              </Button>
            </Form>
          )}
        </Formik>
      </Row>
      <Row className="auth_footer">
        {t('login.pages_data.footer_description')}
        <a href="/sign_up" className="link">{t('login.pages_data.footer_link')}</a>
      </Row>
    </div>
  );
};

export default Login;

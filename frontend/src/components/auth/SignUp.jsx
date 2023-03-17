import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import LoginServise from '../../api/auth';
import { setNotificationProps } from '../../store/slices/notification/notificationSlice';
import './style.css';

const SignUp = () => {
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t('sign_up.errors.name_min_length'))
      .max(20, t('sign_up.errors.name_max_length'))
      .required(t('sign_up.errors.required')),
    password: Yup.string()
      .min(6, t('sign_up.errors.password_length'))
      .required(t('sign_up.errors.required')),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], t('sign_up.errors.password_match'))
      .required(t('sign_up.errors.required')),
  });

  const initialForm = {
    name: '',
    password: '',
    passwordConfirmation: '',
  };

  return (
    <div className="signup_container">
      <Row className="auth_header">
        {t('sign_up.pages_data.title')}
      </Row>
      <Row className="form_wrapper">
        <Formik
          initialValues={initialForm}
          validationSchema={SignUpSchema}
          onSubmit={(values) => {
            LoginServise.postSignUpData({ username: values.name, password: values.password })
              .then((response) => {
                setNameError('');
                localStorage.setItem('user', JSON.stringify(values.name));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                navigate('/chat');
              })
              .catch((error) => {
                if (error.message === 'Request failed with status code 409') {
                  setNameError(t('sign_up.errors.user_not_uniq'));
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
                placeholder={t('sign_up.forms.name')}
                text={t('sign_up.forms.name')}
                className={`${errors.name ? 'form_input form_error' : 'form_input'}`}
              />
              {touched.name && errors.name && (
              <div className="error_block">{errors.name}</div>
              )}
              {nameError && (
              <div className="error_block">{nameError}</div>
              )}
              <Field
                name="password"
                type="password"
                placeholder={t('sign_up.forms.password')}
                text={t('sign_up.forms.password')}
                className={`${errors.password ? 'form_input form_error' : 'form_input'}`}
              />
              {touched.password && errors.password && (
              <div className="error_block">{errors.password}</div>
              )}
              <Field
                name="passwordConfirmation"
                type="password"
                placeholder={t('sign_up.forms.password_repeat')}
                text={t('sign_up.forms.password_repeat')}
                className={`${
                  errors.passwordConfirmation ? 'form_input form_error' : 'form_input '
                }`}
              />
              {touched.passwordConfirmation && errors.passwordConfirmation && (
              <div className="error_block">{errors.passwordConfirmation}</div>
              )}
              <Button
                className="primary_button"
                type="submit"
                variant="primary"
              >
                {t('sign_up.pages_data.button')}
              </Button>
            </Form>
          )}
        </Formik>
      </Row>
      <Row className="auth_footer">
        {t('sign_up.pages_data.footer_description')}
        <a href="/" className="link">{t('sign_up.pages_data.footer_link')}</a>
      </Row>
    </div>
  );
};

export default SignUp;

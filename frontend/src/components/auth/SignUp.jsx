import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Row, Button, Form, InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import AuthService from '../../api/auth';
import { setNotificationProps } from '../../store/slices/notification/notificationSlice';
import './style.css';

const SignUp = () => {
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  const { t } = useTranslation();
  const dispatch = useDispatch();

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
    onSubmit: (values) => {
      AuthService.postSignUpData({ username: values.name, password: values.password })
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
    },
  });

  return (
    <div className="signup_container">
      <Row className="auth_header">
        {t('sign_up.pages_data.title')}
      </Row>
      <Row className="form_wrapper">

        <Form onSubmit={formik.handleSubmit} className="form_container">

          <Form.Group controlId="name">
            <InputGroup hasValidation>
              <Form.Label
                visuallyHidden
              >
                {t('sign_up.forms.name')}
              </Form.Label>
              <Form.Control
                name="name"
                type="text"
                required
                placeholder={t('sign_up.forms.name')}
                isInvalid={!!formik.errors.name}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.name || nameError}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="password">
            <InputGroup hasValidation>
              <Form.Label
                visuallyHidden
              >
                {t('sign_up.forms.password')}
              </Form.Label>
              <Form.Control
                name="password"
                type="text"
                required
                placeholder={t('sign_up.forms.password')}
                isInvalid={!!formik.errors.password}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="passwordConfirmation">
            <InputGroup hasValidation>
              <Form.Label
                visuallyHidden
              >
                {t('sign_up.forms.password_repeat')}
              </Form.Label>
              <Form.Control
                name="passwordConfirmation"
                type="text"
                required
                placeholder={t('sign_up.forms.password_repeat')}
                isInvalid={!!formik.errors.passwordConfirmation}
                onChange={formik.handleChange}
                value={formik.values.passwordConfirmation}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.passwordConfirmation}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Button
            className="primary_button"
            type="submit"
            variant="primary"
          >
            {t('sign_up.pages_data.button')}
          </Button>
        </Form>
      </Row>
      <Row className="auth_footer">
        {t('sign_up.pages_data.footer_description')}
        <a href="/" className="link">{t('sign_up.pages_data.footer_link')}</a>
      </Row>
    </div>
  );
};

export default SignUp;

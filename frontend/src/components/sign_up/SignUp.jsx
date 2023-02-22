import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Row, Col, Button,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import LayoutContainer from '../layoutContainer/LayoutContainer';
import './style.css';
import Header from '../header/Header';

const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Имя должно быть не менее 2 символов')
    .max(20, 'Имя должно быть не более 20 символов')
    .required('Поле обязательно для заполнения'),
  password: Yup.string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required('Поле обязательно для заполнения'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Поле обязательно для заполнения'),
});

const initialForm = {
  name: '',
  password: '',
  passwordConfirmation: '',
};

const Login = () => {
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  return (
    <>
    <Header />
    kkkk
    <LayoutContainer className="login_wrapper" width={60}>
      <Row className="header_wrapper">
        <Col className="login_header">
          Зарегистрироваться
        </Col>
      </Row>
      <Row className="form_wrapper">
        <Formik
          initialValues={initialForm}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            axios.post('/api/v1/signup', { username: values.name, password: values.password })
              .then((response) => {
                setNameError('');
                localStorage.setItem('user', JSON.stringify(values.name));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                navigate('/');
              })
              .catch((error) => {
                if (error.message === 'Request failed with status code 409') {
                  setNameError('Такой пользователь уже существует');
                }
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className="form_container">
              <Field
                name="name"
                type="name"
                className={`form_input ${errors.name ? 'form_error' : ''}`}
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
                className={`form_input ${errors.password ? 'form_error' : ''}`}
              />
              {touched.password && errors.password && (
                <div className="error_block">{errors.password}</div>
              )}
              <Field
                name="passwordConfirmation"
                type="password"
                className={`form_input ${
                  errors.passwordConfirmation ? 'form_error' : ''
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
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Row>
    </LayoutContainer>
    </>
  );
};

export default Login;

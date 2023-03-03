import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Button } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './style.css';

const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .required('Поле обязательно для заполнения'),
  password: Yup.string()
    .required('Поле обязательно для заполнения'),
});

const initialForm = {
  name: '',
  password: '',
};

const Login = () => {
  const [nameError, setNameError] = useState('');
  const navigate = useNavigate();

  return (
    <div className="auth_container">
      <Row className="auth_header">
        Войти
      </Row>
      <Row className="form_wrapper">
        <Formik
          initialValues={initialForm}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            axios.post('/api/v1/login', { username: values.name, password: values.password })
              .then((response) => {
                setNameError('');
                localStorage.setItem('user', JSON.stringify(values.name));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                navigate('/');
              })
              .catch((error) => {
                if (error.message === 'Request failed with status code 401') {
                  setNameError('Такой пользователь не зарегистрирован');
                }
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className="form_container">
              <Field
                name="name"
                type="name"
                placeholder="Имя пользователя"
                className={`${errors.name ? 'form_input form_error' : 'form_input'}`}
              />
              {touched.name && errors.name && (
              <div className="error_block">{errors.name}</div>
              )}
              <Field
                name="password"
                type="password"
                placeholder="Пароль"
                className={`${errors.password ? 'form_input form_error' : 'form_input'}`}
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
                Войти
              </Button>
            </Form>
          )}
        </Formik>
      </Row>
      <Row className="auth_footer">
        Ещё нет аккаунта?
        <a href="/sign_up" className="link">Зарегистрироваться</a>
      </Row>
    </div>
  );
};

export default Login;
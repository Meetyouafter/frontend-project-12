import axios from 'axios';

const LOGIN_DATA_URL = '/api/v1/login';

const postLoginData = (data) => axios
  .post(LOGIN_DATA_URL, { data }, { headers: { Authorization: `Bearer ${localStorage.token}` } });

const LoginServise = { postLoginData };

export default LoginServise;

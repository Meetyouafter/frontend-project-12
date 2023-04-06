import axios from 'axios';

const LOGIN_DATA_URL = '/api/v1/login';
const SIGN_UP_DATA_URL = '/api/v1/signup';

const postLoginData = (data, token) => axios
  .post(LOGIN_DATA_URL, data, { headers: { Authorization: `Bearer ${token}` } });

const postSignUpData = (data, token) => axios
  .post(SIGN_UP_DATA_URL, data, { headers: { Authorization: `Bearer ${token}` } });

const AuthService = { postLoginData, postSignUpData };

export default AuthService;

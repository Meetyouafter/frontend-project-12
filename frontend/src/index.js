import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import textService from './textService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

textService();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />,
);

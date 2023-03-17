import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';
import Error404 from './components/errors/error404';
import store from './store';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signUpPage';
import ChatPage from './pages/chatPage';
import './services/i18n/initial';
import './App.css';

const rollbarConfig = {
  accessToken: '492b63050c0c42bd949cf4e492c7b6c7',
  environment: 'production',
};

const App = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary level={LEVEL_WARN} errorMessage="Error in React render">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<SignUpPage />} />
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;

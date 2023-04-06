import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary, LEVEL_WARN } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import Error404 from './components/errors/Error404';
import store from './store';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Chat from './components/chat/Chat';
import RouteService from './api/RouteService';
import { AuthProvider } from './context/AuthContext';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_KEY,
  environment: 'production',
};

const App = () => (
  <AuthProvider>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} errorMessage="Error in React render">
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path={RouteService.signUp} element={<SignUp />} />
              <Route exact path={RouteService.logIn} element={<Login />} />
              <Route path={RouteService.root} element={<Chat />} />
              <Route path={RouteService.notFound} element={<Error404 />} />
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </AuthProvider>
);

export default App;

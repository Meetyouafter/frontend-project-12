import React, {
  createContext, useContext, useMemo,
} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isLogged = () => {
    const userData = localStorage.getItem('username');
    const tokenData = localStorage.getItem('token');
    if (userData && tokenData) {
      return true;
    }
    return false;
  };

  const login = (username, token) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  };

  const getData = () => {
    const userData = localStorage.getItem('username');
    const tokenData = localStorage.getItem('token');
    if (userData) {
      const user = JSON.parse(userData);
      const token = JSON.parse(tokenData);
      return { user, token };
    }
    return { user: userData, token: tokenData };
  };

  const getToken = () => localStorage.getItem('token');

  const memoValue = useMemo(() => ({
    isLogged, login, logout, getData, getToken,
  }), []);

  return (
    <AuthContext.Provider value={memoValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

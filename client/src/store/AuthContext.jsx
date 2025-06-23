import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    localStorage.setItem('access_token', res.data.access_token);
    localStorage.setItem('refresh_token', res.data.refresh_token);
    setUser(res.data.user);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  useEffect(() => {
    // TODO: kiểm tra token và load user khi load app
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

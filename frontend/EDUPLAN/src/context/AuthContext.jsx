import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    if (token) {
      setIsLoggedIn(true);
      setUserType(tipoUsuario);
    }
  }, []);

  const login = (token, tipoUsuario) => {
    localStorage.setItem('token', token);
    localStorage.setItem('tipoUsuario', tipoUsuario);
    setIsLoggedIn(true);
    setUserType(tipoUsuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

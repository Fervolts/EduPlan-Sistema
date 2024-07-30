import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null); // Estado inicial para el ID de usuario

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    const userIdStorage = localStorage.getItem('userId'); // Obtener el ID de usuario almacenado
  
    if (token) {
      setIsLoggedIn(true);
      setUserType(tipoUsuario);
      setUserId(userIdStorage); // Establecer el ID de usuario si está almacenado
    }
  }, []);

  const login = (token, tipoUsuario, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('tipoUsuario', tipoUsuario);
    localStorage.setItem('userId', userId); // Almacenar el userId en localStorage
    setIsLoggedIn(true);
    setUserType(tipoUsuario);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('userId'); // Eliminar el ID de usuario
    setIsLoggedIn(false);
    setUserType(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
export const RequireAuth = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);   
  
  
    if (!isLoggedIn) {
      return <Navigate to="/login"/>;
    }
  
    return children;
  }
  
  export const RutaDashboard = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
  
    if (isLoggedIn) {
      return <Navigate to="/dashboard"/>;
    }
  
    return children;
  }
  
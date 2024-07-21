import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
//import { userType } from '../context/AuthContext';

const token = localStorage.getItem('token');
const tipoUsuario = localStorage.getItem('tipoUsuario');

export const SortedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if(isLoggedIn === true) {
        return <Navigate to="/" />;
    }
    else if(isLoggedIn === false) {
        return children
  }};
export const SortedRouteAdmin = ({ children }) => {
    

    if (tipoUsuario !== 'administrador') {
        return <Navigate to="/" />;
    }

    return children
}

export const SortedRouteProf = ({ children }) => {

    if (tipoUsuario !== 'profesor') {
        return <Navigate to="/" />;
    }

    return children}

export const SortedRouteEst = ({ children }) => {

    if (tipoUsuario !== 'estudiante') {
        window.location.href = '/';
    }

    return children}
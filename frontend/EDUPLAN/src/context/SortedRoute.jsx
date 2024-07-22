import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const SortedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return children;
};

SortedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export const SortedRouteAdmin = ({ children }) => {
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (tipoUsuario !== 'administrador') {
        return <Navigate to="/" />;
    }

    return children;
};

SortedRouteAdmin.propTypes = {
    children: PropTypes.node.isRequired,
};

export const SortedRouteProf = ({ children }) => {
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (tipoUsuario !== 'profesor') {
        return <Navigate to="/" />;
    }

    return children;
};

SortedRouteProf.propTypes = {
    children: PropTypes.node.isRequired,
};

export const SortedRouteEst = ({ children }) => {
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (tipoUsuario !== 'estudiante') {
        return <Navigate to="/" />;
    }

    return children;
};

SortedRouteEst.propTypes = {
    children: PropTypes.node.isRequired,
};

export const SortedRouteUsers = ({ children }) => {
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (!['administrador', 'profesor', 'estudiante'].includes(tipoUsuario)) {
        return <Navigate to="/" />;
    }

    return children;
};

SortedRouteUsers.propTypes = {
    children: PropTypes.node.isRequired,
};

export const SortedRouteAdminOrProf = ({ children }) => {
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (!['administrador', 'profesor'].includes(tipoUsuario)) {
        return <Navigate to="/" />;
    }

    return children;
};

SortedRouteAdminOrProf.propTypes = {
    children: PropTypes.node.isRequired,
};

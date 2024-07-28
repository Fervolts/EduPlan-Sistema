import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router';
import AdministradorDashboard from './AdministradorDashboard.jsx';
import ProfesorDashboard from './ProfesorDashboard.jsx';
import EstudianteDashboard from './EstudianteDashboard.jsx';
import './styles/Dashboard.css';

function Dashboard() {
  const { userType } = useContext(AuthContext);   

  const tipoUsuario = localStorage.getItem('tipoUsuario')

  // Condicional que decide segun el tipo de usuario

  if (tipoUsuario === 'administrador') {
    return <AdministradorDashboard />;
  } else if (tipoUsuario === 'profesor') {
    return <ProfesorDashboard />;
  } else if (tipoUsuario === 'estudiante') {
    return <EstudianteDashboard />;
  } else {
    return <Navigate to="/" />;
  }
}

export default Dashboard;
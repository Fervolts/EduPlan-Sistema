import React from 'react';
import { FaWpforms, FaUser,  } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import './styles/Dashboard.css';
function ProfesorDashboard() {
  // Content for administrador
  return (
    <div className='Base'>
        <h1>Bienvenido Profesor</h1>
    <div className="dashboard dashstud">
        <div className='row'>
      <div className="dashboard-box" onClick={() => window.location.href = "/evaluaciones"}>
        <FaWpforms size={100} color="#2c3e50" style={{marginLeft: '10px'}}/> <p>Evaluaciones</p>
      </div>
      <div className="dashboard-box" onClick={() => window.location.href = "/listadoEstudiantes"}>
        <FaUser size={100} color="#2c3e50" style={{marginLeft: '10px'}} /> <p> Listado de Estudiantes</p>
      </div>
      
        </div>
        <div className='row'>
      <div className="dashboard-box" onClick={() => window.location.href = "/notas"}>
        <PiStudentFill size={120} color="#2c3e50" style={{marginLeft: '10px'}} /> <p>Notas Estudiantes</p>
      </div>
      
        </div>
    </div>
    </div>
  );
}

export default ProfesorDashboard;
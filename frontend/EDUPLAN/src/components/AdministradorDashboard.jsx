import React from 'react';
import { FaDatabase, FaPen, FaQq, FaUserPlus, FaUserTie, FaUser } from "react-icons/fa6";

function AdministradorDashboard() {
  // Content for administrador
  return (
    <div className='Base'>
      <h1>Bienvenido Administrador</h1>
    <div className="dashboard">
        <div className='row'>
      <div className="dashboard-box" onClick={() => window.location.href = "/registroEstudiante"}>
        <FaUserPlus size={100} color="#2c3e50" style={{marginLeft: '10px'}}/> <p>Registrar Estudiante</p>
      </div>
      <div className="dashboard-box" onClick={() => window.location.href = "/registroProfe"}>
        <FaUserPlus size={100} color="#2c3e50" style={{marginLeft: '10px'}}/> <p>Registrar Profesor</p>
      </div>
      <div className="dashboard-box" onClick={() => window.location.href = "/registroAdmin"}>
        <FaQq size={90} color="#2c3e50" style={{marginRight: '30px'}} /> <p> Registrar Admin</p>
      </div>
      <div className="dashboard-box" onClick={() => window.location.href = "/noticias"}>
        <FaPen size={80} color="#2c3e50" style={{marginRight: '30px'}} /> <p>Noticias</p>
      </div>
        </div>
        <div className='row'>
      <div className="dashboard-box " onClick={() => window.location.href = "/listadoProf"}>
        <FaUserTie size={100} color="#2c3e50" style={{marginLeft: '10px'}} /> <p> Listado de Profesores</p>
      </div>
      <div className="dashboard-box" onClick={() => window.location.href = "/listadoEstudiantes"}>
        <FaUser size={100} color="#2c3e50" style={{marginLeft: '10px'}} /> <p> Listado de Estudiantes</p>
      </div>
      <div className="dashboard-box" onClick={() => window.location.href = "/evaluaciones"}>
        <FaDatabase size={100} color="#2c3e50" style={{marginRight: '10px'}} /> <p>Evaluaciones</p>
      </div>
        </div>
    </div>
    </div>
  );
}

export default AdministradorDashboard;
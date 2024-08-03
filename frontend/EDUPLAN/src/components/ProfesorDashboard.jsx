import React from 'react';
import { useEffect, useState } from 'react';
import { FaWpforms, FaUser,  } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import './styles/Dashboard.css';
function ProfesorDashboard() {
  const [showIngresarMaterias, setShowIngresarMaterias] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const checkProfesorMateria = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profesor/${userId}/materias`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setShowIngresarMaterias(data.every(materia => materia.Profesors.length === 0));
      } catch (error) {
        console.error('Error checking profesor materias:', error);
        // Handle error, e.g., show a default state or an error message
      }
    };

    if (userId) {
      checkProfesorMateria();
    }
  }, [userId]);

  return (
    <div className='Base'>
        <h1>Bienvenido Profesor</h1>
    <div className="dashboard dashstud">
        <div className='row'>
      <div className="dashboard-box" onClick={() => window.location.href = "/evaluaciones"}>
        <FaWpforms size={100} color="#2c3e50" style={{marginLeft: '10px'}}/> <p>Evaluaciones</p>
      </div>
      
      
        </div>
        <div className='row'>
        <div className="dashboard-box" onClick={() => window.location.href = "/listadoEstudiantes"}>
        <FaUser size={100} color="#2c3e50" style={{marginLeft: '10px'}} /> <p> Listado de Estudiantes</p>
      </div>
      {/* <div className="dashboard-box" onClick={() => window.location.href = "/notas"}>
        <PiStudentFill size={120} color="#2c3e50" style={{marginLeft: '10px'}} /> <p>Notas Estudiantes</p>
      </div> */}
      {showIngresarMaterias && (
            <div className='dashboard-box' onClick={() => window.location.href = "/inscripcionprofesor"}>
              <FaUser size={100} color="#2c3e50" style={{ marginLeft: '10px' }} /> <p> Ingresar Materias </p>
            </div>
          )}
      
        </div>
    </div>
    </div>
  );
}

export default ProfesorDashboard;
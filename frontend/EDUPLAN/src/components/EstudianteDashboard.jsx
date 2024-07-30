import React from 'react';
import { FaWpforms, FaUser,  } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import './styles/Dashboard.css';
import { useState, useEffect } from 'react';

function EstudianteDashboard() {
  const [hasMaterias, setHasMaterias] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/estudiante/${userId}/materias`);
        const data = await response.json();
        console.log(data);
        setHasMaterias(data.length > 0); // Assuming data is an array of materias
      } catch (error) {
        console.error('Error fetching materias:', error);
      }
    };

    if (userId) {
      fetchMaterias();
    }
  }, [userId]);

  return (
    <div className='Base'>
        <h1>Bienvenido Estudiante</h1>
    <div className="dashboard dashstud">
        <div className='row'>
      <div className="dashboard-box" onClick={() => window.location.href = "/evaluaciones"}>
        <FaWpforms size={100} color="#2c3e50" style={{marginLeft: '10px'}}/> <p>Evaluaciones</p>
      </div>
      <div className='dashboard-box' style={{ display: hasMaterias ? 'none' : 'flex' }} onClick={() => window.location.href = "/inscripcionestudiante"} >
        <FaUser size={100} color="#2c3e50" style={{marginLeft: '10px'}} /> <p> Ingresar Materias </p>
      </div>
        </div>
        <div className='row'>
      {/* <div className="dashboard-box" onClick={() => window.location.href = "/notas"}>
        <PiStudentFill size={120} color="#2c3e50" style={{marginLeft: '10px'}} /> <p>Notas</p>
      </div> */}
      
        </div>
    </div>
    </div>
  );
}

export default EstudianteDashboard;
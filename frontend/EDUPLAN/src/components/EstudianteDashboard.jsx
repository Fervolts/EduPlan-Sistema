import React from 'react';
import { FaWpforms, FaUser,  } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import './styles/Dashboard.css';

// Leer nombre_materia de la base de datos
const dataMaterias = () => {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/materias');
        if (!response.ok) {
          throw new Error('Error al obtener las materias');
        }
        const data = await response.json();
        console.log('Datos de materias recibidos:', data); // Verifica los datos recibidos
        setMaterias(data);
      } catch (error) {
        console.error('Error al obtener las materias:', error);
      }
    };

    fetchMaterias();
  }, []);
}

function ProfesorDashboard() {
  // Content for administrador
  return (
    <div className='Base'>
        <h1>Bienvenido Estudiante</h1>
    <div className="dashboard dashstud">
        <div className='row'>
      <div className="dashboard-box" onClick={() => window.location.href = "/evaluaciones"}>
        <FaWpforms size={100} color="#2c3e50" style={{marginLeft: '10px'}}/> <p>Evaluaciones</p>
      </div>
      <div className='dashboard-box' onClick={() => window.location.href = "/inscripcionestudiante"} >
        <FaUser size={100} color="#2c3e50" style={{marginLeft: '10px'}} /> <p> Ingresa Materias </p>
      </div>
        </div>
        <div className='row'>
      <div className="dashboard-box" onClick={() => window.location.href = "/notas"}>
        <PiStudentFill size={120} color="#2c3e50" style={{marginLeft: '10px'}} /> <p>Notas</p>
      </div>
      
        </div>
    </div>
    </div>
  );
}

export default ProfesorDashboard;
import React, { useState, useEffect } from 'react';
import './styles/Listado.css';
import defaultProfilePic from '../assets/default-profile-pic.png';
const API_URL = 'http://localhost:3000/api';

const ListadoEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    try {
      // Suponiendo que el token se guarda en localStorage después del inicio de sesión
      const token = localStorage.getItem('token'); 
      
      let res = await fetch(`${API_URL}/estudiantes`, {
        headers: {
          'Authorization': `Bearer ${token}` // Enviar el token en el encabezado Authorization
        }
      });
  
      if (!res.ok) {
        throw new Error('No autorizado');
      }
  
      let data = await res.json();
      setEstudiantes(data);
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
    }
  };

  return (
    <div className="students">
      <div className="students-list">
        <h2>Lista de Estudiantes</h2>
        {estudiantes.length > 0 ? (
          <div className="card-container">
            {estudiantes.map(estudiante => (
              <div key={estudiante.id_estudiante} className="student-card">
                <img src={defaultProfilePic} alt="Profile" className="profile-pic" />
                <div className="card-details">
                  <h3>{estudiante.nombres} {estudiante.apellidos}</h3>
                  <p><strong>ID:</strong> {estudiante.documento_identidad}</p>
                  <p><strong>Email:</strong> {estudiante.correo_electronico}</p>
                  <p><strong>Teléfono:</strong> {estudiante.numero_telefono}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-students">
            <p>No hay estudiantes registrados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListadoEstudiantes;

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
    let res = await fetch(`${API_URL}/estudiantes`);
    let data = await res.json();
    setEstudiantes(data);
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
          <p>No hay estudiantes registrados</p>
        )}
      </div>
    </div>
  );
};

export default ListadoEstudiantes;

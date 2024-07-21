import React, { useState, useEffect } from 'react';
import './styles/Listado.css';
import defaultProfilePic from './assets/default-profile-pic2.jpg';

const API_URL = 'http://localhost:3000/api';

const ListadoProfesores = () => {
  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    fetchProfesores();
  }, []);

  const fetchProfesores = async () => {
    try {
      const token = localStorage.getItem('token'); 
      
      let res = await fetch(`${API_URL}/profesores`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!res.ok) {
        throw new Error('No autorizado');
      }
  
      let data = await res.json();
      setProfesores(data);
    } catch (error) {
      console.error('Error al obtener profesores:', error);
    }
  };

  return (
    <div className="students">
      <div className="students-list">
        <h2>Lista de Profesores</h2>
        {profesores.length > 0 ? (
          <div className="card-container">
            {profesores.map(profesor => (
              <div key={profesor.id_profesor} className="student-card">
                <img src={defaultProfilePic} alt="Profile" className="profile-pic" />
                <div className="card-details">
                  <h3>{profesor.nombres} {profesor.apellidos}</h3>
                  <p><strong>Email:</strong> {profesor.correo_electronico}</p>
                  <p><strong>Usuario:</strong> {profesor.usuario}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-students">
            <p>No hay profesores registrados.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListadoProfesores;

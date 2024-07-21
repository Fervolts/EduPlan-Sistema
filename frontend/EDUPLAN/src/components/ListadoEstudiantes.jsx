import React, { useState, useEffect } from 'react';
import './styles/Listado.css';

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
          <ul>
            {estudiantes.map(estudiante => (
              <li key={estudiante.id_estudiante}>
                {estudiante.nombres} {estudiante.apellidos} - {estudiante.documento_identidad} - {estudiante.correo_electronico}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay estudiantes registrados</p>
        )}
      </div>
    </div>
  );
};

export default ListadoEstudiantes;

import React, { useState, useEffect } from 'react';
import './styles/Evaluaciones.css';

const API_URL = 'http://localhost:3000/api';

const ListadoEvaluaciones = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvaluaciones = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      let res = await fetch(`${API_URL}/evaluaciones`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!res.ok) {
        throw new Error('No autorizado');
      }
  
      let data = await res.json();
      setEvaluaciones(data);
    } catch (error) {
      console.error('Error al obtener evaluaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluaciones();
  }, []);

  return (
    <div className="evaluaciones">
      <div className="evaluaciones-list">
        <h2>Lista de Evaluaciones</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            {evaluaciones.length > 0 ? (
              <div className="column-container">
                {evaluaciones.map(evaluacion => (
                  <div key={evaluacion.id_evaluacion} className="evaluacion-card">
                    <div className="card-details">
                      <h3>{evaluacion.descripcion}</h3>
                      <p><strong>ID Evaluación:</strong> {evaluacion.id_evaluacion}</p>
                      <p><strong>ID Materia:</strong> {evaluacion.id_materia}</p>
                      <p><strong>Fecha Límite:</strong> {evaluacion.fecha_limite}</p>
                      <p><strong>Porcentaje Calificación:</strong> {evaluacion.porcentaje_calificacion}%</p>
                      <p><strong>Calificación:</strong> {evaluacion.calificacion !== null ? evaluacion.calificacion : 'No asignada'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-students">
                <p>No hay evaluaciones registradas.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListadoEvaluaciones;

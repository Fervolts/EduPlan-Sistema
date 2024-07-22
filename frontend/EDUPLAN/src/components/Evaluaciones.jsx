import React, { useState, useEffect, useContext } from 'react';
import './styles/Evaluaciones.css';
import { AuthContext } from '../context/AuthContext';

const API_URL = 'http://localhost:3000/api';

const ListadoEvaluaciones = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editEval, setEditEval] = useState(null);
  const [formValues, setFormValues] = useState({
    id_materia: '',
    fecha_limite: '',
    porcentaje_calificacion: '',
    descripcion: '',
    calificacion: ''
  });

  const { userType } = useContext(AuthContext);

  const fetchMaterias = async () => {
    try {
      const token = localStorage.getItem('token');
      let res = await fetch(`${API_URL}/materias`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('No autorizado');
      let data = await res.json();
      setMaterias(data);
    } catch (error) {
      console.error('Error al obtener materias:', error);
    }
  };

  const fetchEvaluaciones = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      let res = await fetch(`${API_URL}/evaluaciones`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('No autorizado');
      let data = await res.json();
      setEvaluaciones(data);
    } catch (error) {
      console.error('Error al obtener evaluaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterias();
    fetchEvaluaciones();
  }, []);

  const getMateriaName = (idMateria) => {
    const materia = materias.find(m => m.id_materia === idMateria);
    return materia ? materia.nombre_materia : 'Desconocido';
  };

  const handleEditClick = (evaluacion) => {
    setEditEval(evaluacion);
    setFormValues(evaluacion);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdateEvaluacion = async () => {
    try {
      const token = localStorage.getItem('token');
      let res = await fetch(`${API_URL}/evaluaciones/${editEval.id_evaluacion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
      });
      if (!res.ok) throw new Error('No autorizado');
      let data = await res.json();
      setEditEval(null);
      setFormValues({
        id_materia: '',
        fecha_limite: '',
        porcentaje_calificacion: '',
        descripcion: '',
        calificacion: ''
      });
      fetchEvaluaciones(); // Refresh the evaluations list
    } catch (error) {
      console.error('Error al actualizar evaluación:', error);
    }
  };

  const handleCloseModal = () => {
    setEditEval(null);
  };

  return (
    <div className="evaluaciones">
      <div className="evaluaciones-list">
        <h2 className="titulo-evaluaciones">Lista de Evaluaciones</h2>
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
                      <p><strong>Materia:</strong> {getMateriaName(evaluacion.id_materia)}</p>
                      <p><strong>Fecha Límite:</strong> {evaluacion.fecha_limite}</p>
                      <p><strong>Porcentaje Calificación:</strong> {evaluacion.porcentaje_calificacion}%</p>
                      <p><strong>Calificación:</strong> {evaluacion.calificacion !== null ? evaluacion.calificacion : 'No asignada'}</p>
                      {(userType === 'administrador' || userType === 'profesor') && (
                          <div className="edit-button-container">
                          <button onClick={() => handleEditClick(evaluacion)}>Editar</button>
                        </div>
                      )}
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
      {editEval && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Editar Evaluación</h2>
            <form>
              <label>
                Materia:
                <select name="id_materia" value={formValues.id_materia} onChange={handleInputChange}>
                  {materias.map(materia => (
                    <option key={materia.id_materia} value={materia.id_materia}>{materia.nombre_materia}</option>
                  ))}
                </select>
              </label>
              <label>
                Fecha Límite:
                <input type="date" name="fecha_limite" value={formValues.fecha_limite} onChange={handleInputChange} />
              </label>
              <label>
                Porcentaje Calificación:
                <input type="number" name="porcentaje_calificacion" value={formValues.porcentaje_calificacion} onChange={handleInputChange} />
              </label>
              <label>
                Descripción:
                <input type="text" name="descripcion" value={formValues.descripcion} onChange={handleInputChange} />
              </label>
              <label>
                Calificación:
                <input type="number" name="calificacion" value={formValues.calificacion} onChange={handleInputChange} />
              </label>
              <button type="button" onClick={handleUpdateEvaluacion}>Actualizar Evaluación</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListadoEvaluaciones;

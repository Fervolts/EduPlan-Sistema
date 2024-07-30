import { useState, useEffect, useContext } from 'react';
import './styles/Evaluaciones.css';
import { AuthContext } from '../context/AuthContext';
import CreateEvaluacion from './CreateEvaluacion';

const API_URL = 'http://localhost:3000/api';

const ListadoEvaluaciones = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editEval, setEditEval] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvalId, setSelectedEvalId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    id_materia: '',
    fecha_limite: '',
    porcentaje_calificacion: '',
    descripcion: '',
    calificacion: '',
    estado: 'pendiente',
    enlace: ''
  });
  const [enlace, setEnlace] = useState('');

  const { userType, userId, token } = useContext(AuthContext); // Asegúrate de obtener el token desde AuthContext

  useEffect(() => {
    fetchMaterias();
    fetchEvaluaciones();
  }, []);

  const fetchMaterias = async () => {
    try {
      const res = await fetch(`${API_URL}/materias`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('No autorizado');
      const data = await res.json();
      setMaterias(data);
    } catch (error) {
      console.error('Error al obtener materias:', error);
    }
  };

  const fetchEvaluaciones = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/evaluaciones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('No autorizado');
      const data = await res.json();
      setEvaluaciones(data);
    } catch (error) {
      console.error('Error al obtener evaluaciones:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloserModal = () => {
    setIsModalOpen(false);
  };


  const getMateriaName = (idMateria) => {
    const materia = materias.find((m) => m.id_materia === idMateria);
    return materia ? materia.nombre_materia : 'Desconocido';
  };

  const handleEditClick = (evaluacion) => {
    setEditEval(evaluacion);
    setFormValues(evaluacion);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEnlaceChange = (e) => {
    setEnlace(e.target.value);
  };

  const handleUpdateEvaluacion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/evaluaciones/${editEval.id_evaluacion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });
      if (!res.ok) throw new Error('No autorizado');
      const updatedEvaluation = await res.json();
      console.log('Evaluación actualizada:', updatedEvaluation);
      setEditEval(null);
      setFormValues({
        id_materia: '',
        fecha_limite: '',
        porcentaje_calificacion: '',
        descripcion: '',
        calificacion: '',
        estado: 'pendiente',
        enlace: ''
      });
      fetchEvaluaciones();
      setShowModal(false);
    } catch (error) {
      console.error('Error al actualizar evaluación:', error);
    }
  };

  const handleSubmitEnlace = async () => {
    if (!enlace) {
      console.error('No enlace proporcionado');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/evaluaciones/${selectedEvalId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ enlace, id_estudiante: userId }),
      });
      if (!res.ok) throw new Error('No autorizado');
      fetchEvaluaciones();
      setShowModal(false);
    } catch (error) {
      console.error('Error al enviar enlace:', error);
    }
  };

  const handleOpenModal = (evaluacionId) => {
    setSelectedEvalId(evaluacionId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditEval(null);
  };  

  const handleExportNotas = async (id_materia) => {
    try {
      const res = await fetch(`${API_URL}/evaluaciones/exportar-notas/${id_materia}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Error al exportar notas');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `notas_materia_${id_materia}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al exportar notas:', error);
    }
  };

  const groupedEvaluaciones = evaluaciones.reduce((acc, evaluacion) => {
    const materiaName = getMateriaName(evaluacion.id_materia);
    if (!acc[materiaName]) {
      acc[materiaName] = [];
    }
    acc[materiaName].push(evaluacion);
    return acc;
  }, {});

  return (
    <div className="evaluaciones">
      <button onClick={handleCreateClick}>Crear Evaluacion</button>

{isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleCloserModal}>&times;</span>   

      <CreateEvaluacion
        materias={materias}
        token={token}
        onClose={handleCloserModal} // Função para fechar o modal
      />
    </div>
  </div>
)}
      <div className="evaluaciones-list">
        <h2 className="titulo-evaluaciones">Lista de Evaluaciones</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            {Object.keys(groupedEvaluaciones).length > 0 ? (
              Object.keys(groupedEvaluaciones).map((materiaName) => (
                <div key={materiaName} className="materia-section">
                  <h3>{materiaName}</h3>
                  {(userType === 'administrador') && (
                    <div className="export-notas">
                      <button
                        className="export-button"
                        onClick={() => handleExportNotas(materias.find(m => m.nombre_materia === materiaName).id_materia)}
                      >
                        Exportar Notas
                      </button>
                    </div>
                  )}
                  {groupedEvaluaciones[materiaName].map((evaluacion) => (
                    <div key={evaluacion.id_evaluacion} className="evaluacion-card">
                      <div className="card-details">
                        <h4>{evaluacion.descripcion}</h4>
                        <p>
                          <strong>Fecha Límite:</strong> {evaluacion.fecha_limite}
                        </p>
                        <p>
                          <strong>Porcentaje Calificación:</strong>{' '}
                          {evaluacion.porcentaje_calificacion}%
                        </p>
                        <p>
                          <strong>Calificación:</strong>{' '}
                          {evaluacion.calificacion !== null ? evaluacion.calificacion : 'No asignada'}
                        </p>
                        <p>
                          <strong>Estado:</strong> {evaluacion.estado}
                        </p>
                        {userType === 'estudiante' && evaluacion.estado === 'pendiente' && (
                          <div className="upload-button-container">
                            <button className="upload-button" onClick={() => handleOpenModal(evaluacion.id_evaluacion)}>
                              Adjuntar Enlace
                            </button>
                          </div>
                        )}
                        {(userType === 'administrador' || userType === 'profesor') && (
                          <div className="edit-button-container">
                            <button className="edit-button" onClick={() => handleEditClick(evaluacion)}>Editar</button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="no-evaluaciones">
                <p>No hay evaluaciones registradas.</p>
              </div>
            )}
          </>
        )}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            {editEval ? (
              <div className="edit-form">
                <h2>Editar Evaluación</h2>
                <form onSubmit={handleUpdateEvaluacion}>
                  <label htmlFor="id_materia">Materia:</label>
                  <select
                    id="id_materia"
                    name="id_materia"
                    value={formValues.id_materia}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona una materia</option>
                    {materias.map((materia) => (
                      <option key={materia.id_materia} value={materia.id_materia}>
                        {materia.nombre_materia}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="fecha_limite">Fecha Límite:</label>
                  <input
                    type="date"
                    id="fecha_limite"
                    name="fecha_limite"
                    value={formValues.fecha_limite}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="porcentaje_calificacion">Porcentaje Calificación:</label>
                  <input
                    type="number"
                    id="porcentaje_calificacion"
                    name="porcentaje_calificacion"
                    value={formValues.porcentaje_calificacion}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="descripcion">Descripción:</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={formValues.descripcion}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="calificacion">Calificación:</label>
                  <input
                    type="number"
                    id="calificacion"
                    name="calificacion"
                    value={formValues.calificacion}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="estado">Estado:</label>
                  <select
                    id="estado"
                    name="estado"
                    value={formValues.estado}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="completado">Completado</option>
                  </select>
                  <button type="submit">Actualizar</button>
                </form>
              </div>
            ) : (
              <div className="upload-form">
                <h2>Adjuntar Enlace de Evaluación</h2>
                <input
                  type="text"
                  value={enlace}
                  onChange={handleEnlaceChange}
                  placeholder="Ingrese el enlace de la evaluación"
                />
                <button onClick={handleSubmitEnlace}>Enviar</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListadoEvaluaciones;

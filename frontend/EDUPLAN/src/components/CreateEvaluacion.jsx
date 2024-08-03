import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


const CreateEvaluacion = ({ materias, token, fetchEvaluaciones }) => {

    
    localStorage.setItem('token', token);
    
  const [formData, setFormData] = useState({
    id_materia: '',
    fecha_limite: '',
    porcentaje_calificacion: '',
    descripcion: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();   


    try {
      const response = await fetch('http://localhost:3000/api/evaluaciones/agg',   
 {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la evaluación');
      }

      // Actualizar la lista de evaluaciones
      fetchEvaluaciones();
      setFormData({
        id_materia: '',
        fecha_limite: '',
        porcentaje_calificacion: '',
        descripcion: '',
      });
    } catch (error) {
      console.error('Error:', error);
      // Mostrar un mensaje de error al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="id_materia">Materia:</label>
      <select
        id="id_materia"
        name="id_materia"
        value={formData.id_materia}
        onChange={handleChange}
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
        value={formData.fecha_limite}
        onChange={handleChange}
        required
      />

      <label htmlFor="porcentaje_calificacion">Porcentaje de Calificación:</label>
      <input
        type="number"
        id="porcentaje_calificacion"
        name="porcentaje_calificacion"
        value={formData.porcentaje_calificacion}
        onChange={handleChange}
        required
        min="0"
        max="100"
      />

      <label htmlFor="descripcion">Descripción:</label>
      <textarea
        id="descripcion"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}   

        required
      ></textarea>

      <button type="submit">Crear Evaluación</button>
    </form>
  );
};

export default CreateEvaluacion;
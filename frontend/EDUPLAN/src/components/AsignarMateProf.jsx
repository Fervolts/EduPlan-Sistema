import { useState, useEffect } from 'react';
import './styles/Registros.css';

const AsignarMateriasProfesor = () => {
  const [materias, setMaterias] = useState([]);
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [profesorId, setProfesorId] = useState('');

  // Obtener el ID del profesor del localStorage
  useEffect(() => {
    const id = localStorage.getItem('userId');
    setProfesorId(id);
  }, []);

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

  const handleChange = (e) => {
    const { value, checked } = e.target;
    setMateriasSeleccionadas(prevState => {
      const selected = new Set(prevState);
      if (checked) {
        selected.add(value);
      } else {
        selected.delete(value);
      }
      return Array.from(selected);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (materiasSeleccionadas.length > 5) {
      setMensaje('No puedes seleccionar más de 5 materias.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/profesor/${profesorId}/materias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ materias: materiasSeleccionadas }),
      });
      if (!response.ok) {
        throw new Error('Error al asignar materias');
      }
      setMensaje('Materias asignadas correctamente.');
    } catch (error) {
      setMensaje('Error al asignar materias.');
      console.error('Error al asignar materias:', error);
    }
  };

  return (
    <div className="Base">
    <div className="asignar-materias-container">
      <h2 className="asignar-materias-title">Asignar Materias al Profesor</h2>
      <form onSubmit={handleSubmit} className="asignar-materias-form">
        <div className="materias-list">
          {materias.length === 0 ? (
            <p>Cargando materias...</p>
          ) : (
            materias.map(materia => (
              <div key={materia.id_materia} className="materia-item">
                <input
                  type="checkbox"
                  id={`materia-${materia.id_materia}`} //Error estaba acá
                  value={materia.id_materia} 
                  onChange={handleChange}
                  className="input-checkbox"
                  disabled={materiasSeleccionadas.length >= 5 && !materiasSeleccionadas.includes(materia.id)}
                />
                <label htmlFor={`materia-${materia.id_materia}`} className="materia-label">{materia.nombre_materia}</label>
              </div>
            ))
          )}
        </div>
        <button type="submit" className="submit-button">Asignar Materias</button>
      </form>
      {mensaje && <p className="message">{mensaje}</p>}
    </div>
    </div>
  );
};

export default AsignarMateriasProfesor;

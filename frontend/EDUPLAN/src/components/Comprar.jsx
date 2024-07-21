import React, { useState, useEffect } from 'react';
import './styles/Comprar.css';
import Video1 from '../assets/CArrito.mp4';
const Comprar = () => {
  const [modelos, setModelos] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: localStorage.getItem('username') || '',
    apellido: '',
    correo: '',
    modelo: '',
    estado: 'En espera',
    enviado: false, 
  });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/modelos')
      .then(response => response.json())
      .then(data => setModelos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleChange = (event) => {
    setFormulario({
      ...formulario,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let errores = {};

    // Validar los campos aquí
    if (!formulario.nombre.trim()) {
      errores.nombre = "El campo nombre es obligatorio";
    }
    if (!formulario.apellido.trim()) {
      errores.apellido = "El campo apellido es obligatorio";
    }
    if (!formulario.correo.trim()) {
      errores.correo = "El campo correo es obligatorio";
    }

    setErrores(errores);

    if (Object.keys(errores).length === 0) {
      fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setFormulario({ ...formulario, enviado: true }); 
        setTimeout(() => window.location.reload(), 2000); // Agregado
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <div className="tarjeta">

            <video autoPlay loop muted className='video1'>
                <source src={Video1} type="video/mp4" />
            </video>
      <form className="formulario" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={formulario.nombre} readOnly />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
        </label>
        <label>
          Apellido:
          <input type="text" name="apellido" onChange={handleChange} />
          {errores.apellido && <p className="error">{errores.apellido}</p>}
        </label>
        <label>
          Correo:
          <input type="email" name="correo" onChange={handleChange} />
          {errores.correo && <p className="error">{errores.correo}</p>}
        </label>
        <label>
          Modelo a comprar:
          <select name="modelo" onChange={handleChange}>
            {modelos.map((modelo, index) => (
              <option key={index} value={modelo.id}>
                {modelo.Modelo}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Comprar</button>
      </form>
      {formulario.enviado && <p className="mensaje-exito">Formulario enviado correctamente!</p>} {/* Agregado */}
    </div>
  );
};

export default Comprar;

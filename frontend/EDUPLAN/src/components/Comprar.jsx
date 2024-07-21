import React, { useState } from 'react';
import './styles/Comprar.css';
import Video1 from '../assets/Video.mp4';

const Comprar = () => {
  const [formulario, setFormulario] = useState({
    nombres: localStorage.getItem('username') || '',
    apellidos: '',
    correo_electronico: '',
    documento_identidad: '',
    numero_telefono: '',
    usuario: '',
    contrasena: '',
    estado: 'En espera',
    enviado: false, 
  });
  const [errores, setErrores] = useState({});

  const handleChange = (event) => {
    setFormulario({
      ...formulario,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let errores = {};

    if (!formulario.nombres.trim()) {
      errores.nombres = "El campo nombres es obligatorio";
    }
    if (!formulario.apellidos.trim()) {
      errores.apellidos = "El campo apellidos es obligatorio";
    }
    if (!formulario.correo_electronico.trim()) {
      errores.correo_electronico = "El campo correo electronico es obligatorio";
    }

    setErrores(errores);

    fetch('http://localhost:3000/api/register/estudiante', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setFormulario({ ...formulario, enviado: true });
      setTimeout(() => window.location.reload(), 2000);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="card">
      <video autoPlay loop muted className="video">
        <source src={Video1} type="video/mp4" />
      </video>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Nombres:
          <input type="text" name="nombres" value={formulario.nombres} onChange={handleChange} className="input" />
          {errores.nombres && <p className="error">{errores.nombres}</p>}
        </label>
        <label className="label">
          Apellido:
          <input type="text" name="apellidos" value={formulario.apellidos} onChange={handleChange} className="input" />
          {errores.apellidos && <p className="error">{errores.apellidos}</p>}
        </label>
        <label className="label">
          Correo electrónico:
          <input type="email" name="correo_electronico" value={formulario.correo_electronico} onChange={handleChange} className="input" />
          {errores.correo_electronico && <p className="error">{errores.correo_electronico}</p>}
        </label>
        <label className="label">
          Documento Identidad:
          <input type="text" name="documento_identidad" value={formulario.documento_identidad} onChange={handleChange} className="input" />
          {errores.documento_identidad && <p className="error">{errores.documento_identidad}</p>}
        </label>
        <label className="label">
          Número teléfono:
          <input type="text" name="numero_telefono" value={formulario.numero_telefono} onChange={handleChange} className="input" />
          {errores.numero_telefono && <p className="error">{errores.numero_telefono}</p>}
        </label>
        <label className="label">
          Usuario:
          <input type="text" name="usuario" value={formulario.usuario} onChange={handleChange} className="input" />
          {errores.usuario && <p className="error">{errores.usuario}</p>}
        </label>
        <label className="label">
          Contraseña:
          <input type="password" name="contrasena" value={formulario.contrasena} onChange={handleChange} className="input" />
          {errores.contrasena && <p className="error">{errores.contrasena}</p>}
        </label>
        <button type="submit" className="button">Comprar</button>
      </form>
      {formulario.enviado && <p className="success-message">Formulario enviado correctamente!</p>}
    </div>
  );
};

export default Comprar;

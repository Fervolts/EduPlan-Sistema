import React, { useState } from 'react';
import './styles/Registros.css';
import Video1 from '../assets/Video.mp4';

const RegistroEstudiante = () => {
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
      errores.correo_electronico = "El campo correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formulario.correo_electronico)) {
      errores.correo_electronico = "Correo electrónico inválido";
    }
    // Agregar otras validaciones según sea necesario
    
    setErrores(errores);

    if (Object.keys(errores).length === 0) {
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
    }
  };

  return (
    <div className='login-container'>
      <div className="card">
        <form className="form formEst" onSubmit={handleSubmit} data-testid="registro-form">
          <video autoPlay loop muted className="video">
            <source src={Video1} type="video/mp4" />
          </video>
          <label className="label">
            Nombres:
            <input
              type="text"
              name="nombres"
              value={formulario.nombres}
              onChange={handleChange}
              className="input"
              data-testid="input-nombres"
            />
            {errores.nombres && <p className="error" data-testid="error-nombres">{errores.nombres}</p>}
          </label>
          <label className="label">
            Apellido:
            <input
              type="text"
              name="apellidos"
              value={formulario.apellidos}
              onChange={handleChange}
              className="input"
              data-testid="input-apellidos"
            />
            {errores.apellidos && <p className="error" data-testid="error-apellidos">{errores.apellidos}</p>}
          </label>
          <label className="label">
            Correo electrónico:
            <input
              type="email"
              name="correo_electronico"
              value={formulario.correo_electronico}
              onChange={handleChange}
              className="input"
              data-testid="input-correo-electronico"
            />
            {errores.correo_electronico && <p className="error" data-testid="error-correo-electronico">{errores.correo_electronico}</p>}
          </label>
          <label className="label">
            Documento Identidad:
            <input
              type="text"
              name="documento_identidad"
              value={formulario.documento_identidad}
              onChange={handleChange}
              className="input"
              data-testid="input-documento-identidad"
            />
            {errores.documento_identidad && <p className="error" data-testid="error-documento-identidad">{errores.documento_identidad}</p>}
          </label>
          <label className="label">
            Número teléfono:
            <input
              type="text"
              name="numero_telefono"
              value={formulario.numero_telefono}
              onChange={handleChange}
              className="input"
              data-testid="input-numero-telefono"
            />
            {errores.numero_telefono && <p className="error" data-testid="error-numero-telefono">{errores.numero_telefono}</p>}
          </label>
          <label className="label">
            Usuario:
            <input
              type="text"
              name="usuario"
              value={formulario.usuario}
              onChange={handleChange}
              className="input"
              data-testid="input-usuario"
            />
            {errores.usuario && <p className="error" data-testid="error-usuario">{errores.usuario}</p>}
          </label>
          <label className="label">
            Contraseña:
            <input
              type="password"
              name="contrasena"
              value={formulario.contrasena}
              onChange={handleChange}
              className="input"
              data-testid="input-contrasena"
            />
            {errores.contrasena && <p className="error" data-testid="error-contrasena">{errores.contrasena}</p>}
          </label>
          <button type="submit" className="button" data-testid="submit-button">Registrar</button>
        </form>
        {formulario.enviado && <p className="success-message" data-testid="success-message">Formulario enviado correctamente!</p>}
      </div>
    </div>
  );
};

export default RegistroEstudiante;

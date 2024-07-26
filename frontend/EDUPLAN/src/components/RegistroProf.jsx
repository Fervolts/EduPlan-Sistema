import React, { useState } from 'react';

const RegistrarProfesor = () => {
  const [formulario, setFormulario] = useState({
    nombres: '',
    apellidos: '',
    correo_electronico: '',
    usuario: '',
    contrasena: ''
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const handleChange = (event) => {
    setFormulario({
      ...formulario,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrores({});
    setMensaje('');

    let errores = {};

    // Validaciones
    if (!formulario.nombres.trim()) {
      errores.nombres = "El campo nombres es obligatorio";
    }
    if (!formulario.apellidos.trim()) {
      errores.apellidos = "El campo apellidos es obligatorio";
    }
    if (!formulario.correo_electronico.trim()) {
      errores.correo_electronico = "El campo correo electrónico es obligatorio";
    }
    if (!formulario.usuario.trim()) {
      errores.usuario = "El campo usuario es obligatorio";
    }
    if (!formulario.contrasena.trim()) {
      errores.contrasena = "El campo contraseña es obligatorio";
    } else if (formulario.contrasena.length < 6) {
      errores.contrasena = "La contraseña debe tener al menos 6 caracteres";
    }

    setErrores(errores);

    if (Object.keys(errores).length > 0) {
      return;
    }

    fetch('http://localhost:3000/api/register/profesor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulario),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(error => {
          throw new Error(error.error || 'Error en la solicitud');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setMensaje('Profesor registrado exitosamente');
      setFormulario({ nombres: '', apellidos: '', correo_electronico: '', usuario: '', contrasena: '' });
    })
    .catch((error) => {
      console.error('Error:', error);
      setMensaje('Error al registrar profesor');
    });
  };

  return (
    <div className='login-container'>
    <div className="card">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Nombres:
          <input type="text" name="nombres" value={formulario.nombres} onChange={handleChange} className="input" />
          {errores.nombres && <p className="error">{errores.nombres}</p>}
        </label>
        <label className="label">
          Apellidos:
          <input type="text" name="apellidos" value={formulario.apellidos} onChange={handleChange} className="input" />
          {errores.apellidos && <p className="error">{errores.apellidos}</p>}
        </label>
        <label className="label">
          Correo Electrónico:
          <input type="email" name="correo_electronico" value={formulario.correo_electronico} onChange={handleChange} className="input" />
          {errores.correo_electronico && <p className="error">{errores.correo_electronico}</p>}
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
        <button type="submit" className="button">Registrar</button>
      </form>
      {mensaje && <p className="success-message">{mensaje}</p>}
    </div>
    </div>
  );
};

export default RegistrarProfesor;

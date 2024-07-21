import React, { useState } from 'react';

const RegistrarAdmin = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
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
    if (!formulario.nombre.trim()) {
      errores.nombre = "El campo nombre es obligatorio";
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

    // Enviar solicitud
    fetch('http://localhost:3000/api/register/administrador', {
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
      setMensaje('Administrador registrado exitosamente');
      setFormulario({ nombre: '', usuario: '', contrasena: '' });
    })
    .catch((error) => {
      console.error('Error:', error);
      setMensaje('Error al registrar administrador');
    });
  };

  return (
    <div className="card">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Nombre:
          <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} className="input" />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
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
  );
};

export default RegistrarAdmin;

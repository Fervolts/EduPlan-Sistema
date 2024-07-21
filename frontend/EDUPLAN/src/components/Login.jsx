import React, { useState } from 'react';

const Login = () => {
  const [formulario, setFormulario] = useState({
    usuario: '',
    contrasena: '',
    tipoUsuario: 'estudiante' // Valor por defecto
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
    if (!formulario.usuario.trim()) {
      errores.usuario = "El campo usuario es obligatorio";
    }
    if (!formulario.contrasena.trim()) {
      errores.contrasena = "El campo contraseña es obligatorio";
    }

    setErrores(errores);

    if (Object.keys(errores).length === 0) {
      // Determina la ruta según el tipo de usuario
      const ruta = `http://localhost:3000/api/login/${formulario.tipoUsuario}`;

      fetch(ruta, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: formulario.usuario,
          contrasena: formulario.contrasena
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        // Aquí podrías guardar el token en localStorage o en un estado global
        setMensaje('Login exitoso');
        setFormulario({ usuario: '', contrasena: '', tipoUsuario: 'estudiante' });
      })
      .catch((error) => {
        console.error('Error:', error);
        setMensaje('Error al iniciar sesión');
      });
    }
  };

  return (
    <div className="card">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Tipo de Usuario:
          <select name="tipoUsuario" value={formulario.tipoUsuario} onChange={handleChange} className="input">
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
            <option value="administrador">Administrador</option>
          </select>
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
        <button type="submit" className="button">Iniciar Sesión</button>
      </form>
      {mensaje && <p className="success-message">{mensaje}</p>}
    </div>
  );
};

export default Login;

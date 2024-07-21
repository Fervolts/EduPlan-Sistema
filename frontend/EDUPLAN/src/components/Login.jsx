import  { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formulario, setFormulario] = useState({
    usuario: '',
    contrasena: '',
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (event) => {
    setFormulario({
      ...formulario,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrores({});
    setMensaje('');

    let errores = {};

    if (!formulario.usuario.trim()) {
      errores.usuario = "El campo usuario es obligatorio";
    }
    if (!formulario.contrasena.trim()) {
      errores.contrasena = "El campo contraseña es obligatorio";
    }

    setErrores(errores);

    if (Object.keys(errores).length === 0) {
      const rutas = [
        { tipo: 'estudiante', url: `http://localhost:3000/api/login/estudiante` },
        { tipo: 'profesor', url: `http://localhost:3000/api/login/profesor` },
        { tipo: 'administrador', url: `http://localhost:3000/api/login/administrador` }
      ];

      try {
        let data;
        let token;
        let tipoUsuario;

        for (let ruta of rutas) {
          const response = await fetch(ruta.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              usuario: formulario.usuario,
              contrasena: formulario.contrasena
            }),
          });

          if (response.ok) {
            data = await response.json();
            token = data.token;
            tipoUsuario = ruta.tipo; // Asignar tipoUsuario basado en la ruta exitosa
            break; // Salir del bucle si una respuesta es exitosa
          }
        }

        if (!token) {
          throw new Error('Las credenciales no son válidas para ningún tipo de usuario.');
        }

        login(token, tipoUsuario); // Llamar a la función de login del contexto

        console.log('Usuario:', formulario.usuario);
        console.log('Token:', token);
        console.log('Tipo de Usuario:', tipoUsuario);
        console.log('Login exitoso para el usuario:', formulario.usuario);

        navigate('/');

        setMensaje('Login exitoso');
        setFormulario({ usuario: '', contrasena: '' });
      } catch (error) {
        console.error('Error:', error);
        setMensaje('Error al iniciar sesión');
      }
    }
  };

  return (
    <div className="card">
      <form className="form" onSubmit={handleSubmit}>
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

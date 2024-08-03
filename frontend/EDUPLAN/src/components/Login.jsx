import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Modal from './Modals/Modal'; 
import './styles/Login.css';

const Login = () => {
  const [formulario, setFormulario] = useState({
    usuario: '',
    contrasena: '',
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (event) => {
    setFormulario({
      ...formulario,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrores({});
    setMensaje('');
  
    let errores = {};
  
    if (!formulario.usuario.trim()) {
      errores.usuario = 'El campo usuario es obligatorio';
    }
    if (!formulario.contrasena.trim()) {
      errores.contrasena = 'El campo contraseña es obligatorio';
    }
  
    setErrores(errores);
  
    if (Object.keys(errores).length === 0) {
      const rutas = [
        { tipo: 'estudiante', url: `http://localhost:3000/api/login/estudiante` },
        { tipo: 'profesor', url: `http://localhost:3000/api/login/profesor` },
        { tipo: 'administrador', url: `http://localhost:3000/api/login/administrador` },
      ];
  
      try {
        let data;
        let token;
        let tipoUsuario;
        let userId; // Variable para almacenar el userId
  
        for (let ruta of rutas) {
          const response = await fetch(ruta.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              usuario: formulario.usuario,
              contrasena: formulario.contrasena,
            }),
          });
  
          if (response.ok) {
            data = await response.json();
            token = data.token;
            userId = data.userId; // Extraer el userId de la respuesta
            tipoUsuario = ruta.tipo;
            break;
          }
        }
  
        if (!token) {
          throw new Error('Las credenciales no son válidas para ningún tipo de usuario.');
        }
  
        login(token, tipoUsuario, userId); // Pasar userId a la función de login
  
        setModalContent({
          title: 'Inicio de sesión exitoso',
          message: '¡Has iniciado sesión exitosamente!',
        });
        setModalOpen(true);
  
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirigir después de 2 segundos
  
        setMensaje('Login exitoso');
        setFormulario({ usuario: '', contrasena: '' });
      } catch (error) {
        console.error('Error:', error);
        setModalContent({
          title: 'Error',
          message: 'Error al iniciar sesión. Por favor, intenta nuevamente.',
        });
        setModalOpen(true);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h2 className="titleLogin">Inicio de Sesión</h2>
        <form className="form" onSubmit={handleSubmit} data-testid="login-form">
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
          <button type="submit" className="button" data-testid="submit-button">
            Iniciar Sesión
          </button>
        </form>
        {mensaje && <p className="success-message" data-testid="success-message">{mensaje}</p>}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
        data-testid="modal"
      />
    </div>
  );
};

export default Login;

import { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import "./styles/Navb.css";
import { Navigate } from "react-router-dom";
const LogoutButton = ({ pathname }) => {
  const { isLoggedIn, userType, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    isLoggedIn ? 
    <div>

      <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
    </div> :
    <button className={`login-button boxLog ${pathname === '/login' ? 'active' : ''}`} onClick={handleLogin}>Iniciar sesión</button>
  );
};

function Navb() {
  const [navbar, setNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const {userType } = useContext(AuthContext);

  const userRoutes = {
    administrador: [
      { path: '/registroEstudiante', label: 'Registro Estudiante' },
      { path: '/registroProfe', label: 'Registro Profesor' },
      { path: '/listadoEstudiantes', label: 'Listado Estudiantes' },
      { path: '/listadoProf', label: 'Listado Profesores' },
      // Rutas para el administrador
    ],
    profesor: [
      { path: '/evaluaciones', label: 'Evaluaciones' },
      { path: '/listadoEstudiantes', label: 'Listado Estudiantes' },
      // Rutas para el profesor
    ],
    estudiante: [,
      { path: '/evaluaciones', label: 'Evaluaciones' },
      // Rutas para el estudiante
    ],
  };

  const renderLinks = () => {
    const routes = userRoutes[userType];
    if (!routes) return null;

    return routes.map((route) => (
      <a
        key={route.path}
        href={route.path}
        className={`box ${location.pathname === route.path ? 'active' : ''}`}
      >
        {route.label}
      </a>
    ));
  };

  const changeBackground = () => {
    if (window.scrollY >= 800) {
      setNav(true);
    } else {
      setNav(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

return (
    <header className={navbar ? "nav flex" : "header flex"}>
      <h1 className="title">EduPlan</h1>
      <nav className={isOpen ? "nav-open" : "navcito"}>
        <div className="nav-links">
          {renderLinks()}
        </div>
        <div className="cajilla">
          <LogoutButton pathname={location.pathname} />
          <button
            className="nav-btn nav-close-btn"
            onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>   
        </div>
      </nav>
      <button
        className="nav-btn"
        onClick={() => setIsOpen(true)}>
        <FaBars />
      </button>
    </header>
  );
};

export default Navb;

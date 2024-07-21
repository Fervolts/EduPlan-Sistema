import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import "./styles/Navb.css";

const LogoutButton = ({ pathname }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    if (token) {
      setIsLoggedIn(true);
      setUserType(tipoUsuario);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    setIsLoggedIn(false);
    setUserType(null);
    window.location.reload();
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    isLoggedIn ? 
    <div>
      {userType === 'administrador' && <a href="/admin" className="nav-link">Admin Dashboard</a>}
      {userType === 'profesor' && <a href="/profesor" className="nav-link">Profesor Dashboard</a>}
      {userType === 'estudiante' && <a href="/estudiante" className="nav-link">Estudiante Dashboard</a>}
      <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>
    </div> :
    <button className={`login-button boxLog ${pathname === '/login' ? 'active' : ''}`} onClick={handleLogin}>Iniciar sesión</button>
  );
};

function Navb() {
  const [navbar, setNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
          <a href="/" className={`box ${location.pathname === '/' ? 'active' : ''}`}>Inicio</a>
          <a href="/Modelos" className={`box ${location.pathname === '/Modelos' ? 'active' : ''}`}>Ve nuestro catalogo</a>
          <a href="/comprar" className={`box ${location.pathname === '/comprar' ? 'active' : ''}`}>Formulario de Compra</a> 
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

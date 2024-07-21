import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import "./styles/Navb.css";

const LogoutButton = ({ pathname }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('tipoUsuario');
        if (token) {
            setIsLoggedIn(true);
            setUserType(user);
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
            {userType === 'administrador' && <a href="/rutaAdmin1" className="nav-link">Ruta Admin 1</a>}

            {userType === 'profesor' && <a href="/rutaProfesor1" className="nav-link">Ruta Profesor 1</a>}

            {userType === 'estudiante' && <a href="/rutaEstudiante1" className="nav-link">Ruta Estudiante 1</a>}

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
                <a href="/registroEstudiante" className={`box ${location.pathname === '/registroEstudiante' ? 'active' : ''}`}>Registro Estudiante</a>
                <a href="/registroProfe" className={`box ${location.pathname === '/registroProfe' ? 'active' : ''}`}>Registro Profesor</a>
                <a href="/registroAdmin" className={`box ${location.pathname === '/registroAdmin' ? 'active' : ''}`}>Registro Admin</a>
                <a href="/listadoEstudiantes" className={`box ${location.pathname === '/listadoEstudiantes' ? 'active' : ''}`}>Listados de Estudiantes</a>
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

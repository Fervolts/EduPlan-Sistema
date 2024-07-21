import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import "./styles/Navb.css";

const LogoutButton = ({ pathname }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('sessionToken');
        const user = localStorage.getItem('user');
        if (token) {
            setIsLoggedIn(true);
            setUserType(user);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('sessionToken');
        localStorage.removeItem('user');
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
            {userType === 'adm' && <a href="/pedidos" className="nav-link">Pedidos</a>}
            {userType === '' && <a href="/mispedidos" className="nav-link">Mis Pedidos</a>}
            <button className="nav-link logout-button" onClick={handleLogout}>Cerrar sesión</button>
        </div> :
        <button className={`nav-link login-button ${pathname === '/login' ? 'active' : ''}`} onClick={handleLogin}>Iniciar sesión</button>
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
            <h1 className="title">Cars in Stock</h1>
            <nav className={isOpen ? "nav-open" : ""}>
                <a href="/" className={`box ${location.pathname === '/' ? 'active' : ''}`}>Inicio</a>
                <a href="/Modelos" className={`box ${location.pathname === '/Modelos' ? 'active' : ''}`}>Ve nuestro catalogo</a>
                <a href="/comprar" className={`box ${location.pathname === '/comprar' ? 'active' : ''}`}>Formulario de Compra</a>
                <LogoutButton className="box" pathname={location.pathname} />
                <button
                    className="nav-btn nav-close-btn"
                    onClick={() => setIsOpen(false)}>
                    <FaTimes />
                </button>    
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

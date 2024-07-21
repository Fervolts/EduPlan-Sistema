import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const [confirmation, setConfirmation] = useState(null);

    const handleChange = event => {
        const result = event.target.value.replace(/[^a-z]/gi, '');
    
        setUsername(result);}

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('sessionToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    
    const handleLogin = async (event) => {
        event.preventDefault();
    
        if (!username || !password) {
            setError('Por favor, rellena todos los campos.');
            return;
        }
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
    
        try {
            const response = await fetch('http://localhost:3000/login', requestOptions);
            const data = await response.json();
    
            if (data.success) {
                console.log(data); 
                localStorage.setItem('sessionToken', data.token);
                localStorage.setItem('username', data.username); // Guarda el nombre de usuario
                localStorage.setItem('user', data.user); // Guarda el valor 'user'
                setIsLoggedIn(true);
                setConfirmation('Inicio de sesión exitoso!'); // Mueve esta línea aquí
                setTimeout(() => {
                    setConfirmation(null); // Limpia el mensaje de confirmación después de 2 segundos
                    navigate('/'); // Luego redirige a la página de inicio
                }, 2000);

                    
            }
             else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error); 
            setError('Error del servidor');
        }
    };
    

    const handleRegister = () => {
        navigate('/register');
    };

    if (isLoggedIn) {
        return <p className="_login-message">Ya estás logeado.</p>;
    }

    return (
        <div>
       

            <div className="_login-container">
                <h2 className="_login-title">Iniciar sesión</h2>
                <form onSubmit={handleLogin} className="_login-form">
                    <input type="text" value={username} onChange={e => {setUsername(e.target.value) ; handleChange(e)}} placeholder="Usuario" className="_login-input" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" className="_login-input" />
                    <input type="submit" value="Iniciar sesión" className="_login-submit" />
                    <input type="button" className="registro" onClick={handleRegister} value="Registrarse" />
                    {error && <p className="_login-error">{error}</p>}
                    {confirmation && <div className="confirmation">{confirmation}</div>} {/* Muestra el mensaje de confirmación */}

                </form>
            </div>
        </div>
    );
};
export default Login;

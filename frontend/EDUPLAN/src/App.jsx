import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio.jsx';
import Login from './components/Login.jsx';
import Navb from './components/Navbar.jsx';
import Modelos from './components/Modelos.jsx';
import Register from './components/Register.jsx';
import ResgistroEstudiante from './components/ResgistroEstudiante.jsx';
import ListadoEstudiantes from './components/ListadoEstudiantes.jsx';
import ListadoProf from './components/ListadoProf.jsx';
import Pedidos from './components/Pedidos.jsx';
import RegisAdmin from './components/RegistroAdmin.jsx'
import RegisProf from './components/RegistroProf.jsx'
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navb />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path= "/Modelos" element={<Modelos />} />
        <Route path= "/register" element={<Register />} />
        <Route path= "/registroEstudiante" element={<ResgistroEstudiante />} />
        <Route path= "/registroAdmin" element={<RegisAdmin />} />
        <Route path= "/registroProfe" element={<RegisProf />} />
        <Route path= "/listadoEstudiantes" element={<ListadoEstudiantes />} />
        <Route path= "/ListadoProf" element={<ListadoProf />} />
        <Route path= "/pedidos" element={<Pedidos />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;

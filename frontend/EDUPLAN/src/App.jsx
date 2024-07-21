import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio.jsx';
import Login from './components/Login.jsx';
import Navb from './components/Navbar.jsx';
import Modelos from './components/Modelos.jsx';
import Register from './components/Register.jsx';
import ResgistroEstudiante from './components/ResgistroEstudiante.jsx';
import Pedidos from './components/Pedidos.jsx';
import MisPedidos from './components/MisPedidos.jsx';
import RegisAdmin from './components/RegistroAdmin.jsx'
import RegisProf from './components/RegistroProf.jsx'

function App() {
  return (
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
        <Route path= "/pedidos" element={<Pedidos />} />
        <Route path= "/mispedidos" element={<MisPedidos />} />
      </Routes>
    </Router>
  );
}

export default App;

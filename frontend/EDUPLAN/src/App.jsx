import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio.jsx';
import Login from './components/Login.jsx';
import Navb from './components/Navbar.jsx';
import Modelos from './components/Modelos.jsx';
import Register from './components/Register.jsx';
import Comprar from './components/Comprar.jsx';
import Pedidos from './components/Pedidos.jsx';
import MisPedidos from './components/MisPedidos.jsx';

function App() {
  return (
    <Router>
      <Navb />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path= "/Modelos" element={<Modelos />} />
        <Route path= "/register" element={<Register />} />
        <Route path= "/comprar" element={<Comprar />} />
        <Route path= "/pedidos" element={<Pedidos />} />
        <Route path= "/mispedidos" element={<MisPedidos />} />
      </Routes>
    </Router>
  );
}

export default App;

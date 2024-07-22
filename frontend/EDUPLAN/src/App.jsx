import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio.jsx';
import Login from './components/Login.jsx';
import Navb from './components/Navbar.jsx';
import Evaluaciones from './components/Evaluaciones.jsx';
import ResgistroEstudiante from './components/ResgistroEstudiante.jsx';
import ListadoEstudiantes from './components/ListadoEstudiantes.jsx';
import ListadoProf from './components/ListadoProf.jsx';
import RegisAdmin from './components/RegistroAdmin.jsx';
import RegisProf from './components/RegistroProf.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { SortedRoute, SortedRouteAdmin, SortedRouteProf, SortedRouteUsers, SortedRouteAdminOrProf } from './context/SortedRoute.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navb />
        <Routes>
          <Route path="/" element={<Inicio />} />

          <Route path="/login" element={
            <SortedRoute>
              <Login />
            </SortedRoute>
          } />

          <Route path="/evaluaciones" element={
            <SortedRouteUsers>
              <Evaluaciones />
            </SortedRouteUsers>
          }/>

          <Route path="/registroEstudiante" element={
            
            <SortedRouteAdmin>
            <ResgistroEstudiante />
            </SortedRouteAdmin>
            
            } />

          <Route path="/registroAdmin" element={
            <SortedRouteAdmin>
              <RegisAdmin />
            </SortedRouteAdmin>
          } />

          <Route path="/registroProfe" element={
            <SortedRouteAdmin>
              <RegisProf />
            </SortedRouteAdmin>
          } />

          <Route path="/listadoEstudiantes" element={
            <SortedRouteAdminOrProf>
              <ListadoEstudiantes />
            </SortedRouteAdminOrProf>
          } />

          <Route path="/listadoProf" element={
            <SortedRouteAdmin> 
              <ListadoProf />
            </SortedRouteAdmin> 
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

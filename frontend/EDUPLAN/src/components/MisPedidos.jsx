import React, { useState, useEffect } from 'react';
import './styles/Pedidos.css'

function MisPedidos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/pedidos')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const nombreLocalStorage = localStorage.getItem('username');

  const item = data.find(item => item.Nombre === nombreLocalStorage);
  return (
    <div className="pedidos">
   
      {item && (
        <div key={item.id} className="card">
          <h2>{item.Nombre} {item.Apellido}</h2>
          <p className='correo'>{item.Correo}</p>
          <p>{item.Carro}</p>
          <p>{item.Estado}</p>
        </div>
      )}
    </div>
  );
}

export default MisPedidos;

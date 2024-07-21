import React, { useState, useEffect } from 'react';
import './styles/Pedidos.css'
function Pedidos() {
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/pedidos')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const handleEdit = (id) => {
    const pedido = data.find(item => item.id === id);
    setEditData({ ...pedido });
  };
  
  const handleSave = (id) => {
    fetch('http://localhost:3000/pedidos/' + id, { 
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editData),
      credentials: 'include'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newData = data.map(item => item.id === id ? editData : item);
      setData(newData);
      setEditData({});
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  };
  
  

  return (
    <div className="pedidos">
      {data.map((item) => (
        <div key={item.id} className="card">
          <h2>{item.Nombre} {item.Apellido}</h2>
          <p>{item.Correo}</p>
          <p>{item.Carro}</p>
          {editData.id === item.id ? (
            <select value={editData.Estado} onChange={(e) => setEditData({ ...editData, Estado: e.target.value })}>
              <option value="En espera">En espera</option>
              <option value="Entregado">Entregado</option>
            </select>
          ) : (
            <p>{item.Estado}</p>
          )}
          {editData.id === item.id ? (
            <button onClick={() => handleSave(item.id)}>Guardar</button>
          ) : (
            <button onClick={() => handleEdit(item.id)}>Editar</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Pedidos;

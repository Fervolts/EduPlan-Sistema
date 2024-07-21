import React, { useEffect, useState } from 'react';
import '../components/styles/Modelos.css';

function Modelos() {
  const [modelos, setModelos] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/modelos')
      .then(response => response.json())
      .then(data => setModelos(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className='wrapper'>
      <div className='Head'>
        <div className='Back'></div>
        <div className="Car"></div>
        <div className="Car2"></div>
        <h1 className='titulo'>Autos en Venta</h1>
      </div>
      <div className='Modeloscard'>
        <div className='content'>
          <h1>Modelos</h1>
          {modelos ? (
            <div className='flex'>
              {modelos.map((modelo) => (
                <div key={modelo.id} className='card'>
                  <img src={modelo.Img} alt={modelo.Modelo} />
                  <h3>{modelo.Modelo}</h3>
                  <p>Precio: {modelo.Precio}</p>
                  <p>Fecha: {modelo.Fecha}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Cargando modelos...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modelos;

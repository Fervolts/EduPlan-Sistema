import React, { useEffect, useState } from 'react';
import Video from '../assets/Video.mp4';
import Logo from '../assets/Logo.png';

import '../inicio.css';
function Inicio() {

  return (
    <div>
      <img src={Logo} className="Videoparallax" />
      <div className='section'>
      <h1>Seamos veloces!</h1>
      <p>
        Los autos deportivos son un estilo de vida que se basa en el uso de
        tecnología para mejorar la velocidad, la eficiencia y la seguridad.
      </p>
      </div>
    
      </div>
  );
}

export default Inicio;
import React, { useEffect, useState } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import Logo from '../assets/Logo.png';

import '../inicio.css';
function Inicio() {

  return (
    <div>
      <img src={Logo} className="ImageFondo" />
      <div className = 'Caja'>
       <div className='section'>
      <InstagramEmbed url="https://www.instagram.com/p/C9pwEevxKo3/" width={328} />
      </div> 
      <div className='section2'>
      <h1>Seamos veloces</h1>
      <p>
        Los autos deportivos son un estilo de vida que se basa en el uso de
        tecnología para mejorar la velocidad, la eficiencia y la seguridad.
      </p>
      </div>
      </div>
    
      </div>
  );
}

export default Inicio;
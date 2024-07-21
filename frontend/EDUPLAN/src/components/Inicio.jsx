import React, { useEffect, useState } from 'react';
import { InstagramEmbed } from 'react-social-media-embed';
import Logo from '../assets/Logo.png';
import Camp from '../assets/campaña 12.png'
import '../inicio.css';
function Inicio() {

  return (
    <div className = 'Caja'>
      <img src={Logo} className="ImageFondo" />
      
       <div className='section'>
      <InstagramEmbed url="https://www.instagram.com/p/C9pwEevxKo3/" width={350} />
      </div> 
      <div className='section2'>
      <div className= 'inside'>
      <h1 className='titulito'>Bienvenidos</h1>
      <p className='parrafo'>
        Los autos deportivos son un estilo de vida que se basa en el uso de
        tecnología para mejorar la velocidad, la eficiencia y la seguridad.
      </p>
      </div>
      </div>

      <div className='fotico2'>
      </div>

      </div>
  );
}

export default Inicio;
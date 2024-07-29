import { InstagramEmbed } from 'react-social-media-embed';
import Logo from '../assets/Logo.svg';
import '../inicio.css';
import {FaYoutubeSquare, FaInstagram, FaFacebook} from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import NoticiasList from './Noticia';


function Inicio() {

  return (
    <div className = 'Caja'>
      
      <div className = 'UniLogo'>

        
         <div className = 'upper'>
        <img src={Logo} alt="Logo" className="logo" />
        <div className = 'redes'>
          <h3 className = 'redesT'>¡Siguenos en nuestras redes!</h3>
          <FaYoutubeSquare className = 'icon youtube' onClick={() => window.location.href = "https://www.youtube.com/@univalledelmomboy"}/>
          <FaInstagram className = 'icon insta' onClick={() => window.location.href = "https://instagram.com/univalledelmomboy"}/>
          <FaSquareXTwitter className = 'icon twitter' onClick={() => window.location.href = "https://twitter.com/Univallemomboy"}/>
          <FaFacebook className = 'icon facebook' onClick={() => window.location.href = "https://facebook.com/univalledelmomboy/?locale=es_LA"}/>
        </div>
        </div> 
        <div className= 'downer'>
            
        </div>
      </div>

      <div className='section'>
        <InstagramEmbed url="https://www.instagram.com/p/C9pwEevxKo3/" />
      </div> 

      <div className='section2'>
        <div className= 'inside'>
          <h1 className='titulito'>Bienvenidos</h1>
          <p className='parrafo'>
            El estudio es la cuna del exito.
          </p>
        </div>
      </div>

      <div className='section3'>

      </div>
            <div className = 'UniLogo2'>
              <div className = 'Mapa'>
               
              </div>
      
            <NoticiasList/>
            </div>

      </div>
  );
}

export default Inicio;
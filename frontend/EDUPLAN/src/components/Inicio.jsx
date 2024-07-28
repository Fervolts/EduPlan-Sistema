import { InstagramEmbed } from 'react-social-media-embed';
import Logo from '../assets/Logo.svg';
import '../inicio.css';
import {FaYoutubeSquare, FaInstagram, FaTwitter, FaFacebook} from 'react-icons/fa';
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
          <FaYoutubeSquare className = 'icon youtube'/>
          <FaInstagram className = 'icon insta'/>
          <FaTwitter className = 'icon twitter'/>
          <FaFacebook className = 'icon facebook'/>
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
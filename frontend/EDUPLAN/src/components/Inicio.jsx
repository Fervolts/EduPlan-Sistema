import { InstagramEmbed } from 'react-social-media-embed';
import Logo from '../assets/Logo.png';
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
            El estudio es la cuna del éxito.
          </p>
        </div>
      </div>

      <div className='fotico2'>
      </div>

      </div>
  );
}

export default Inicio;
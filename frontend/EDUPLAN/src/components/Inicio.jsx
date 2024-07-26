import { InstagramEmbed } from 'react-social-media-embed';
import Logo from '../assets/Logo.svg';
import '../inicio.css';
import {FaYoutubeSquare, FaInstagram, FaTwitter, FaFacebook} from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
        <InstagramEmbed url="https://www.instagram.com/p/C9pwEevxKo3/" width={350} height={430} />
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
              
            <Carousel
            showArrows={true}
            autoPlay={true}
            showThumbs={false}
            swipeable={true}
            emulateTouch={true}
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
            stopOnHover={true}
            interval={3000}
            transitionTime={1000}
            >
              <div>
                <p>Semen gay anal marico</p>
              </div>
              <div>
                <p>Semen gay anal marico</p>
              </div>
              <div>
                <p>Semen gay anal marico</p>
              </div>


            </Carousel>
            </div>

      </div>
  );
}

export default Inicio;
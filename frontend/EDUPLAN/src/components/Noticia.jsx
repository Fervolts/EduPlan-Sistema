import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';   


function   
 NoticiaCard({ noticia }) {
  return (
    <div className="noticia-card">
      <p className="noticia-date">{noticia.fecha}</p>
      <h3>{noticia.Titulo}</h3>
      <p className="noticia-description">{noticia.descripción}</p>
    </div>
  );
}

function NoticiasList() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/noticias'); // Replace with your API endpoint
        const data = await response.json();
        setNoticias(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNoticias();
  }, []);

  return (
    <div className='Divcar'>
      <Carousel
        showArrows={true}
        autoPlay={false}
        showThumbs={false}
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        stopOnHover={true}
        interval={3000}
        transitionTime={400}
      >
        {noticias.map((noticia, index) => (
          <div key={index} className='DivNoticia'>
            <NoticiaCard noticia={noticia} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default NoticiasList;
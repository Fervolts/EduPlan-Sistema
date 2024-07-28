import React, { useRef, useEffect } from 'react';
import L from 'leaflet';

function MapComponent() {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);   

  }, []);

  return   
 (
    <div id="map" style={{ height: '300px', width: '300px' }} />
  );
}

export default MapComponent;
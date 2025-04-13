import React, { useEffect } from 'react';
import L from 'leaflet';

function App() {
  useEffect(() => {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([51.5, -0.09])
      .addTo(map)
      .bindPopup('Hello Memory Map!')
      .openPopup();

    return () => map.remove();
  }, []);

  return (
    <div id="map" className="h-screen w-full"></div>
  );
}

export default App;

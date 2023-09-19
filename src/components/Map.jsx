import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../styles/Map.css';

const Map = ({ jsonValue }) => {
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    const position = [-27.402703894403402, -55.9148928287637];
    const map = L.map('map').setView(position, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const addMarkersToMap = (data) => {
      data.forEach((point) => {
        const { lat, lon, color } = point;

        // Verifica si el atributo 'color' existe en el objeto, si no, usa un color predeterminado
        const markerColor = color ? color : '#FF0000';

        const marker = L.circleMarker([lat, lon], {
          radius: 8,
          fillColor: markerColor,
          fillOpacity: 0.8,
        }).addTo(map);

        marker.bindPopup(`<b>Latitud:</b> ${lat}<br /><b>Longitud:</b> ${lon}`).openPopup();
      });
    };


    if (!mapInitialized) {
      setMapInitialized(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem('userLocation', JSON.stringify({ lat: latitude, lon: longitude }));

          // Utiliza flyTo para centrar el mapa en la ubicación actual con animación
          if (latitude !== undefined && longitude !== undefined) {
            map.flyTo([latitude, longitude], 13);
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación del usuario:', error);

          const userLocation = JSON.parse(localStorage.getItem('userLocation'));
          if (userLocation) {
            map.flyTo([userLocation.lat, userLocation.lon], 15);
          } else {
            // Utiliza flyTo para centrar el mapa en una ubicación predeterminada con animación
            map.flyTo(position, 15);
          }
        }
      );
    }

    if (jsonValue) {
      try {
        const parsedJson = JSON.parse(jsonValue);
        if (Array.isArray(parsedJson) && parsedJson.length > 0) {
          addMarkersToMap(parsedJson);
        }
      } catch (error) {
        console.error('Error al parsear el JSON:', error);
      }
    }

    return () => {
      // Verifica si el mapa está definido y si no, lo elimina
      if (map) {
        map.remove();
      }
    };

  }, [jsonValue, mapInitialized]);

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
}

export default Map;






/* 
[
   {
      "lat":"-27.37155285019303",
      "lon":"-55.947683173883156",
      "course":180,
      "speed":"200",
      "color":"#817f82"
   },
   {
      "lat":"-27.372540195774146",
      "lon":"-55.940137962857456",
      "course":180,
      "speed":"200",
      "color":"#FF0800"
   },
   {
      "lat":"-27.369485567006652",
      "lon":"-55.93955308024916",
      "course":180,
      "speed":"200",
      "color":"#FF7538"
   },
   {
      "lat":"-27.373838674416277",
      "lon":"-55.93266281022636",
      "course":180,
      "speed":"200",
      "color":"#FF7538"
   }
]

*/
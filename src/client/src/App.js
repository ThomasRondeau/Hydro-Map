import React, { useState, useEffect } from 'react';
import './icon_C.jpg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = L.icon({
  iconUrl: '/icon_C.jpg', 
  iconSize: [38, 38], 
  iconAnchor: [19, 38], 
  popupAnchor: [0, -38]
});

function App() {
  const [points, setPoints] = useState([]);
  const [powerUnits, setPowerUnits] = useState([]);
  const position = [46.603354, 1.888334]; // Coordonnées centrales de la France

  useEffect(() => {
    fetch('http://localhost:9000/getInterestsPoints')
      .then(response => response.json())
      .then(data => setPoints(data))
      .catch(error => console.error('Error fetching points:', error));

    fetch('http://localhost:9000/getPowerUnits')
      .then(response => response.json())
      .then(data => setPowerUnits(data))
      .catch(error => console.error('Error fetching power units:', error));
  }, []);

  return (
    <div className="App">
      <nav className='navbar-home'>
        <ul className="navbar-list">
          <li>
            <a className='title'>Hydro Map</a>
          </li>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>À propos</a>
          </li>
          <li>
            <a>Collaborer</a>
          </li>
        </ul>
      </nav>
      <div className="map">
        <MapContainer center={position} zoom={6} style={{ height: "600px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {points.map((point, index) => (
            <Marker key={index} position={[point.position.latitude, point.position.longitude]} icon={customIcon}>
              <Popup>
                {point.description}
              </Popup>
            </Marker>
          ))}
          {powerUnits.map((unit, index) => (
            <Marker key={index} position={[unit.position.latitude, unit.position.longitude]} icon={customIcon}>
              <Popup>
                {unit.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;

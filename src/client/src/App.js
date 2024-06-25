import React from 'react';
import './icon_C.jpg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const position = [46.603354, 1.888334]; // Coordonnées centrales de la France

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
          <Marker position={position} img='icon_C.jpg'>
            <Popup>
              Centrale hydrolique <br /> 
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default App;

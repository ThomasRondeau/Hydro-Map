import React, { useState, useEffect } from 'react';
import './icon_C.jpg';
import './icon_loca.png';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from 'papaparse';
import pointsData from './merged.csv'; 

const customIcon = L.icon({
  iconUrl: '/icon_loca.png', 
  iconSize: [38, 38], 
  iconAnchor: [19, 38], 
  popupAnchor: [0, -38]
});


function App() {
  const [points, setPoints] = useState([]);
  const [powerUnits, setPowerUnits] = useState([]);
  const position = [46.603354, 1.888334]; // Coordonnées centrales de la France

  /*
useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetch('http://localhost:9000/getInterestsPoints');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Points:', data);
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        if (Array.isArray(parsedData)) {
          setPoints(parsedData);
        } else {
          console.error('Error: Data is not an array', parsedData);
        }
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };

    const fetchPowerUnits = async () => {
      try {
        const response = await fetch('http://localhost:9000/getPowerUnits');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Power Units:', data);
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        if (Array.isArray(parsedData)) {
          setPowerUnits(parsedData);
        } else {
          console.error('Error: Data is not an array', parsedData);
        }
      } catch (error) {
        console.error('Error fetching power units:', error);
      }
    };

    fetchPoints();
    fetchPowerUnits();
  }, []);*/
  /*
  useEffect(() => {
    fetch('http://localhost:9000/getInterestsPoints') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response.json);
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setPoints(data);
        } else {
          console.error('Error: Data is not an array', data);
        }
      })
      .catch(error => console.error('Error fetching points:', error));

    fetch('http://localhost:9000/getPowerUnits') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response.json);
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setPowerUnits(data);
        } else {
          console.error('Error: Data is not an array', data);
        }
      })
      .catch(error => console.error('Error fetching power units:', error));
  }, []);
  */
  /*{points.map((point, index) => (
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
  ))}*/
    useEffect(() => {
      // Lecture du fichier CSV et parsing
      Papa.parse(pointsData, {
        download: true,
        header: true,
        complete: (result) => {
          const parsedData = result.data;
          // Filtrer les points avec des coordonnées valides
          const validPoints = parsedData.filter(point => {
            const lat = parseFloat(point.latitude);
            const lng = parseFloat(point.longitude);
            return !isNaN(lat) && !isNaN(lng);
          });
          setPoints(validPoints.slice(0, 500)); // nbr éléments affichés
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });
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
            <Marker key={index} position={[parseFloat(point.latitude), parseFloat(point.longitude)]} icon={customIcon}>
              <Popup>
                console.log(point.nomInstallation)
                {point.nomInstallation}
                {point.article}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default App;

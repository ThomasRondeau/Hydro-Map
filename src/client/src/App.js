import React, { useState, useEffect } from 'react';
import new_icon from './new_icon.png';
import new_icon2 from './new_icon2.png';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from 'papaparse';
import pointsData from './merged.csv';
import additionalPointsData from './DataStationPotentiel15mLargeur.csv'


const customIcon = L.icon({
  iconUrl: new_icon, 
  iconSize: [7, 7], 
  iconAnchor: [19, 38], 
  popupAnchor: [0, -38]
});
const customIcon2 = L.icon({
  iconUrl: new_icon2, 
  iconSize: [30, 30], 
  iconAnchor: [19, 38], 
  popupAnchor: [0, -38]
});

function App() {
  const [points, setPoints] = useState([]);
  const [additionalPoints, setadditionalPoints] = useState ([]);
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
          const filteredPoints = validPoints.filter((point, index) => index % 2 === 0); // pour réduire le lag
          setPoints(filteredPoints.slice(0, 4000)); // nbr éléments affichés
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });

      // Lire le deuxième fichier CSV et parser
      Papa.parse(additionalPointsData, {
        download: true,
        header: true,
        complete: (result) => {
          const parsedData = result.data;
          const validaddiPoints = parsedData.filter(addipoint => {
            const lat = parseFloat(addipoint.CoordYAval);
            const lng = parseFloat(addipoint.CoordXAval);
            return !isNaN(lat) && !isNaN(lng);
          });
          setadditionalPoints(validaddiPoints.slice(0, 300));
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });
    }, []);
  return (
    <div className="App">
      <nav className="navbar-home">
          <ul className="navbar-list">
            <li>
              <a className="title_Site">Hydro Map</a>
            </li>
            <li>
              <a to="/">Home</a>
            </li>
            <li>
              <a to="/about">À propos</a>
            </li>
            <li>
              <a to="/collaborate">Collaborer</a>
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
                {point.nomInstallation}/ puissance :
                {point.puisMaxInstallee} MGW/H
              </Popup>
            </Marker>
          ))}
          {additionalPoints.map((addipoint, index) => (
            <Marker key={index} position={[parseFloat(addipoint.CoordXAval), parseFloat(addipoint.CoordYAval)]} icon={customIcon2}>
              <Popup>
                {addipoint._id}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <footer className="footer">
          <p>&copy; 2024 Hydro Map. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

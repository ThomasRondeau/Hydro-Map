import React, { useState, useEffect } from 'react';
import new_icon from './new_icon.png';
import new_icon2 from './new_icon2.png';
import logo from './logo_hm.png';
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
  iconAnchor: [3, 3], 
  popupAnchor: [0, -38]
});
const customIcon2 = L.icon({
  iconUrl: new_icon2, 
  iconSize: [7, 7], 
  iconAnchor: [3, 3], 
  popupAnchor: [0, -38]
});

function App() {
  const [currentPage, setCurrentPage] = useState('home');
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
          setPoints(validPoints.slice(0, 4000)); // nbr éléments affichés
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
    const renderContent = () => {
      switch (currentPage) {
        case 'home':
          return (
            <div className="map">
              <MapContainer center={position} zoom={6} style={{ height: "600px", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {points.map((point, index) => (
                  <Marker key={index} position={[parseFloat(point.latitude), parseFloat(point.longitude)]} icon={customIcon}>
                    <Popup>
                      {point.nomInstallation}/ puissance : {point.puisMaxInstallee} MW
                    </Popup>
                  </Marker>
                ))}
                {additionalPoints.map((addipoint, index) => (
                  <Marker key={index} position={[parseFloat(addipoint.CoordYAval), parseFloat(addipoint.CoordXAval)]} icon={customIcon2}>
                    <Popup>
                      {addipoint._id}
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          );
        case 'about':
          return (
            <div className="about">
              <h1>À propos</h1>
              <p>
                Dans le contexte mondial actuel, l'énergie renouvelable joue un rôle crucial dans la lutte contre le changement climatique et la réduction de la dépendance aux combustibles fossiles. Face à la hausse des émissions de gaz à effet de serre et à l'épuisement des ressources naturelles, les énergies renouvelables offrent une alternative durable et respectueuse de l'environnement. L'adoption croissante de ces sources d'énergie contribue non seulement à la protection de notre planète, mais aussi à la sécurité énergétique, en diversifiant les sources d'approvisionnement et en réduisant les risques liés aux fluctuations des prix du pétrole et du gaz.
              </p>
              <p>
                En France, l'énergie hydroélectrique occupe une place prépondérante dans le mix énergétique. Représentant environ 12% de la production totale d'électricité du pays, elle est la première source d'énergie renouvelable utilisée. Grâce à ses nombreux barrages et installations répartis sur tout le territoire, la France exploite efficacement ses ressources en eau pour produire une énergie propre, stable et flexible. L'hydroélectricité joue un rôle clé non seulement dans la réduction des émissions de CO2, mais aussi dans la gestion de la demande électrique, en pouvant être ajustée rapidement pour répondre aux variations de consommation.
              </p>
              <p>
                Ce site a été développé dans le cadre d'un projet étudiant par six élèves ingénieurs en quatrième année de notre école. Notre objectif était de créer une plateforme innovante et informative pour sensibiliser le public à l'importance de l'énergie hydroélectrique et de l'énergie renouvelable en général. En combinant nos compétences en ingénierie, en développement web, en gestion de données et en gestion de projets, nous avons réussi à concevoir cette carte interactive qui met en lumière les infrastructures hydroélectriques en France. Ce projet nous a permis de mettre en pratique nos connaissances théoriques tout en contribuant à une cause environnementale essentielle.
              </p>
            </div>
          );
        case 'collaborate':
          return (
            <div className="collaborate">
              <div className="collaborate-content">
                <img src={logo} alt="Logo" className="collaborate-logo" />
                <div>
                  <p>
                    Nous recherchons activement des collaborateurs passionnés par la promotion et la facilitation de la mise en place d'infrastructures liées aux énergies renouvelables, en particulier dans le domaine hydroélectrique. Si vous partagez notre vision d'un avenir durable et souhaitez contribuer à l'expansion des énergies vertes, nous serions ravis de vous entendre.
                  </p>
                  <p>
                    Que vous soyez un professionnel, un étudiant, ou une organisation avec des objectifs alignés avec les nôtres, votre collaboration peut faire la différence. Ensemble, nous pouvons développer des solutions innovantes et impactantes pour accélérer la transition énergétique.
                  </p>
                  <p>
                    Pour nous contacter, envoyez-nous un email à <a href="mailto:contact@hydromap.com">contact@hydromap.com</a> ou appelez-nous au +33 1 23 45 67 89. Nous attendons avec impatience de collaborer avec vous pour un avenir plus vert.
                  </p>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
      <div className="App">
        <nav className="navbar-home">
          <ul className="navbar-list">
            <li>
              <img src={logo} className='logo_hm'/>
            </li>
            <li>
              <a onClick={() => setCurrentPage('home')}>Home</a>
            </li>
            <li>
              <a onClick={() => setCurrentPage('about')}>À propos</a>
            </li>
            <li>
              <a onClick={() => setCurrentPage('collaborate')}>Collaborer</a>
            </li>
          </ul>
        </nav>
        {renderContent()}
        <footer className="footer">
          <p>&copy; 2024 Hydro Map. All rights reserved.</p>
        </footer>
      </div>
    );
}

export default App;

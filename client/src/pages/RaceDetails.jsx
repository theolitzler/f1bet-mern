import DriverList from '../components/DriverList.jsx';
import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/ApiConfig.jsx";
import { useLocation } from 'react-router-dom';

const RaceDetails = () => {
  const [raceInfo, setRaceInfo] = useState(null); // Initialisé à null
  const location = useLocation();

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const raceId = location.pathname.split("/").pop();
        console.log(`${API_BASE_URL}/races/${raceId}`);
        const response = await fetch(`${API_BASE_URL}/races/${raceId}`);
        const data = await response.json();

        if (response.status === 200) { // Utilisation de ===
          setRaceInfo(data);
        } else {
          console.error('Failed to fetch race info:', data);
        }
      } catch (error) {
        console.error('Error fetching race info:', error);
      }
    };

    fetchRace();
  }, [location.pathname, API_BASE_URL]);

  if (!raceInfo) {
    return <p>Loading...</p>; // Gestion de l'état de chargement
  }

  return (
      <div className="race-details max-w-4xl mx-auto">
        <Navbar />
        <header className="race-header">
          {/* Affiche les informations de base de la course ici */}
          <h1 className="p-4">{raceInfo.name}</h1>
        </header>
        <DriverList />
      </div>
  );
};

export default RaceDetails;

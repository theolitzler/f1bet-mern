import DriverList from '../components/DriverList.jsx';
import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/ApiConfig.jsx";
import { useLocation } from 'react-router-dom';
import Flag from "react-world-flags";

const RaceDetails = () => {
  const [race, setRace] = useState(null); // Initialisé à null
  const location = useLocation();

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const raceId = location.pathname.split("/").pop();
        // console.log(`${API_BASE_URL}/races/${raceId}`);
        const response = await fetch(`${API_BASE_URL}/races/${raceId}`);
        const data = await response.json();

        if (response.status === 200) { // Utilisation de ===
          setRace(data);
        } else {
          console.error('Failed to fetch race info:', data);
        }
      } catch (error) {
        console.error('Error fetching race info:', error);
      }
    };

    fetchRace();
  }, [location.pathname]);

  if (!race) {
    return <p>Loading...</p>; // Gestion de l'état de chargement
  }

  return (
    <div className="race-details max-w-4xl mx-auto">
      <Navbar />
      <header className="race-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px"
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              // borderColor: "red",
              borderWidth: "3px",
              width: "50px",
              height: "50px",
            }}
          >
            <Flag
              code={race.countryCode}
              style={{
                borderRadius: "50%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <h1 className="p-4">{race.name}</h1>
        </div>
      </header>
      <DriverList/>
    </div>
  );
};

export default RaceDetails;

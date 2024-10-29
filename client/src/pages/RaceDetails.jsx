import DriverList from '../components/DriverList.jsx';
import Navbar from "../components/Navbar.jsx";
import {useEffect, useState} from "react";
import {API_BASE_URL} from "../services/ApiConfig.jsx";

const RaceDetails = () => {
  const [raceInfo, setRaceInfo] = useState()

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const raceId = location.pathname.split("/").pop();
        const response = await fetch(`${API_BASE_URL}/races/${raceId}`);
        const data = await response.json();

        if (data.success) {
          setRaceInfo(data.message);
        } else {
          console.error('Failed to fetch race info:', data.message);
        }
      } catch (error) {
        console.error('Error fetching race info:', error);
      }
    };

    fetchRace();
  }, []);

  if (!raceInfo) {
    return <p>Loading...</p>; // Handle loading state
  }

  return (
    <div className="race-details max-w-4xl mx-auto">
    <Navbar />
      <header className="race-header">
        {/* Display basic race information here */}
        <h1 className="p-4">{raceInfo.name}</h1>
      </header>
      <DriverList />
    </div>
  );
};

export default RaceDetails;

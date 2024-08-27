import { useParams } from 'react-router-dom';
import DriverList from '../components/DriverList.jsx';
import Navbar from "../components/Navbar.jsx";
import {useEffect} from "react";

const RaceDetails = () => {
  const { raceId } = useParams();

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const response = await fetch('http://localhost:9000/drivers/all');
        const data = await response.json();

        if (data.success) {
          setDriverList(data.message);
        } else {
          console.error('Failed to fetch drivers:', data.message);
        }
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchRace();
  }, []);

  return (
    <div className="race-details max-w-4xl mx-auto">
    <Navbar />
      <header className="race-header">
        {/* Display basic race information here */}
        <h1>Race Details for {raceId}</h1>
      </header>
      <DriverList />
    </div>
  );
};

export default RaceDetails;

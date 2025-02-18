import DriverList from '../components/DriverList.jsx';
import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../services/ApiConfig.jsx";
import { useLocation } from 'react-router-dom';
import Flag from "react-world-flags";
import axios from 'axios';

const RaceDetails = () => {
  const [race, setRace] = useState(null);
  const [hasBet, setHasBet] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchRace = async () => {
      try {
        const raceId = location.pathname.split("/").pop();
        const response = await fetch(`${API_BASE_URL}/races/${raceId}`);
        const data = await response.json();

        if (response.status === 200) {
          setRace(data);
        } else {
          console.error('Failed to fetch race info:', data);
        }
      } catch (error) {
        console.error('Error fetching race info:', error);
      }
    };

    const checkBetStatus = async () => {
      try {
        const raceId = location.pathname.split("/").pop();
        const response = await axios.get(`${API_BASE_URL}/bets/check/${raceId}`, {
          params: { raceId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setHasBet(response.data.hasBet);
      } catch (error) {
        console.error('Error checking bet status:', error);
      }
    };

    fetchRace();
    checkBetStatus();
  }, [location.pathname]);

  if (!race) {
    return <p>Loading...</p>;
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
          {hasBet && (
            <p style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '5px 10px',
              borderRadius: '5px',
              marginLeft: '10px'
            }}>
              You already sent a bet for this race
            </p>
          )}
        </div>
      </header>
      <DriverList/>
    </div>
  );
};

export default RaceDetails;

import { useEffect, useState } from "react";
import axios from "axios";
import Flag from "react-world-flags";
import { useNavigate } from "react-router-dom";
import { RightOutlined, CheckOutlined } from "@ant-design/icons"; // Add this import
import { API_BASE_URL } from "../services/ApiConfig.jsx";

const options = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

const RaceList = ({ type }) => {
  const [races, setRaces] = useState([]);
  const [userBets, setUserBets] = useState([]); // Add state for user bets
  const navigate = useNavigate();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const fetchRaces = async () => {
      const response = await axios.get(`${API_BASE_URL}/races/all`);
      const currentTime = Date.now();

      const filteredRaces = response.data.filter((race) => {
        const raceDate = new Date(race.date).getTime();
        return type === "upcoming" ? raceDate > currentTime : raceDate < currentTime;
      });

      if (type === "completed") {
        filteredRaces.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      setRaces(filteredRaces);
    };

    const fetchUserBets = async () => {
      const response = await axios.get(`${API_BASE_URL}/bets/user`);
      setUserBets(response.data);
    };

    fetchRaces();
    fetchUserBets();
  }, [type]);

  const hasUserBet = (raceId) => userBets.some((bet) => bet.raceId === raceId);

  const handleRaceClick = (raceId) => {
    if (type === "upcoming") {
      navigate(`/races/${raceId}`);
    }
  };

  return (
    <div>
      {races.map((race) => (
        <div
          key={race.id}
          onClick={() => handleRaceClick(race.id)}
          className="race-item flex items-center justify-between p-4 border-b"
        >
          <div className="flex items-center">
            <div
              style={{
                borderRadius: "50%",
                borderColor: "red",
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
            <div className="ml-4">
              <h2 className="text-lg font-bold">{race.name}</h2>
              <p className="text-gray-500">
                {new Date(race.date).toLocaleString(undefined, {
                  ...options,
                  timeZone: userTimeZone,
                })}
              </p>
            </div>
          </div>
          {race.location && (
            <span className="text-gray-500" style={{ textAlign: "right" }}>
              {race.location}
            </span>
          )}
          <div className="flex items-center">
            {hasUserBet(race.id) && <CheckOutlined style={{ marginRight: "8px", color: "green" }} />}
            {type === "upcoming" && <RightOutlined />}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RaceList;

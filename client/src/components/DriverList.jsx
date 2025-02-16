import { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DriverTile from "./DriverTile";
import jwt from "jsonwebtoken";
import { API_BASE_URL } from "../services/ApiConfig.jsx";

const DriverList = () => {
  const [driverList, setDriverList] = useState([]);
  const [hasBet, setHasBet] = useState(false);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/drivers/all`);
        const data = await response.json();

        if (response.status === 200) {
          setDriverList(data);
        } else {
          throw new Error(data.message || "Failed to fetch drivers");
        }
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    const fetchBetStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const raceId = location.pathname.split("/").pop();
        const response = await fetch(`${API_BASE_URL}/bets/check/${raceId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setHasBet(data.hasBet);
      } catch (error) {
        console.error("Error checking bet status:", error);
      }
    };

    fetchDrivers();
    fetchBetStatus();
  }, [API_BASE_URL]);

  const moveTile = (dragIndex, hoverIndex) => {
    const dragDriver = driverList[dragIndex];
    const updatedDrivers = [...driverList];
    updatedDrivers.splice(dragIndex, 1);
    updatedDrivers.splice(hoverIndex, 0, dragDriver);
    setDriverList(updatedDrivers);
  };

  const saveList = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté pour enregistrer une prédiction");
      return;
    }

    let userId, raceId;
    try {
      const decoded = jwt.decode(token);
      userId = decoded?.id;
      raceId = parseInt(location.pathname.split("/").pop(), 10);

      if (!userId || !raceId) {
        throw new Error("Invalid user or race information");
      }

      const predictions = driverList.map((driver, index) => ({
        id: driver.id,
        position: index + 1,
      }));

      const response = await fetch(`${API_BASE_URL}/bets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Vérifiez le format "Bearer"
        },
        body: JSON.stringify({ raceId, predictions }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Votre prédiction a été enregistrée avec succès !");
      } else {
        throw new Error(
          result.error || "Erreur lors de la sauvegarde de la prédiction"
        );
      }
    } catch (error) {
      console.error("Error saving prediction:", error);
      alert(error.message);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        {driverList.map((driver, index) => (
          <DriverTile
            key={driver.id}
            index={index}
            driver={driver}
            moveTile={moveTile}
          />
        ))}
        <button
          onClick={saveList}
          disabled={hasBet}
          className={`mt-4 p-2 rounded-md shadow-md ${
            hasBet
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {hasBet ? "Prédiction déjà enregistrée" : "Sauvegarder"}
        </button>
      </div>
    </DndProvider>
  );
};

export default DriverList;

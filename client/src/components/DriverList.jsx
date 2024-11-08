import { useState, useEffect } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DriverTile from './DriverTile';
import jwt from "jsonwebtoken";
import { API_BASE_URL } from "../services/ApiConfig.jsx";

const DriverList = () => {
  const [driverList, setDriverList] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/drivers/all`);
        const data = await response.json();

        if (response.status === 200) {
          setDriverList(data);
        } else {
          console.error('Failed to fetch drivers:', data);
        }
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, [API_BASE_URL]);

  const moveTile = (dragIndex, hoverIndex) => {
    const dragDriver = driverList[dragIndex];
    const updatedDrivers = [...driverList];
    updatedDrivers.splice(dragIndex, 1);
    updatedDrivers.splice(hoverIndex, 0, dragDriver);
    setDriverList(updatedDrivers);
  };

  const saveList = async () => {
    const driverOrder = driverList.map((driver, index) => ({
      position: index + 1,
      ...driver,
    }));

    const token = localStorage.getItem('token');
    const decoded = jwt.decode(token);
    const userId = decoded?.userId;

    const raceId = location.pathname.split("/").pop();

    const payload = {
      userId: userId,
      raceId: raceId,
      prediction: driverOrder
    };

    try {
      const response = await fetch(`${API_BASE_URL}/bets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        console.log('Prediction saved successfully:', result.message);
      } else {
        console.error('Failed to save prediction:', result.message);
      }
    } catch (error) {
      console.error('Error saving prediction:', error);
    }

    // console.log(JSON.stringify(payload));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        {driverList.map((driver, index) => (
          <DriverTile key={driver.id} index={index} driver={driver} moveTile={moveTile} />
        ))}
        <button
          onClick={saveList}
          className="mt-4 p-2 bg-blue-500 text-white rounded-md shadow-md"
        >
          Sauvegarder
        </button>
      </div>
    </DndProvider>
  );
};

export default DriverList;

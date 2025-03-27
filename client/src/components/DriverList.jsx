import { useState, useEffect } from "react";
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
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
          throw new Error(data.message || 'Failed to fetch drivers');
        }
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = driverList.findIndex(driver => `driver-${driver.id}` === active.id);
      const newIndex = driverList.findIndex(driver => `driver-${driver.id}` === over.id);

      setDriverList((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const saveList = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour enregistrer une prédiction');
      return;
    }

    let userId, raceId;
    try {
      const decoded = jwt.decode(token);
      userId = decoded?.id;
      raceId = parseInt(location.pathname.split("/").pop(), 10);

      if (!userId || !raceId) {
        throw new Error('Invalid user or race information');
      }

      const predictions = driverList.map((driver, index) => ({
        id: driver.id,
        position: index + 1
      }));

      const response = await fetch(`${API_BASE_URL}/bets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ raceId, predictions })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Votre prédiction a été enregistrée avec succès !');
      } else {
        throw new Error(result.error || 'Erreur lors de la sauvegarde de la prédiction');
      }
    } catch (error) {
      console.error('Error saving prediction:', error);
      alert(error.message);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={driverList.map(driver => `driver-${driver.id}`)} strategy={verticalListSortingStrategy}>
        <div className="p-4">
          {driverList.map((driver, index) => (
            <DriverTile key={driver.id} index={index} driver={driver} />
          ))}
          <button
            onClick={saveList}
            className="mt-4 p-2 bg-blue-500 text-white rounded-md shadow-md"
          >
            Sauvegarder
          </button>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DriverList;
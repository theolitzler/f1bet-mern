import { useState, useEffect } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DriverTile from './DriverTile';
// import jwt from "jsonwebtoken";

const DriverList = () => {
  const [driverList, setDriverList] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
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

    fetchDrivers();
  }, []);

  const moveTile = (dragIndex, hoverIndex) => {
    const dragDriver = driverList[dragIndex];
    const updatedDrivers = [...driverList];
    updatedDrivers.splice(dragIndex, 1);
    updatedDrivers.splice(hoverIndex, 0, dragDriver);
    setDriverList(updatedDrivers);
  };

  const saveList = () => {
    const driverOrder = driverList.map((driver, index) => ({
      position: index + 1,
      ...driver,
    }));

    // const token = localStorage.getItem('token');
    // const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    // const userId = decoded.id;

    console.log(JSON.stringify(driverOrder, null, 2));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        {driverList.map((driver, index) => (
          <DriverTile key={driver._id} index={index} driver={driver} moveTile={moveTile} />
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

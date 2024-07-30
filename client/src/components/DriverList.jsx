import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DriverTile from './DriverTile';
import {useState} from "react";

const drivers = [
  { name: 'Max Verstappen', number: 1, team: 'Red Bull' },
  { name: 'Sergio Perez', number: 11, team: 'Red Bull' },
  { name: 'Lando Norris', number: 4, team: 'McLaren' },
  { name: 'Oscar Piastri', number: 81, team: 'McLaren' },
  { name: 'Charles Leclerc', number: 16, team: 'Ferrari' },
  { name: 'Carlos Sainz', number: 55, team: 'Ferrari' },
  { name: 'Lewis Hamilton', number: 44, team: 'Mercedes' },
  { name: 'Georges Russell', number: 63, team: 'Mercedes' },
  { name: 'Fernando Alonso', number: 14, team: 'Aston Martin' },
  { name: 'Lance Stroll', number: 18, team: 'Aston Martin' },
  { name: 'Yuki Tsunoda', number: 22, team: 'RB' },
  { name: 'Daniel Ricciardo', number: 3, team: 'RB' },
  { name: 'Nico Hulkenberg', number: 27, team: 'Haas' },
  { name: 'Kevin Magnussen', number: 20, team: 'Haas' },
  { name: 'Pierre Gasly', number: 10, team: 'Alpine' },
  { name: 'Esteban Ocon', number: 31, team: 'Alpine' },
  { name: 'Alexander Albon', number: 23, team: 'Williams' },
  { name: 'Logan Sargeant', number: 2, team: 'Williams' },
  { name: 'Valtteri Bottas', number: 77, team: 'Kick Sauber' },
  { name: 'Zhou Guanyu', number: 24, team: 'Kick Sauber' }
];

const DriverList = () => {
  const [driverList, setDriverList] = useState(drivers);

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
    console.log(JSON.stringify(driverOrder, null, 2));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        {driverList.map((driver, index) => (
          <DriverTile key={driver.number} index={index} driver={driver} moveTile={moveTile} />
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

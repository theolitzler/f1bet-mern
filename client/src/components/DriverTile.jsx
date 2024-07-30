import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DriverTile = ({ driver, index, moveTile }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: 'driverTile',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveTile(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'driverTile',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center justify-between p-4 bg-gray-100 shadow-md rounded-md my-2 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <span className="font-bold">{index + 1}</span>
      <span>{driver.name}</span>
      {/* <span>{driver.number}</span> */}
      <span>{driver.team}</span>
    </div>
  );
};

export default DriverTile;

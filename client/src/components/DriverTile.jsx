import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DriverTile = ({ driver, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `driver-${driver.id}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center justify-between p-4 bg-gray-100 shadow-md rounded-md my-2"
    >
      <span className="font-bold">{index + 1}</span>
      <span>{driver.name}</span>
      <span>{driver.team}</span>
    </div>
  );
};

export default DriverTile;

import React, { useState } from "react";
import RaceList from "./RaceList";

const RaceNavigation = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <div className="flex justify-between p-4 border-b">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`p-2 ${
              activeTab === "upcoming"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500"
            }`}
          >
            Prochaines
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`p-2 ${
              activeTab === "completed"
                ? "text-red-500 border-b-2 border-red-500"
                : "text-gray-500"
            }`}
          >
            Terminées
          </button>
        </div>
        <RaceList type={activeTab} />
      </div>
    </div>
  );
};

export default RaceNavigation;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Races from "./pages/Races";
import RaceDetails from './pages/RaceDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Races />} />
        <Route path="/races/:id" element={<RaceDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
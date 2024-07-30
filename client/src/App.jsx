import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Races from "./pages/Races";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Races />} />
      </Routes>
    </Router>
  );
}

export default App;
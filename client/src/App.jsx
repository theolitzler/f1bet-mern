import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Races from "./pages/Races";
import RaceDetails from './pages/RaceDetails';
import Rankings from "./pages/Rankings.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Races />} />
        <Route path="/races/:id" element={<RaceDetails />} />
      <Route path="/rankings" element={<Rankings />} />
      </Routes>
    </Router>
  );
}

export default App;
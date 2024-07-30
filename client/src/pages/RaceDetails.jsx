import { useParams } from 'react-router-dom';
import DriverList from '../components/DriverList.jsx';

const RaceDetails = () => {
  const { raceId } = useParams();

  // Fetch race details using raceId if needed

  return (
    <div className="race-details max-w-4xl mx-auto p-4">
      <header className="race-header">
        {/* Display basic race information here */}
        <h1>Race Details for {raceId}</h1>
      </header>
      <DriverList />
    </div>
  );
};

export default RaceDetails;

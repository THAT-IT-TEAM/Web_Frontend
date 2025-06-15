import { useEffect, useState } from "react";
import api from "./api";
import EditTripModal from "./EditTripModal";
import { IoIosClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Loader from "./SquareLoader";
import SpotlightCard from "./SpotlightCard";
import NavBar from "./Admin/NavBar";

interface Trip {
  id: string;
  user_id: string;
  name: string;
  description: string;
  budget: number;
  budget_spent: number;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const TripsList = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen , setIsOpen] = useState(false)
  const [editTrip , setEditTrip] = useState<Trip|null>(null)


  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await api.getTableData("trips");
        console.log(data);

        // Add artificial delay of 2 seconds
        await new Promise(resolve => setTimeout(resolve, 1000));

        setTrips(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

 if (loading) return (
    <div className="h-screen bg-[#141414] flex justify-center items-center">
      <Loader />
    </div>
  );

  if (error) return <div className="text-red-500">Error: {error}</div>;


  const handleUpdateTrip = async (updatedTrip: Trip) => {
    try {
      await api.updateTrip(updatedTrip.id, updatedTrip);
      // Refresh trips list
      const data = await api.getTableData("trips");
      setTrips(data || []);
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to update trip");
    }
  };

  return (
<div className=" bg-[#141414] min-h-screen z-0 relative font-eudoxussans">
    <NavBar/>

    <div className={`${isOpen ? 'blur-sm' : ''} transition-all duration-200`}>
      <h1 className="text-5xl text-center text-white m-14 font-impact">Your Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1550px] mx-auto">
      {trips.map((trip) => (
        <SpotlightCard>
        <div
          key={trip.id}
          className="bg-[#141414] border border-gray-50 p-4 rounded-lg text-white shadow-neumorphic"
        >
          <h2 className="text-xl font-bold mb-2">{trip.name}</h2>
          <p className="text-gray-300 mb-2">{trip.description}</p>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Budget:</span>
            <span className="text-green-400">${trip.budget}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Spent:</span>
            <span className="text-yellow-400">${trip.budget_spent}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Status:</span>
            <span
              className={`px-2 py-1 rounded ${
                trip.status === "active"
                  ? "bg-green-600"
                  : trip.status === "completed"
                  ? "bg-yellow-600"
                  : "bg-gray-600"
              }`}
            >
              {trip.status}
            </span>
          </div>
          <div className="text-sm text-gray-400 mt-4 relative">
            <div>Start: {new Date(trip.start_date).toLocaleDateString()}</div>
            <div>End: {new Date(trip.end_date).toLocaleDateString()}</div>
            <div className="absolute translate-x-[395px] -translate-y-10">
            <button className="p-2 m-2 text-white bg-blue-500 rounded px-4" onClick={()=>{setIsOpen(true);setEditTrip(trip)}}>Edit</button>
            </div>
          </div>
        </div>
        </SpotlightCard>
      ))}
   </div>
      {trips.length === 0 && (
        <div className="text-white text-center mt-8">No trips found.</div>
      )}
    </div>

      <EditTripModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trip={editTrip}
        onSave={handleUpdateTrip}
      />
  </div>
);
};

export default TripsList;

import { useEffect, useState } from "react";
import api from "./api";

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

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const data = await api.getTableData("trips");
        console.log(data);

        setTrips(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  if (loading) return <div className="text-white">Loading trips...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Your Trips</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg text-white"
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
                    ? "bg-blue-600"
                    : "bg-gray-600"
                }`}
              >
                {trip.status}
              </span>
            </div>
            <div className="text-sm text-gray-400 mt-4">
              <div>Start: {new Date(trip.start_date).toLocaleDateString()}</div>
              <div>End: {new Date(trip.end_date).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
      {trips.length === 0 && (
        <div className="text-white text-center mt-8">No trips found.</div>
      )}
    </div>
  );
};

export default TripsList;

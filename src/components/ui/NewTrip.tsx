import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import SpotlightCard from "./SpotlightCard";

const NewTrip = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newTrip, setNewTrip] = useState({
    name: "",
    description: "",
    budget: "",
    startDate: "",
    endDate: "",
    userEmail: "",
    user_id: "",
  });

  const validateForm = () => {
    if (!newTrip.name) return "Name is required";
    if (!newTrip.description) return "Description is required";
    if (!newTrip.budget || isNaN(parseFloat(newTrip.budget))) return "Valid budget is required";
    if (!newTrip.startDate) return "Start date is required";
    if (!newTrip.endDate) return "End date is required";
    if (!newTrip.userEmail) return "User email is required";
    return null;
  };

  const handleCreateTrip = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // First get the user ID
      const { userId } = await api.getUserIdByEmail(newTrip.userEmail);

      if (!userId) {
        setError("User not found with this email");
        return;
      }

      // Create trip with the retrieved user ID
      const tripData = {
        name: newTrip.name.trim(),
        description: newTrip.description.trim(),
        budget: parseFloat(newTrip.budget),
        start_date: newTrip.startDate,
        end_date: newTrip.endDate,
        budget_spent: 0,
        status: "active",
        user_id: userId,
      };

      await api.createTrip(tripData);
      navigate("/trips");
    } catch (err: any) {
      console.error("Trip creation error:", err);
      setError(err.message || "Failed to create trip. Please check all fields and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#141414] h-screen flex justify-center items-center">
      <IoIosClose onClick={()=>{navigate("/admin")}} className="text-white h-[60px] w-[60px] -translate-y-[450px] -translate-x-[150px]" />
      <div className=" h-[800px] w-[1500px] rounded-2xl flex flex-col  items-center">
        <h1 className="text-white text-5xl p-2 m-2 text-center  font-['impact']">
          Add New Trip
        </h1>
        <SpotlightCard>
          <div className="border border-gray-50 h-[600px] w-[500px] rounded-2xl flex flex-col justify-center items-center font-eudoxussans">
            <div className="relative w-4/5 mt-5 mb-3">
              <input
                type="text"
                name="name"
                value={newTrip.name}
                onChange={(e) => {
                  setNewTrip({ ...newTrip, name: e.target.value });
                }}
                placeholder="Name"
                autoComplete="off"
                required
                className="peer w-full border-0 border-b-2 border-gray-500 bg-transparent text-white text-[17px] pt-4 pb-2 focus:outline-none focus:border-b-[3px] focus:border-transparent focus:[border-image:linear-gradient(to_right,_#f9fafb,_#f9fafb)_1] placeholder-transparent "
              />
              <label
                htmlFor="text"
                className="absolute left-0 -translate-y-3 text-[17px] text-gray-500 transition-all duration-200 peer-placeholder-shown:text-[17px] peer-placeholder-shown:top-[16px] peer-placeholder-shown:font-normal peer-focus:top-[-17px] peer-focus:text-[15px] peer-focus:font-bold peer-focus:text-gray-50 peer-not-placeholder-shown:top-[-17px] peer-not-placeholder-shown:text-[15px] peer-not-placeholder-shown:font-bold"
              >
                Name
              </label>
            </div>
            <div className="relative w-4/5 mt-4 mb-3">
              <input
                type="text"
                name="description"
                value={newTrip.description}
                onChange={(e) => {
                  setNewTrip({ ...newTrip, description: e.target.value });
                }}
                placeholder="Description"
                autoComplete="off"
                required
                className="peer w-full border-0 border-b-2 border-gray-500 bg-transparent text-white text-[17px] pt-4 pb-2 focus:outline-none focus:border-b-[3px] focus:border-transparent focus:[border-image:linear-gradient(to_right,_#f9fafb,_#f9fafb)_1] placeholder-transparent "
              />
              <label
                htmlFor="text"
                className="absolute left-0 -translate-y-3 text-[17px] text-gray-500 transition-all duration-200 peer-placeholder-shown:text-[17px] peer-placeholder-shown:top-[16px] peer-placeholder-shown:font-normal peer-focus:top-[-17px] peer-focus:text-[15px] peer-focus:font-bold peer-focus:text-gray-50 peer-not-placeholder-shown:top-[-17px] peer-not-placeholder-shown:text-[15px] peer-not-placeholder-shown:font-bold"
              >
                Description
              </label>
            </div>
            <div className="relative w-4/5 mt-4 mb-3">
              <input
                type="text"
                name="budget"
                value={newTrip.budget}
                onChange={(e) => {
                  setNewTrip({ ...newTrip, budget: e.target.value });
                }}
                placeholder="Budget"
                autoComplete="off"
                required
                className="peer w-full border-0 border-b-2 border-gray-500 bg-transparent text-white text-[17px] pt-4 pb-2 focus:outline-none focus:border-b-[3px] focus:border-transparent focus:[border-image:linear-gradient(to_right,_#f9fafb,_#f9fafb)_1] placeholder-transparent "
              />
              <label
                htmlFor="text"
                className="absolute left-0 -translate-y-3 text-[17px] text-gray-500 transition-all duration-200 peer-placeholder-shown:text-[17px] peer-placeholder-shown:top-[16px] peer-placeholder-shown:font-normal peer-focus:top-[-17px] peer-focus:text-[15px] peer-focus:font-bold peer-focus:text-gray-50 peer-not-placeholder-shown:top-[-17px] peer-not-placeholder-shown:text-[15px] peer-not-placeholder-shown:font-bold"
              >
                Budget
              </label>
            </div>
            <div className="relative w-4/5 mt-4 mb-3">
              <input
                type="text"
                name="startDate"
                value={newTrip.startDate}
                onChange={(e) => {
                  setNewTrip({ ...newTrip, startDate: e.target.value });
                }}
                placeholder="Start Date"
                autoComplete="off"
                required
                className="peer w-full border-0 border-b-2 border-gray-500 bg-transparent text-white text-[17px] pt-4 pb-2 focus:outline-none focus:border-b-[3px] focus:border-transparent focus:[border-image:linear-gradient(to_right,_#f9fafb,_#f9fafb)_1] placeholder-transparent "
              />
              <label
                htmlFor="text"
                className="absolute left-0 -translate-y-3 text-[17px] text-gray-500 transition-all duration-200 peer-placeholder-shown:text-[17px] peer-placeholder-shown:top-[16px] peer-placeholder-shown:font-normal peer-focus:top-[-17px] peer-focus:text-[15px] peer-focus:font-bold peer-focus:text-gray-50 peer-not-placeholder-shown:top-[-17px] peer-not-placeholder-shown:text-[15px] peer-not-placeholder-shown:font-bold"
              >
                Start Date [DD/MM/YYYY]
              </label>
            </div>
            <div className="relative w-4/5 mt-4 mb-3">
              <input
                type="text"
                name="endDate"
                value={newTrip.endDate}
                onChange={(e) => {
                  setNewTrip({ ...newTrip, endDate: e.target.value });
                }}
                placeholder="End Date"
                autoComplete="off"
                required
                className="peer w-full border-0 border-b-2 border-gray-500 bg-transparent text-white text-[17px] pt-4 pb-2 focus:outline-none focus:border-b-[3px] focus:border-transparent focus:[border-image:linear-gradient(to_right,_#f9fafb,_#f9fafb)_1] placeholder-transparent "
              />
              <label
                htmlFor="text"
                className="absolute left-0 -translate-y-3 text-[17px] text-gray-500 transition-all duration-200 peer-placeholder-shown:text-[17px] peer-placeholder-shown:top-[16px] peer-placeholder-shown:font-normal peer-focus:top-[-17px] peer-focus:text-[15px] peer-focus:font-bold peer-focus:text-gray-50 peer-not-placeholder-shown:top-[-17px] peer-not-placeholder-shown:text-[15px] peer-not-placeholder-shown:font-bold"
              >
                End Date [DD/MM/YYYY]
              </label>
            </div>
           <div className="relative w-4/5 mt-4 mb-3">
      <input
        type="email" // Changed to email type for better validation
        name="userEmail"
        value={newTrip.userEmail}
        onChange={ (e) => {
          setNewTrip({ ...newTrip, userEmail: e.target.value });
        }}
        placeholder="User Email"
        autoComplete="off"
        required
        className="peer w-full border-0 border-b-2 border-gray-500 bg-transparent text-white text-[17px] pt-4 pb-2 focus:outline-none focus:border-b-[3px] focus:border-transparent focus:[border-image:linear-gradient(to_right,_#f9fafb,_#f9fafb)_1] placeholder-transparent"
      />
      <label
        htmlFor="email" // Changed to email
        className="absolute left-0 -translate-y-3 text-[17px] text-gray-500 transition-all duration-200 peer-placeholder-shown:text-[17px] peer-placeholder-shown:top-[16px] peer-placeholder-shown:font-normal peer-focus:top-[-17px] peer-focus:text-[15px] peer-focus:font-bold peer-focus:text-gray-50 peer-not-placeholder-shown:top-[-17px] peer-not-placeholder-shown:text-[15px] peer-not-placeholder-shown:font-bold"
      >
        User Email
      </label>
    </div>

            <div className="max-w-32 bg-transparent items-center justify-center flex border-2 border-gray-50 shadow-lg rounded-xl hover:bg-sky-500 hover:border-sky-500 text-white hover:text-white duration-300 cursor-pointer active:scale-[0.95] mt-10">
              <button
                className="px-5 py-2"
                onClick={handleCreateTrip}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
            {error && (
              <div className="text-red-500 mt-4 text-center">{error}</div>
            )}
          </div>
        </SpotlightCard>
      </div>

    </div>
  );
};

export default NewTrip;

import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";

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

interface EditTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  trip: Trip | null;
  onSave: (updatedTrip: Trip) => void;
}

const EditTripModal = ({ isOpen, onClose, trip, onSave }: EditTripModalProps) => {
  const [formData, setFormData] = useState<Trip | null>(null);

  useEffect(() => {
    if (trip) setFormData(trip);
  }, [trip]);

  if (!isOpen || !formData) return null;

  const handleChange = (field: keyof Trip, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent backdrop click from closing modal
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 font-eudoxussans"
        onClick={handleModalClick}
      >
        <div className="bg-[#141414] w-[500px] rounded-2xl border border-gray-50 shadow-neumorphic p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-2xl font-eudoxussans">Edit Trip</h2>
            <IoIosClose className="text-white text-4xl cursor-pointer" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/** Inputs updated to use local state */}
            <InputField
              label="Name"
              value={formData.name}
              onChange={(val) => handleChange("name", val)}
            />
            <InputField
              label="Description"
              value={formData.description}
              onChange={(val) => handleChange("description", val)}
            />
            <InputField
              label="Budget"
              type="number"
              value={formData.budget}
              onChange={(val) => handleChange("budget", Number(val))}
            />
            <InputField
              label="Start Date"
              type="date"
              value={formData.start_date}
              onChange={(val) => handleChange("start_date", val)}
            />
            <InputField
              label="End Date"
              type="date"
              value={formData.end_date}
              onChange={(val) => handleChange("end_date", val)}
            />
            <div className="relative w-full">
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-gray-500 text-white text-[17px] pt-4 pb-2 focus:outline-none focus:border-b-[3px] focus:ring-0"
              >
                <option value="active" className="bg-[#090909]">Active</option>
                <option value="completed" className="bg-[#090909]">Completed</option>
                <option value="cancelled" className="bg-[#090909]">Cancelled</option>
              </select>
              <label className="absolute left-0 -top-2 text-[15px] text-gray-500">Status</label>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-50 rounded-lg text-white hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTripModal;

interface InputFieldProps {
  label: string;
  type?: string;
  value: string | number;
  onChange: (val: string) => void;
}

const InputField = ({ label, type = "text", value, onChange }: InputFieldProps) => (
  <div className="relative w-full">
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="peer w-full border-0 border-b-2 border-gray-500 bg-transparent text-white text-[17px] pt-4 pb-2 focus:outline-none focus:border-b-[3px] focus:border-transparent focus:[border-image:linear-gradient(to_right,_#f9fafb,_#f9fafb)_1] placeholder-transparent"
      placeholder={label}
      required
    />
    <label className="absolute left-0 -top-2 text-[15px] text-gray-500 peer-placeholder-shown:text-[17px] peer-placeholder-shown:top-4 peer-focus:-top-2 peer-focus:text-[15px] peer-focus:text-gray-50 transition-all">
      {label}
    </label>
  </div>
);

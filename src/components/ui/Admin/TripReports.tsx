import React, { useEffect, useState } from "react";
import api from "../api";
import { getCurrentUser } from "../auth";

interface TripReport {
  id: string;
  trip_id: string;
  report_name: string;
  summary: string;
  total_expenses_amount: number;
  generated_at: string;
  created_by_user_id: string;
  status: string;
}

const TripReports: React.FC = () => {
  const user = getCurrentUser();
  const isAdmin = user?.role === "admin";

  const [reports, setReports] = useState<TripReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentReport, setCurrentReport] = useState<TripReport | null>(null);
  const [formState, setFormState] = useState({
    trip_id: "",
    report_name: "",
    summary: "",
    status: "draft",
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getTripReports();
      setReports(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch trip reports");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setCurrentReport(null);
    setFormState({
      trip_id: "",
      report_name: "",
      summary: "",
      status: "draft",
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (report: TripReport) => {
    setCurrentReport(report);
    setFormState({
      trip_id: report.trip_id,
      report_name: report.report_name,
      summary: report.summary,
      status: report.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin || !window.confirm("Are you sure you want to delete this report?")) {
      return;
    }
    try {
      await api.deleteTripReport(parseInt(id));
      alert("Trip report deleted successfully.");
      fetchReports();
    } catch (err: any) {
      alert(err.message || "Failed to delete trip report");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentReport) {
        await api.updateTripReport(currentReport.id, formState);
        alert("Trip report updated successfully.");
      } else {
        await api.createTripReport(formState);
        alert("Trip report created successfully.");
      }
      setIsModalOpen(false);
      fetchReports();
    } catch (err: any) {
      alert(err.message || "Failed to save trip report");
    }
  };

  if (loading) return <div className="text-center p-4">Loading trip reports...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-6 bg-[#141414] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-3xl font-bold">Trip Reports</h1>
          {isAdmin && (
            <button
              onClick={handleCreateClick}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Create New Report
            </button>
          )}
        </div>

        {reports.length <=0 ? (
          <p className="text-center text-gray-400 py-8">No trip reports found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-white">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-4">Report Name</th>
                  <th className="p-4">Trip ID</th>
                  <th className="p-4">Summary</th>
                  <th className="p-4">Total Expenses</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Generated At</th>
                  <th className="p-4">Created By</th>
                  {isAdmin && <th className="p-4">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="p-4">{report.report_name}</td>
                    <td className="p-4">{report.trip_id}</td>
                    <td className="p-4">{report.summary}</td>
                    <td className="p-4">
                      ${report.total_expenses_amount?.toFixed(2) || "0.00"}
                    </td>
                    <td className="p-4">{report.status}</td>
                    <td className="p-4">
                      {new Date(report.generated_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">{report.created_by_user_id}</td>
                    {isAdmin && (
                      <td className="p-4 space-x-2">
                        <button
                          onClick={() => handleEditClick(report)}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#1a1a1a] p-6 rounded-lg w-[500px]">
              <h2 className="text-white text-2xl mb-4">
                {currentReport ? "Edit Trip Report" : "Create New Trip Report"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Report Name</label>
                  <input
                    type="text"
                    value={formState.report_name}
                    onChange={(e) =>
                      setFormState({ ...formState, report_name: e.target.value })
                    }
                    className="w-full p-2 bg-[#2a2a2a] text-white rounded border border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Trip ID</label>
                  <input
                    type="text"
                    value={formState.trip_id}
                    onChange={(e) =>
                      setFormState({ ...formState, trip_id: e.target.value })
                    }
                    className="w-full p-2 bg-[#2a2a2a] text-white rounded border border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Summary</label>
                  <textarea
                    value={formState.summary}
                    onChange={(e) =>
                      setFormState({ ...formState, summary: e.target.value })
                    }
                    className="w-full p-2 bg-[#2a2a2a] text-white rounded border border-gray-600"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Status</label>
                  <input
                    type="text"
                    value={formState.status}
                    onChange={(e) =>
                      setFormState({ ...formState, status: e.target.value })
                    }
                    className="w-full p-2 bg-[#2a2a2a] text-white rounded border border-gray-600"
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    {currentReport ? "Save Changes" : "Create Report"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripReports;

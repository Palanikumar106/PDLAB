import { useState, useEffect } from "react";
import axios from "axios";

const FinancialYearCreation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [college, setCollege] = useState("National Engineering College");
  const [accountName, setAccountName] = useState("");
  const [accountAcronym, setAccountAcronym] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [records, setRecords] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch financial years from API
  const fetchRecords = () => {
    axios
      .get("/api/admin/year", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setRecords(response.data))
      .catch((error) => console.error("Error fetching records:", error));
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Add a new financial year and immediately fetch the updated data
  const handleSave = () => {
    if (!accountName || !accountAcronym || !startDate || !endDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newRecord = {
      accountName: accountName,
      acronym: accountAcronym,
      start: startDate,
      end: endDate,
    };

    axios
      .post("/api/admin/year", newRecord, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchRecords(); // Fetch updated records immediately
        setIsModalOpen(false);
        setAccountName("");
        setAccountAcronym("");
        setStartDate("");
        setEndDate("");
      })
      .catch((error) => console.error("Error adding record:", error));
  };

  // Delete financial year
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this financial year?")) {
      axios
        .delete(`/api/admin/year/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => fetchRecords()) // Fetch updated records after deletion
        .catch((error) => console.error("Error deleting record:", error));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-7xl mt-24 px-8">
        <div className="overflow-x-auto w-full bg-white shadow-2xl rounded-lg p-6">
          <table className="w-full border-collapse border border-gray-300 rounded-lg text-lg">
            <thead className="bg-indigo-600 text-white text-xl">
              <tr>
                <th className="border border-gray-300 px-8 py-4 text-center">S.No</th>
                <th className="border border-gray-300 px-8 py-4">Account Name</th>
                <th className="border border-gray-300 px-8 py-4">Acronym</th>
                <th className="border border-gray-300 px-8 py-4 text-center">Financial Year</th>
                <th className="border border-gray-300 px-8 py-4 text-center">Select</th>
                <th className="border border-gray-300 px-8 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {records.map((record, index) => (
                <tr key={record.id} className="hover:bg-gray-100 transition-all text-lg">
                  <td className="border border-gray-300 px-8 py-4 text-center">{index + 1}</td>
                  <td className="border border-gray-300 px-8 py-4">{record.accountName}</td>
                  <td className="border border-gray-300 px-8 py-4">{record.acronym}</td>
                  <td className="border border-gray-300 px-8 py-4 text-center">
                    {new Date(record.start).toISOString().split("T")[0]} - {new Date(record.end).toISOString().split("T")[0]}
                  </td>
                  <td className="border border-gray-300 px-8 py-4 text-center">
                    <input type="checkbox" className="h-5 w-5" />
                  </td>
                  <td className="border border-gray-300 px-8 py-4 text-center">
                    <button
                      className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
                      onClick={() => handleDelete(record.year_id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Financial Year Button */}
      <div className="fixed bottom-8 flex justify-center w-full">
        <button
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-12 py-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-xl"
          onClick={() => setIsModalOpen(true)}
        >
          ➕ Add Financial Year
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-10 rounded-lg shadow-2xl w-[500px] transform transition-all scale-100 hover:scale-105"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Create Financial Year</h2>

            <label className="block text-lg font-medium mb-2">College</label>
            <select
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-indigo-300 text-lg"
            >
              <option value="National Engineering College">National Engineering College</option>
            </select>

            <label className="block text-lg font-medium mb-2">Account Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-indigo-300 text-lg"
              placeholder="Enter Account Name"
            />

            <label className="block text-lg font-medium mb-2">Account Acronym</label>
            <input
              type="text"
              value={accountAcronym}
              onChange={(e) => setAccountAcronym(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-indigo-300 text-lg"
              placeholder="Enter Acronym"
            />

            <label className="block text-lg font-medium mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring focus:ring-indigo-300 text-lg"
            />

            <label className="block text-lg font-medium mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:ring focus:ring-indigo-300 text-lg"
            />

            <div className="flex justify-between">
              <button onClick={handleSave} className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition">Exit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialYearCreation;

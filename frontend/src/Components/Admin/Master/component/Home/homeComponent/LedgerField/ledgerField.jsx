import React, { useState } from "react";

const LedgerField = () => {
  const [ledgers, setLedgers] = useState(["Mess Fees", "Club Fees"]);
  const [newLedger, setNewLedger] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="bg-blue-200 min-h-screen flex flex-col items-center py-6">

      {/* Table Container - Moved Down */}
      <div className="w-full max-w-5xl mt-30 bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300 bg-gray-50 shadow">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-4 px-6 text-left font-semibold border">S.No</th>
              <th className="py-4 px-6 text-left font-semibold border">
                Ledger Name
              </th>
              <th className="py-4 px-6 text-center font-semibold border">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {ledgers.map((ledger, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-200 transition duration-200"
              >
                <td className="py-4 px-6 border">{index + 1}</td>
                <td className="py-4 px-6 border break-words">{ledger}</td>
                <td className="py-4 px-6 border text-center space-x-2">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    onClick={() => {
                      setNewLedger(ledger);
                      setEditIndex(index);
                      setShowPopup(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    onClick={() => setLedgers(ledgers.filter((_, i) => i !== index))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Ledger Button */}
      <button
        className="bg-green-500 text-white px-6 py-3 mt-6 rounded font-semibold hover:bg-green-600 transition"
        onClick={() => {
          setNewLedger("");
          setEditIndex(null);
          setShowPopup(true);
        }}
      >
        + Add Ledger
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-xl w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4 text-center">
              {editIndex !== null ? "Edit Ledger" : "Add Ledger"}
            </h3>
            <input
              type="text"
              placeholder="Enter ledger name"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newLedger}
              onChange={(e) => setNewLedger(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-5">
              <button
                className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => {
                  if (!newLedger.trim()) return;
                  if (editIndex !== null) {
                    const updatedLedgers = [...ledgers];
                    updatedLedgers[editIndex] = newLedger;
                    setLedgers(updatedLedgers);
                  } else {
                    setLedgers([...ledgers, newLedger]);
                  }
                  setNewLedger("");
                  setEditIndex(null);
                  setShowPopup(false);
                }}
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
              <button
                className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 transition"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LedgerField;
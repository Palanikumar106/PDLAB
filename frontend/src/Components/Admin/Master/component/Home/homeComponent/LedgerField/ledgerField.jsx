import { useEffect, useState } from "react";
import axios from "axios";
import "./ledgerField.css";

export default function LedgerField() {
  const [headers, setHeaders] = useState([]); 
  const [ledgers, setLedgers] = useState([]); 
  const [selectedHead, setSelectedHead] = useState("");
  const [ledgerName, setLedgerName] = useState(""); 
  const [editIndex, setEditIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const fetchHeader = async () => {
    try {
      const response = await axios.get('api/admin/head');
      const headNames = response.data.map(item => item);
      setHeaders(headNames);
    } catch (err) {
      console.log("Error Occurred", err);
    }
  };

  // Fetch ledger entries
  const fetchLedgers = async () => {
    try {
      const response = await axios.get("api/admin/ledger");
      setLedgers(response.data);
    } catch (err) {
      console.log("Error fetching ledgers:", err);
    }
  };

  useEffect(() => {
    fetchHeader();
    fetchLedgers();
  }, []);

  // Save or Update Ledger Entry
  const handleSaveLedger = async () => {
    if (ledgerName.trim() === "" || selectedHead === "") return;

    if (editIndex !== null) {
      try {
        await axios.put("api/admin/ledger", {
          old_name: ledgers[editIndex].ledger_name,
          new_name: ledgerName,
        });
        console.log("Ledger Updated");
        fetchLedgers();
      } catch (err) {
        console.log("Error updating ledger:", err);
      }
    } else {
      try {
        await axios.post("api/admin/ledger", {
          ledger_name: ledgerName,
          head_name: selectedHead,
        });
        fetchLedgers();
      } catch (err) {
        console.log("Error adding ledger:", err);
      }
    }

    // Reset Fields
    setLedgerName("");
    setSelectedHead("");
    setEditIndex(null);
    setShowPopup(false);
  };

  // Edit Ledger Entry
  const handleEdit = (index) => {
    setLedgerName(ledgers[index].ledger_name);
    setSelectedHead(ledgers[index].head_name);
    setEditIndex(index);
    setShowPopup(true);
  };

  // Delete Ledger Entry
  const handleDelete = async (ledger) => {
    try {
      await axios.delete("api/admin/ledger", { data: { ledger_name:ledger } });
      console.log("Ledger Deleted");
      fetchLedgers();
    } catch (err) {
      console.log("Error deleting ledger:", err);
    }
  };

  return (
    <div className="ledger-container">
      <h2 className="ledger-title">Ledger Fields</h2>

      <table className="ledger-table">
        <thead>
          <tr>
            <th className="ledger-table-header">#</th>
            <th className="ledger-table-header">Ledger Name</th>
            <th className="ledger-table-header">Head Name</th>
            <th className="ledger-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ledgers.map((ledger, index) => (
            <tr key={index}>
              <td className="ledger-table-data">{index + 1}</td>
              <td className="ledger-table-data">{ledger.ledger_name}</td>
              <td className="ledger-table-data">{ledger.Head_name}</td>
              <td className="ledger-table-data">
                <button
                  className="ledger-button ledger-edit-button"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="ledger-button ledger-delete-button"
                  onClick={() => handleDelete(ledger.ledger_name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="ledger-button ledger-add-button"
        onClick={() => {
          setEditIndex(null); // Reset edit mode
          setLedgerName("");  // Clear ledger name input
          setSelectedHead(""); // Clear selected head
          setShowPopup(true);  // Show the modal
        }}
      >
        + Add New Ledger
      </button>


      {/* Popup Modal */}
      {showPopup && (
        <div className="ledger-modal">
          <div className="ledger-modal-content">
            <h3>{editIndex !== null ? "Edit Ledger" : "Add New Ledger"}</h3>

            {/* Input for Ledger Name */}
            <input
              type="text"
              placeholder="Enter ledger name"
              className="ledger-modal-input"
              value={ledgerName}
              onChange={(e) => setLedgerName(e.target.value)}
            />

            {/* Show dropdown only when adding a new ledger */}
            {editIndex === null && (
              <select
                className="ledger-modal-select"
                value={selectedHead}
                onChange={(e) => setSelectedHead(e.target.value)}
              >
                <option value="">Select Head Name</option>
                {headers.map((head) => (
                  <option key={head.id} value={head.id}>
                    {head.Head_name}
                  </option>
                ))}
              </select>
            )}

            {/* Action Buttons */}
            <div className="ledger-modal-buttons">
              <button className="ledger-button ledger-save-button" onClick={handleSaveLedger}>
                {editIndex !== null ? "Update" : "Add"}
              </button>
              <button className="ledger-button ledger-cancel-button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

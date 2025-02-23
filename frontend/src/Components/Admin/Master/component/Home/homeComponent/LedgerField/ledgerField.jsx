import React from 'react'
import { useState } from "react";
import './ledgerField.css'
const LedgerField = () => {
  const [ledgers, setLedgers] = useState(["Mess Fees", "Club Fees"]);
  const [newLedger, setNewLedger] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveLedger = () => {
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
  };

  const handleEdit = (index) => {
    setNewLedger(ledgers[index]);
    setEditIndex(index);
    setShowPopup(true);
  };

  const handleDelete = (index) => {
    setLedgers(ledgers.filter((_, i) => i !== index));
  };

  return (
    <div className="ledger-container">
      <h2 className="ledger-title">Ledger Management</h2>

      <table className="ledger-table">
        <thead>
          <tr>
            <th className="ledger-table-header">#</th>
            <th className="ledger-table-header">Ledger Name</th>
            <th className="ledger-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ledgers.map((ledger, index) => (
            <tr key={index}>
              <td className="ledger-table-data">{index + 1}</td>
              <td className="ledger-table-data">{ledger}</td>
              <td className="ledger-table-data">
                <button className="ledger-button ledger-edit-button" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="ledger-button ledger-delete-button" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="ledger-button ledger-add-button" onClick={() => setShowPopup(true)}>
        + Add Ledger
      </button>

      {showPopup && (
        <div className="ledger-modal">
          <div className="ledger-modal-content">
            <h3>{editIndex !== null ? "Edit Ledger" : "Add Ledger"}</h3>
            <input
              type="text"
              placeholder="Ledger Name"
              className="ledger-modal-input"
              value={newLedger}
              onChange={(e) => setNewLedger(e.target.value)}
            />
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



export default LedgerField
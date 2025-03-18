 import { useState } from "react";
import './YearAssign.css'
const FinancialYearCreation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [college, setCollege] = useState("National Engineering College");
  const [accountName, setAccountName] = useState("");
  const [accountAcronym, setAccountAcronym] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [records, setRecords] = useState([
    { id: 1, name: "National Engineering College", acronym: "NEC", start: "01/04/2017", end: "31/03/2018" },
    { id: 2, name: "National Engineering College 18to19", acronym: "NEC 18to19", start: "01/04/2018", end: "31/03/2019" },
    { id: 3, name: "National Engineering College 19to20", acronym: "NEC 19to20", start: "01/04/2019", end: "31/03/2020" },
  ]);

  const handleSave = () => {
    if (!accountName || !accountAcronym || !startDate || !endDate) {
      alert("Please fill in all fields.");
      return;
    }
    const newRecord = {
      id: records.length + 1,
      name: accountName,
      acronym: accountAcronym,
      start: startDate,
      end: endDate,
    };
    setRecords([...records, newRecord]);
    setAccountName("");
    setAccountAcronym("");
    setStartDate("");
    setEndDate("");
    setIsModalOpen(false); // Close modal after saving
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this financial year?")) {
      setRecords(records.filter((record) => record.id !== id));
    }
  };

  return (
    <div className="financeyear-container">
      <button className="financeyear-open-modal-btn" onClick={() => setIsModalOpen(true)}>Add Financial Year</button>

      {isModalOpen && (
        <div className="financeyear-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="financeyear-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Financial Year Creation</h2>
            <label>College</label>
            <select value={college} onChange={(e) => setCollege(e.target.value)}>
              <option value="National Engineering College">National Engineering College</option>
            </select>

            <label>Account Name</label>
            <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Enter Account Name" />

            <label>Account Acronym</label>
            <input type="text" value={accountAcronym} onChange={(e) => setAccountAcronym(e.target.value)} placeholder="Enter Acronym" />

            <label>Financial Year Start</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

            <label>Financial Year End</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

            <div className="financeyear-button-group">
              <button onClick={handleSave} className="financeyear-save-btn">Save</button>
              <button onClick={() => setIsModalOpen(false)} className="financeyear-exit-btn">Exit</button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="financeyear-table-container">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Account Name</th>
              <th>Account Acronym</th>
              <th>Financial Year</th>
              <th>Select</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={record.id}>
                <td>{index + 1}</td>
                <td>{record.name}</td>
                <td>{record.acronym}</td>
                <td>{record.start} - {record.end}</td>
                <td><input type="checkbox" /></td>
                <td>
                  <button className="financeyear-delete-btn" onClick={() => handleDelete(record.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialYearCreation;

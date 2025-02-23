import { useEffect, useState } from "react";
import './headField.css'
import axios from 'axios'
export default function HeaderField() {
  const [headers, setHeaders] = useState([]);
  const [newHeader, setNewHeader] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);


  const fetchData = async () => {
    try {
      const response = await axios.get('api/admin/head');
      const headNames = response.data.map(item => item.Head_name);
      setHeaders(headNames);
    } catch (err) {
      console.log("Error Occurred", err);
    }
  };


  useEffect(() => {
    fetchData();
  }, []); 


  const handleSaveHeader = async() => {
    if (newHeader.trim() === "") return;

    if (editIndex !== null) {
      const updatedHeaders = [...headers];
      try {
        await axios.put('api/admin/head', { old_name: updatedHeaders[editIndex], new_name: newHeader });
        console.log("Updated");
        fetchData();
      } catch (err) {
        console.log("Error: " + err.message);
      }
      
    } else {

      const payload = await axios.post('api/admin/head', {head_name:newHeader})
        .then(() => {
          setHeaders([...headers, newHeader]);})
          .catch((err)=>{
            console.log(err);
          })
    }

    setNewHeader("");
    setEditIndex(null);
    setShowPopup(false);
  };

  const handleEdit = (index) => {
    setNewHeader(headers[index]);
    setEditIndex(index);
    setShowPopup(true);
  };

  const handleDelete = async (head_name) => {
    try {
      await axios.delete('api/admin/head', { data: { head_name: head_name } });
      console.log("Deleted");
      fetchData();
    } catch (err) {
      console.log("Error: " + err.message);
    }
  };


  return (
    <div className="fees-container">
      <h2 className="fees-title">Header Fields</h2>

      <table className="fees-table">
        <thead>
          <tr>
            <th className="fees-table-header">#</th>
            <th className="fees-table-header">Header Name</th>
            <th className="fees-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header, index) => (
            <tr key={index}>
              <td className="fees-table-data">{index + 1}</td>
              <td className="fees-table-data">{header}</td>
              <td className="fees-table-data">
                <button className="fees-button fees-edit-button" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="fees-button fees-delete-button" onClick={() => handleDelete(header)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="fees-button fees-add-button" onClick={() => setShowPopup(true)}>
        + Add New Header
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fees-modal">
          <div className="fees-modal-content">
            <h3>{editIndex !== null ? "Edit Header" : "Add New Header"}</h3>
            <input
              type="text"
              placeholder="Enter header name"
              className="fees-modal-input"
              value={newHeader}
              onChange={(e) => setNewHeader(e.target.value)}
            />
            <div className="fees-modal-buttons">
              <button className="fees-button fees-save-button" onClick={handleSaveHeader}>
                {editIndex !== null ? "Update" : "Add"}
              </button>
              <button className="fees-button fees-cancel-button" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

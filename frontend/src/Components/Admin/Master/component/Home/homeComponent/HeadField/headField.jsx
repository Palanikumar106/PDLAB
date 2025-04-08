import { useEffect, useState } from "react";
import axios from "axios";

export default function HeaderField() {
  const [headers, setHeaders] = useState([]);
  const [newHeader, setNewHeader] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem('token');
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/head", {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      });
  const headNames = response.data.map((item) => item.Head_name);
  setHeaders(headNames);
} catch (err) {
  console.log("Error Occurred", err);
}
  };

useEffect(() => {
  fetchData();
}, []);

const handleSaveHeader = async () => {
  if (newHeader.trim() === "") return;

  if (editIndex !== null) {
    try {
      await axios.put(
        "/api/admin/head",
        {
          old_name: headers[editIndex],
          new_name: newHeader
        },
        {
          headers: {
            Authorization: `Bearer ${ token }`
            }
          }
        );

fetchData();
      } catch (err) {
  console.log("Error: " + err.message);
}
    } else {
  try {
    await axios.post("/api/admin/head",
      { head_name: newHeader },
      {
        headers: {
          Authorization:`Bearer ${ token }`
            }
          }
        );
fetchData();
      } catch (err) {
  console.log(err);
}
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
    await axios.delete("/api/admin/head", {
      headers: {
        Authorization:` Bearer ${ token }`
        },
  data: { head_name }
});
fetchData();
    } catch (err) {
  console.log("Error: " + err.message);
}
  };

return (
  <div className="bg-blue-200 min-h-screen flex flex-col items-center py-6">


    {/* Table Container - Moved Down */}
    <div className="w-full max-w-5xl mt-30 bg-white p-6 rounded-lg shadow-lg">
      <table className="w-full border-collapse border border-gray-300 bg-gray-50 shadow">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="py-4 px-6 text-left font-semibold border">S.No</th>
            <th className="py-4 px-6 text-left font-semibold border">
              Header Name
            </th>
            <th className="py-4 px-6 text-center font-semibold border">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {headers.map((header, index) => (
            <tr
              key={index}
              className="border-b bg-white hover:bg-gray-100 transition duration-200"
            >
              <td className="py-4 px-6 border">{index + 1}</td>
              <td className="py-4 px-6 border">{header}</td>
              <td className="py-4 px-6 border text-center space-x-2">
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  onClick={() => handleDelete(header)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Add New Header Button */}
    <div className="mt-6">
      <button
        className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition"
        onClick={() => {
          setEditIndex(null);
          setNewHeader("");
          setShowPopup(true);
        }}
      >
        + Add New Header
      </button>
    </div>

    {/* Popup Modal */}
    {showPopup && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => setShowPopup(false)}
      >
        <div
          className="bg-white p-6 rounded-xl shadow-lg w-96"
          onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
        >
          <h3 className="text-lg font-semibold mb-4 text-center">
            {editIndex !== null ? "Edit Header" : "Add New Header"}
          </h3>
          <input
            type="text"
            placeholder="Enter header name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={newHeader}
            onChange={(e) => setNewHeader(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-5">
            <button
              className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
              onClick={handleSaveHeader}
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
}
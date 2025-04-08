import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa"; // Upload Icon

const FeesAllotment = () => {
  const [formData, setFormData] = useState({
    student_id: "",
    Head_name: "",
    ledger_name: "",
    fees_amount: "",
    alloted_date: "",
    due_date: "",
    fine_amount: "",
  });

  const [heads, setHeads] = useState([]);
  const [ledgers, setLedgers] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("/api/admin/head", { headers: { Authorization: `Bearer ${ token }` } })
      .then((response) => setHeads(response.data))
  .catch(() => console.error("Error fetching heads"));

axios.get("/api/admin/ledger", { headers: { Authorization: `Bearer ${ token }` } })
  .then((response) => setLedgers(response.data))
  .catch(() => console.error("Error fetching ledgers"));
  }, []);

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
  setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
};

const validateForm = () => {
  let newErrors = {};
  Object.keys(formData).forEach((key) => {
    if (!formData[key]) newErrors[key] = "Required";
  });

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage(null);

  if (!validateForm()) {
    setMessage({ type: "error", text: "Please fill in all fields!" });
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post("/api/admin/feesAllot", formData, {
      headers: { Authorization: `Bearer ${ token }` }
      });

setMessage({ type: "success", text: response.data.message });
setFormData({
  student_id: "",
  Head_name: "",
  ledger_name: "",
  fees_amount: "",
  alloted_date: "",
  due_date: "",
  fine_amount: "",
});
setErrors({});
    } catch (error) {
  setMessage({ type: "error", text: error.response?.data?.error || "Something went wrong" });
}
setLoading(false);
  };

const handleFileChange = (e) => {
  setFile(e.target.files[0]);
  handleBulkUpload();
};

const handleBulkUpload = async () => {
  if (!file) {
    alert("Please select a file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/api/admin/bulkUpload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:` Bearer ${ token }`
        }
      });

alert(response.data.message);
setFile(null);
    } catch (error) {
  alert("Bulk upload failed!");
}
  };

return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-blue-500 p-6">
    <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-5">Fees Allotment</h2>

      {message && (
        <div className={`p - 3 rounded text-center mb-4 ${message.type === "success" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
      {message.text}
    </div>
        )}

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input type="number" name="student_id" placeholder="Student ID"
          value={formData.student_id} onChange={handleChange}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <select name="Head_name" value={formData.Head_name} onChange={handleChange}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500">
          <option value="">Select Header</option>
          {heads.map((head) => <option key={head.head_id} value={head.Head_name}>{head.Head_name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select name="ledger_name" value={formData.ledger_name} onChange={handleChange}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500">
          <option value="">Select Ledger</option>
          {ledgers.map((ledger) => <option key={ledger.ledger_id} value={ledger.ledger_name}>{ledger.ledger_name}</option>)}
        </select>
        <input type="number" name="fees_amount" placeholder="Fees Amount"
          value={formData.fees_amount} onChange={handleChange}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input type="date" name="alloted_date" value={formData.alloted_date} onChange={handleChange}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input type="date" name="due_date" value={formData.due_date} onChange={handleChange}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <input type="number" name="fine_amount" placeholder="Fine Amount"
        value={formData.fine_amount} onChange={handleChange}
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
        {loading ? "Submitting..." : "Allot Fees"}
      </button>
    </form>

    {/* Bulk Upload Section */}
    <div className="mt-6">
      <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} className="hidden" id="bulkUploadFile" />
      <label htmlFor="bulkUploadFile"
        className="flex justify-center items-center w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition cursor-pointer">
        <FaUpload className="mr-2" /> Bulk Upload
      </label>
    </div>
  </div>
    </div >
  );
};

export default FeesAllotment;
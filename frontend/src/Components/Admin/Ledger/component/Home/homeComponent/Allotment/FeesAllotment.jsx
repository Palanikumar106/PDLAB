import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeesAllotment.css"; // Normal CSS
import { FaFileExcel } from "react-icons/fa"; // Excel Icon

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
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch Head & Ledger Data
  useEffect(() => {
    axios.get("api/admin/head")
      .then((response) => setHeads(response.data))
      .catch(() => console.error("Error fetching heads"));

    axios.get("api/admin/ledger")
      .then((response) => setLedgers(response.data))
      .catch(() => console.error("Error fetching ledgers"));
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Remove error message when user types
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = "This field is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!validateForm()) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("api/admin/feesAllot", formData);
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
      setMessage({
        type: "error",
        text: error.response?.data?.error || "Something went wrong",
      });
    }
    setLoading(false);
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBulkUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("api/admin/bulkUpload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
      setShowModal(false);
      setFile(null);
    } catch (error) {
      alert("Bulk upload failed!");
    }
  };

  return (
    <div className="container">
      <div className="form-section">
        <h2 className="title">Fees Allotment</h2>

        {message && <div className={`message ${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit} className="form">
          <input type="number" name="student_id" placeholder="Student ID" value={formData.student_id} onChange={handleChange} className="input" />
          {errors.student_id && <span className="error">{errors.student_id}</span>}

          <select name="Head_name" value={formData.Head_name} onChange={handleChange} className="input">
            <option value="">Select Head</option>
            {heads.map((head) => <option key={head.head_id} value={head.Head_name}>{head.Head_name}</option>)}
          </select>
          {errors.Head_name && <span className="error">{errors.Head_name}</span>}

          <select name="ledger_name" value={formData.ledger_name} onChange={handleChange} className="input">
            <option value="">Select Ledger</option>
            {ledgers.map((ledger) => <option key={ledger.ledger_id} value={ledger.ledger_name}>{ledger.ledger_name}</option>)}
          </select>
          {errors.ledger_name && <span className="error">{errors.ledger_name}</span>}

          <input type="number" name="fees_amount" placeholder="Fees Amount" value={formData.fees_amount} onChange={handleChange} className="input" />
          {errors.fees_amount && <span className="error">{errors.fees_amount}</span>}

          <input type="date" name="alloted_date" value={formData.alloted_date} onChange={handleChange} className="input" />
          {errors.alloted_date && <span className="error">{errors.alloted_date}</span>}

          <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} className="input" />
          {errors.due_date && <span className="error">{errors.due_date}</span>}

          <input type="number" name="fine_amount" placeholder="Fine Amount" value={formData.fine_amount} onChange={handleChange} className="input" />
          {errors.fine_amount && <span className="error">{errors.fine_amount}</span>}

          <button type="submit" className="button">{loading ? "Submitting..." : "Allot Fees"}</button>
        </form>
      </div>

      {/* Bulk Upload Button */}
      <button className="bulk-upload-btn" onClick={() => setShowModal(true)}>
        <FaFileExcel size={28} /> Bulk Upload
      </button>

      {/* Bulk Upload Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Upload Excel File</h3>
            <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} className="file-input" />
            <button className="button upload-btn" onClick={handleBulkUpload}>Upload</button>
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesAllotment;

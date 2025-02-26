import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";
import { useSelector } from "react-redux";
import { useStudent } from "../../../../Context/StudentContext";

const History = () => {
  const { student } = useStudent();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, []);
  const fetchTransactions = async () => {
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:3000/api/students/transactions/${student.Student_Id}`
      );
      setTransactions(response.data);
    } catch (err) {
      setTransactions([]);
      setError("No transactions found or server error.");
    }
  };

  return (
    <div className="history-container">
      <h2>Transaction History</h2>

      {error && <p className="error-message">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Transaction ID</th>
            <th>Fees Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((txn, index) => (
              <tr key={txn.Transaction_Id}>
                <td>{index + 1}</td>
                <td>{txn.Transaction_Id}</td>
                <td>{txn.feestype}</td>
                <td>₹{txn.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;

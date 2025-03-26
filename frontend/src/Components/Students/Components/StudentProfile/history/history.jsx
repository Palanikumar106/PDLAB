import React, { useEffect, useState } from "react";
import axios from "axios";
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
    <div className="pt-20 min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Transaction History
        </h2>

        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}

        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">S.No</th>
                <th className="p-3">Time</th>
                <th className="p-3">Fees Type</th>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((txn, index) => (
                  <tr key={txn.Transaction_Id} className="text-center border-t">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">
                      {new Date(txn.transaction_time).toLocaleString()}
                    </td>
                    <td className="p-3">{txn.feesName}</td>
                    <td className="p-3">{txn.Transaction_Id}</td>
                    <td className="p-3">{txn.feestype}</td>
                    <td className="p-3 font-semibold text-green-600">
                      ₹{txn.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useStudent } from "../../../../Context/StudentContext";

// const History = () => {
//   const { student } = useStudent();
//   const [transactions, setTransactions] = useState([]);
//   const [error, setError] = useState("");
//   const token=localStorage.getItem('token')
//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     setError("");
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/students/transactions/${student.Student_Id}`,

//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setTransactions(response.data);
//     } catch (err) {
//       setTransactions([]);
//       setError("No transactions found or server error.");
//     }
//   };

//   return (
//     <div className="pt-20 min-h-screen flex flex-col items-center bg-gray-100">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
//         <h2 className="text-2xl font-semibold text-center text-gray-800">
//           Transaction History
//         </h2>

//         {error && (
//           <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
//         )}

//         <div className="overflow-x-auto mt-4">
//           <table className="w-full border-collapse border border-gray-200">
//             <thead className="bg-gray-200 text-gray-700">
//               <tr>
//                 <th className="p-3">S.No</th>
//                 <th className="p-3">Time</th>
//                 <th className="p-3">Fees Type</th>
//                 <th className="p-3">Transaction ID</th>
//                 <th className="p-3">Payment Method</th>
//                 <th className="p-3">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.length > 0 ? (
//                 transactions.map((txn, index) => (
//                   <tr key={txn.Transaction_Id} className="text-center border-t">
//                     <td className="p-3">{index + 1}</td>
//                     <td className="p-3">
//                       {new Date(txn.transaction_time).toLocaleString()}
//                     </td>
//                     <td className="p-3">{txn.feesName}</td>
//                     <td className="p-3">{txn.Transaction_Id}</td>
//                     <td className="p-3">{txn.feestype}</td>
//                     <td className="p-3 font-semibold text-green-600">
//                       ₹{txn.amount}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className="p-4 text-center text-gray-500">
//                     No data available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default History;










import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStudent } from "../../../../Context/StudentContext";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const History = () => {
  const { student } = useStudent();
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setError("");
    try {
      const response = await axios.get(
              `http://localhost:3000/api/students/transactions/${student.Student_Id}`,

              { headers: { Authorization: `Bearer ${token}` } }
            );
      setTransactions(response.data);
    } catch (err) {
      setTransactions([]);
      setError("No transactions found or server error.");
    }
  };

  const downloadReceipt = (transaction) => {
    try {
      const doc = new jsPDF();

      // College Header with modern design
      doc.setFillColor(13, 71, 161); // Dark blue background
      doc.rect(0, 0, 210, 30, 'F'); // Full width header

      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.text("National Engineering College", 105, 15, { align: 'center' });

      doc.setFontSize(10);
      doc.text("An Autonomous Institution (Affiliated to Anna University)", 105, 22, { align: 'center' });
      doc.text("K.R.Nagar, Kovilpatti - 628503", 105, 28, { align: 'center' });

      // Receipt title with accent
      doc.setFillColor(245, 245, 245);
      doc.rect(20, 40, 170, 10, 'F');

      doc.setFontSize(14);
      doc.setTextColor(13, 71, 161);
      doc.text("PAYMENT RECEIPT", 105, 46, { align: 'center' });

      // Student information section
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      // Left column
      doc.text(`Receipt No: ${transaction.Transaction_Id}`, 20, 60);
      doc.text(`Date: ${new Date(transaction.transaction_time).toLocaleDateString('en-IN')}`, 20, 65);
      doc.text(`Time: ${new Date(transaction.transaction_time).toLocaleTimeString('en-IN')}`, 20, 70);

      // Right column
      doc.text(`Student ID: ${student.Student_Id}`, 120, 60);
      doc.text(`Student Name: ${student.name}`, 120, 65);

      // Payment details table with modern styling
      autoTable(doc, {
        startY: 80,
        head: [['Description', 'Details']],
        body: [
          ['Fees Type', transaction.feesName],
          ['Payment Method', transaction.feestype],
          ['Transaction ID', transaction.Transaction_Id],
          ['Amount', `₹${Number(transaction.amount).toLocaleString('en-IN')}`],
          ['Status', 'Completed']
        ],
        theme: 'grid',
        headStyles: {
          fillColor: [13, 71, 161],
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center'
        },
        bodyStyles: {
          halign: 'left'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        },
        margin: { top: 10 },
        styles: {
          cellPadding: 5,
          fontSize: 10,
          valign: 'middle'
        },
        columnStyles: {
          0: { cellWidth: 60, fontStyle: 'bold' },
          1: { cellWidth: 'auto' }
        }
      });

      // Footer with college seal/logo space
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(8);
      doc.setTextColor(100);

      // Save the PDF
      doc.save(`NEC_Receipt_${transaction.Transaction_Id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate receipt. Please try again.");
    }
  };

  return (
    <div className="pt-20 min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8 mx-4">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-2">
          Transaction History
        </h2>
        <div className="border-b-2 border-blue-100 w-32 mx-auto mb-6"></div>

        {error && (
          <p className="text-red-600 text-center mt-4 font-medium">{error}</p>
        )}

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-4 text-left font-semibold">S.No</th>
                <th className="p-4 text-left font-semibold">Time</th>
                <th className="p-4 text-left font-semibold">Fees Type</th>
                <th className="p-4 text-left font-semibold">Transaction ID</th>
                <th className="p-4 text-left font-semibold">Payment Method</th>
                <th className="p-4 text-right font-semibold">Amount</th>
                <th className="p-4 text-center font-semibold">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.length > 0 ? (
                transactions.map((txn, index) => (
                  <tr key={txn.Transaction_Id} className="hover:bg-blue-50 transition-colors">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 whitespace-nowrap">
                      {new Date(txn.transaction_time).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4">{txn.feesName}</td>
                    <td className="p-4 font-mono text-sm">{txn.Transaction_Id}</td>
                    <td className="p-4">{txn.feestype}</td>
                    <td className="p-4 text-right font-semibold text-green-600">
                      ₹{Number(txn.amount).toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => downloadReceipt(txn)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No transactions found
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
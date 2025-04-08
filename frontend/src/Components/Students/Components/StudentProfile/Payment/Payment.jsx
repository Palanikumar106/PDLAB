import React, { useState, useEffect } from "react";
import { loadRazorpay } from "../helper/razorpayUtils";
import axios from "axios";
import { useStudent } from "../../../../Context/StudentContext";

function Payment() {
  const [pendingFees, setPendingFees] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [totalFees, setTotalFees] = useState(0);
  const { student } = useStudent();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPendingFees = async () => {
      try {
        console.log(student)
        const response = await axios.get(
          `/api/students/pending-fees/${student.Student_Id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.length) {
          setPendingFees(
            response.data.map((item) => ({
              id: item.student_id,
              semester: "III",
              feeType: item.ledger_name,
              fees_id: item.Allotment_id,
              amount: item.fees_amount,
            }))
          );
        }
      } catch (error) {
        console.error("Failed to fetch pending fees", error);
      }
    };
    fetchPendingFees();
  }, [student.Student_Id]);

  const handleFeeSelection = (index) => {
    const selectedFee = pendingFees[index];
    const updatedSelectedFees = selectedFees.some(
      (fee) => fee.fees_id === selectedFee.fees_id
    )
      ? selectedFees.filter((fee) => fee.fees_id !== selectedFee.fees_id)
      : [...selectedFees, selectedFee];

    setSelectedFees(updatedSelectedFees);
    setTotalFees(updatedSelectedFees.reduce((acc, fee) => acc + fee.amount, 0));
  };

  const handlePayFees = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/student/pay-fees",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" 
            ,  "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({
            studentId: student.Student_Id,
            amount: totalFees,
            selectedFees,
          }),
        }
      );

      const responsedata = await response.json();
      if (!responsedata.order.id)
        throw new Error("Failed to create Razorpay order");

      const razorpay = await loadRazorpay();
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: responsedata.amount,
        currency: "INR",
        name: "College Fee Payment",
        description: "Fee Payment for Selected Courses",
        order_id: responsedata.order.id,
        handler: function (response) {
          window.location.href = `http://localhost:5173/success?razorpay_payment_id=${response.razorpay_payment_id}&order_id=${responsedata.order.id}&razorpay_signature=${response.razorpay_signature}`;
        },
        prefill: { email: `${student.Student_Id}@nec.edu.in` },
        theme: { color: "#3399cc" },
        modal: {
          ondismiss: function () {
            window.location.href = "http://localhost:5173/cancel";
          },
        },
      };

      new razorpay(options).open();
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  return (
    <div className="pt-20 h-screen overflow-hidden flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Pending Fees
        </h2>

        {pendingFees.length === 0 ? (
          <p className="text-gray-600 text-center mt-4">No pending fees</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200 mt-4">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="p-3">Select</th>
                    <th className="p-3">S.No</th>
                    <th className="p-3">Semester</th>
                    <th className="p-3">Fee Type</th>
                    <th className="p-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingFees.map((fee, index) => (
                    <tr key={fee.id} className="text-center border-t">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          className="w-5 h-5 cursor-pointer"
                          checked={selectedFees.some(
                            (f) => f.fees_id === fee.fees_id
                          )}
                          onChange={() => handleFeeSelection(index)}
                        />
                      </td>
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{fee.semester}</td>
                      <td className="p-3">{fee.feeType}</td>
                      <td className="p-3 font-semibold">₹{fee.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-5 p-4 bg-gray-100 rounded-lg">
              <strong className="text-lg text-gray-800">
                Total Fees to Pay:
              </strong>
              <span className="text-xl font-semibold text-blue-600">
                ₹{totalFees}
              </span>
            </div>

            <button
              className={`w-full mt-4 py-3 rounded-lg text-white font-semibold shadow-md ${
                selectedFees.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 transition transform hover:scale-105"
              }`}
              onClick={handlePayFees}
              disabled={selectedFees.length === 0}
            >
              Pay Selected Fees
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;

import React, { useState, useEffect } from "react";

import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";

function Payment() {
    const [pendingFees, setPendingFees] = useState([]);
    const [selectedFees, setSelectedFees] = useState([]);
    const [totalFees, setTotalFees] = useState(0);


        const fetchPendingFees = async () => {
            try {
                // const response = await fetch("/api/student/pending-fees");
                // const data = await response.json();
                //setpendingFees(data);
                setPendingFees([
                    {
                        id: 123,
                        semester: "III",
                        feeType: "Hostel fees",
                        totalPaid: 0,
                        balance: 2000,
                    },
                    {
                        id: 131,
                        semester: "III",
                        feeType: "Hostel fees",
                        totalPaid: 0,
                        balance: 2000,
                    },
                ]);
            } catch (error) {
                console.error("Failed to fetch pending fees", error);
            }
        };
    useEffect(()=>{

        fetchPendingFees();
    }, []);

    const handleFeeSelection = (index) => {
        const selectedFeeId = pendingFees[index].id;
        const updatedSelectedFees = selectedFees.includes(selectedFeeId)
            ? selectedFees.filter((id) => id !== selectedFeeId)
            : [...selectedFees, selectedFeeId];

        setSelectedFees(updatedSelectedFees);

        const newTotalFees = updatedSelectedFees.reduce((acc, id) => {
            const fee = pendingFees.find((f) => f.id === id);
            return acc + (fee ? fee.balance : 0);
        }, 0);

        setTotalFees(newTotalFees);
    };

    const handlePayFees = async () => {
        try {
            const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
            if(!key){
                console.log("Not get");
            }
            const stripePromise = await loadStripe(
                import.meta.env.VITE_STRIPE_PUBLIC_KEY
            );
            const response = await fetch("http://localhost:3000/api/student/pay-fees", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    studentId:"2212049",
                    amount: totalFees,
                }),
            });
            const responsedata = await response.json();
            console.log("Paymet ", responsedata);
            if (responsedata?.id) {
                stripePromise.redirectToCheckout({ sessionId: responsedata.id });
            }


            //   if (response.ok) {
            //     const updatedFeesResponse = await fetch("/api/student/pending-fees");
            //     const updatedFees = await updatedFeesResponse.json();
            //     setPendingFees(updatedFees);
            //     setSelectedFees([]);
            //     setTotalFees(0);
            //   }
        } catch (error) {
            console.error("Payment failed", error);
        }
    };


    return (
        <div className="fees-management-container">
            <div className="fees-section">
                <h2>Pending Fees</h2>
                {pendingFees.length === 0 ? (
                    <p>No pending fees</p>
                ) : (
                    <>
                        <table className="fees-table">
                            <thead>
                                <tr>
                                    <th>Select</th>
                                    <th>S.No</th>
                                    <th>Semester</th>
                                    <th>Fee Type</th>
                                    <th>Total Paid</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingFees.map((fee, index) => (
                                    <tr key={fee.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedFees.includes(fee.id)}
                                                onChange={() => handleFeeSelection(index)}
                                            />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{fee.semester}</td>
                                        <td>{fee.feeType}</td>
                                        <td>₹{fee.totalPaid}</td>
                                        <td>₹{fee.balance}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="total-fees">
                            <strong>Total Fees to Pay: ₹{totalFees}</strong>
                        </div>
                        <button
                            className="pay-fees-btn"
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


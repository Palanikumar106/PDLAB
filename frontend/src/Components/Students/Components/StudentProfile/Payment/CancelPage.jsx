import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import React from "react";
//  import "./CancelPage.css";
import { FaTimesCircle } from "react-icons/fa";

const CancelPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    saveTransaction();
  }, [sessionId]);
  const saveTransaction = async () => {
    if (!sessionId) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/student/save-transaction?sessionId=${sessionId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      console.log("Transaction Saved:", data);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  return (
    <div className="cancel-wrapper">
      <div className="cancel-container">
        <FaTimesCircle className="cancel-icon" />
        <h2>Payment Canceled</h2>
        <p>Your transaction attempt has been recorded.</p>
        <button onClick={() => (window.location.href = "/student/profile")}>
          Retry Payment
        </button>
      </div>
    </div>
  );
};
export default CancelPage;

import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./SuccessPage.css";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
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
    <div className="success-wrapper">
      <div className="success-container">
        <FaCheckCircle className="success-icon" />
        <h2>Payment Successful!</h2>
        <p>Your transaction has been recorded.</p>
        <Link to="/student/profile" className="profile-link">
          Go back to Profile
        </Link>
      </div>
    </div>
  );
};
export default SuccessPage;

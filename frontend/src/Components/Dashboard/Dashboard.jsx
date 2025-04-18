import React, { useState, useEffect } from "react";
import {
  FaUserGraduate,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaClock,
} from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    transactions: 0,
    unpaidStudents: 0,
  });

  const [activeCard, setActiveCard] = useState(null); // Track selected card
  const [cardDetails, setCardDetails] = useState(null); // Fetched detailed data
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/dashboard-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = async (cardType) => {
    setActiveCard(cardType);
    setLoading(true);
    setError(null); // Reset error state on new request

    try {
      const response = await axios.get(`/api/details/${cardType}`);
      setCardDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch card details:", error);
      setError("Failed to load details. Please try again later.");
      setCardDetails(null);
    } finally {
      setLoading(false);
    }
  };
  const renderDetails = () => {
    if (!activeCard || !cardDetails) return null;

    switch (activeCard) {
      case "students":
        return (
          <ul className="space-y-4 p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
            {cardDetails.map((s, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-4 rounded-lg bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <FaUserGraduate className="text-xl text-indigo-600" />
                  <span className="font-semibold text-lg">{s.Student_Name}</span>
                </div>
                <span className="text-sm text-gray-500">{s.Student_Id}</span>
              </li>
            ))}
          </ul>
        );
      case "revenue":
        return <p className="text-gray-600 dark:text-gray-300 font-medium">Total payments received from all departments.</p>;
      case "transactions":
        return (
          <ul className="space-y-4 p-4 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 rounded-lg shadow-lg">
            {cardDetails.map((t, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-4 rounded-lg bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <FaExchangeAlt className="text-xl text-blue-600" />
                  <span className="font-semibold text-lg">Transaction #{t.student_id}</span>
                </div>
                <span className="text-sm text-gray-500">{t.transaction_time}</span>
              </li>
            ))}
          </ul>
        );
      case "unpaid":
        return (
          <ul className="space-y-4 p-4 bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 rounded-lg shadow-lg">
            {cardDetails.map((s, i) => (
              <li
                key={i}
                className="flex justify-between items-center p-4 rounded-lg bg-white hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <FaClock className="text-xl text-red-600" />
                  <span className="font-semibold text-lg">{s.Student_Name}</span>
                </div>
                <span className="text-sm text-red-500">Due: ₹{s.due_date}</span>
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-20 px-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-all">
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold">Welcome, Admin! 🚀</h1>
        <p className="text-lg opacity-90">Here's your quick overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FaUserGraduate />}
          title="Total Students"
          value={stats.totalStudents}
          color="bg-green-500"
          onClick={() => handleCardClick("students")}
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          title="Total Revenue"
          value={`₹${stats.totalRevenue}`}
          color="bg-yellow-500"
          onClick={() => handleCardClick("revenue")}
        />
        <StatCard
          icon={<FaExchangeAlt />}
          title="Transactions"
          value={stats.transactions}
          color="bg-blue-500"
          onClick={() => handleCardClick("transactions")}
        />
        <StatCard
          icon={<FaClock />}
          title="Unpaid Students"
          value={stats.unpaidStudents}
          color="bg-purple-500"
          onClick={() => handleCardClick("unpaid")}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          {activeCard ? `📊 ${activeCard.charAt(0).toUpperCase() + activeCard.slice(1)} Details` : "📌 Important Notices"}
        </h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          activeCard && renderDetails()
        )}

        {!activeCard && (
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>🎓 Upcoming student registration deadline: <b>April 30</b></li>
            <li>💰 Financial reports will be available by <b>May 5</b></li>
            <li>⚠️ Server maintenance scheduled for <b>May 10</b></li>
          </ul>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color, onClick }) => (
  <div
    className={`${color} text-white p-6 rounded-lg shadow-md flex items-center cursor-pointer hover:opacity-90 transition-all`}
    onClick={onClick}
  >
    <div className="text-3xl">{icon}</div>
    <div className="ml-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  </div>
);

export default Dashboard;

import React, { useState, useEffect } from "react";
import { FaUserGraduate, FaMoneyBillWave, FaExchangeAlt, FaExclamationTriangle, FaClock } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 1500,
    totalRevenue: 250000,
    transactions: 7800,
    issuesReported: 15,
    unpaidStudents: 120,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        totalStudents: prev.totalStudents + Math.floor(Math.random() * 3),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 500),
        transactions: prev.transactions + Math.floor(Math.random() * 5),
        issuesReported: prev.issuesReported + (Math.random() > 0.8 ? 1 : 0),
        unpaidStudents: Math.max(0, prev.unpaidStudents - Math.floor(Math.random() * 3)),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-20 px-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-all">
      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold">Welcome, Admin! 🚀</h1>
        <p className="text-lg opacity-90">Here's your quick overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard icon={<FaUserGraduate />} title="Total Students" value={stats.totalStudents} color="bg-green-500" />
        <StatCard icon={<FaMoneyBillWave />} title="Total Revenue" value={`$${stats.totalRevenue}`} color="bg-yellow-500" />
        <StatCard icon={<FaExchangeAlt />} title="Transactions" value={stats.transactions} color="bg-blue-500" />
        <StatCard icon={<FaExclamationTriangle />} title="Issues Reported" value={stats.issuesReported} color="bg-red-500" />
        <StatCard icon={<FaClock />} title="Unpaid Students" value={stats.unpaidStudents} color="bg-purple-500" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">📌 Important Notices</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>🎓 Upcoming student registration deadline: <b>April 30</b></li>
          <li>💰 Financial reports will be available by <b>May 5</b></li>
          <li>⚠️ Server maintenance scheduled for <b>May 10</b></li>
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-lg shadow-md flex items-center`}>
    <div className="text-3xl">{icon}</div>
    <div className="ml-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  </div>
);

export default Dashboard;

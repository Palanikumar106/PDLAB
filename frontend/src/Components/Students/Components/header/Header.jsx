import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import {
  FaBars,
  FaTimes,
  FaMoneyBillWave,
  FaHistory,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { useStudent } from "../../../Context/StudentContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { student } = useStudent();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="bg-blue-600 text-white fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 shadow-md z-50">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold">
        {student.Student_Name} - {student.Student_Id}
      </h1>

      {/* Navbar Links (Desktop) */}
      <nav className="hidden md:flex space-x-6 font-medium">
        <Link
          to="/student/profile"
          className="flex items-center space-x-2 hover:text-yellow-400 transition"
        >
          <FaUser /> <span>Profile</span>
        </Link>
        <Link
          to="/student/payment"
          className="flex items-center space-x-2 hover:text-yellow-400 transition"
        >
          <FaMoneyBillWave /> <span>Payment</span>
        </Link>
        <Link
          to="/student/history"
          className="flex items-center space-x-2 hover:text-yellow-400 transition"
        >
          <FaHistory /> <span>History</span>
        </Link>
      </nav>

      {/* User Icon */}
      {/* <button
        onClick={handleLogout}
        className="block w-full py-2 px-4 mt-3 text-red-500 bg-gray-800 rounded hover:bg-red-600 hover:text-white transition"
      >
        < className="inline mr-2" /> LogOut
      </button> */}
      
      <FaSignOutAlt size={30} onClick={handleLogout} />
   

      {/* Mobile Menu Button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
      </button>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-700 text-white py-5 px-4 shadow-md rounded-lg md:hidden">
          <Link
            to="/student/profile"
            className="block py-2 px-4 hover:bg-blue-800 transition"
          >
            Profile
          </Link>
          <Link
            to="/student/payment"
            className="block py-2 px-4 hover:bg-blue-800 transition"
          >
            Payment
          </Link>
          <Link
            to="/student/history"
            className="block py-2 px-4 hover:bg-blue-800 transition"
          >
            History
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full py-2 px-4 mt-3 text-red-500 bg-gray-800 rounded hover:bg-red-600 hover:text-white transition"
          >
            <FaSignOutAlt className="inline mr-2" /> LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

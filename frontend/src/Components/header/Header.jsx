import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("role"); // Remove user role (or authentication token)
    localStorage.removeItem("token"); // If using JWT token
    sessionStorage.clear(); // Clear session storage if needed
    console.log("Shan")
    navigate("/"); // Redirect to login page
  };


  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white fixed top-0 left-0 w-full h-16 flex justify-between items-center px-6 shadow-lg z-50">
      {/* Left: Hamburger Icon (Mobile) */}
      <button
        className="text-white text-2xl md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Center: Title */}
      <h1 className="text-2xl font-extrabold flex-grow text-center md:text-left md:pl-8">
        Admin Portal
      </h1>

      {/* Right: Navigation Links (Desktop) */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link
          to="/admin/master"
          className="nav-link transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-lg font-bold hover:bg-yellow-500 hover:text-black hover:shadow-md hover:scale-105"
        >
          Master
        </Link>
        <Link
          to="/admin/ledger"
          className="nav-link transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-lg font-bold hover:bg-green-500 hover:text-black hover:shadow-md hover:scale-105"
        >
          Ledger
        </Link>
        <Link
          to="/admin/report"
          className="nav-link transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-lg font-bold hover:bg-pink-500 hover:text-black hover:shadow-md hover:scale-105"
        >
          Report
        </Link>
        <Link
          to="/admin/dashboard"
          className="nav-link transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-lg font-bold hover:bg-orange-500 hover:text-black hover:shadow-md hover:scale-105"
        >
          Home
        </Link>
        <button className="logout-btn transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-lg font-bold hover:bg-red-500 hover:text-black hover:shadow-md hover:scale-105" 
         onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* Mobile Menu with Slide-in Effect */}
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-blue-700 shadow-lg transform ${menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button
          className="absolute top-5 right-5 text-white text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes />
        </button>
        <nav className="flex flex-col space-y-6 py-20 text-center">
          <Link
            to="/admin/master"
            className="mobile-link transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-xl font-bold hover:bg-yellow-500 hover:text-black hover:shadow-md hover:scale-105"
            onClick={() => setMenuOpen(false)}
          >
            Master
          </Link>
          <Link
            to="/admin/ledger"
            className="mobile-link transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-xl font-bold hover:bg-green-500 hover:text-black hover:shadow-md hover:scale-105"
            onClick={() => setMenuOpen(false)}
          >
            Ledger
          </Link>
          <Link
            to="/admin/report"
            className="mobile-link transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-xl font-bold hover:bg-pink-500 hover:text-black hover:shadow-md hover:scale-105"
            onClick={() => setMenuOpen(false)}
          >
            Report
          </Link>
          <Link
            to="/admin/dashboard"
            className="mobile-link transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-xl font-bold hover:bg-orange-500 hover:text-black hover:shadow-md hover:scale-105"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <button
            className="logout-btn mx-auto mt-4 transition-all duration-300 ease-in-out px-4 py-2 rounded-lg text-xl font-bold hover:bg-red-500 hover:text-black hover:shadow-md hover:scale-105"
            onClick={() => setMenuOpen(false)}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
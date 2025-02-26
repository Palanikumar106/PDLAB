import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaMoneyBillWave,
  FaHistory,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sideOptions">
        <Link to="profile" className="sideTag">
          <FaUser />
          <h3>Profile</h3>
        </Link>
        <Link to="payment" className="sideTag">
          <FaMoneyBillWave />
          <h3>Payment</h3>
        </Link>
        <Link to="history" className="sideTag">
          <FaHistory />
          <h3>History</h3>
        </Link>
        <Link to="alerts" className="sideTag">
          <FaBell />
          <h3>Alerts</h3>
        </Link>
      </div>

      <button id="logOut">
        <FaSignOutAlt /> LogOut
      </button>
    </div>
  );
};

export default SideBar;

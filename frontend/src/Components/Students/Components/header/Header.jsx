// import React, { useState } from "react";
// import SideBar from "../Sidebar/Sidebar";
// import { Link, Outlet } from "react-router-dom";
// // import React, { useState } from "react";
// //  import "./Header.css";
// import { CiUser } from "react-icons/ci";
// import { FaListUl } from "react-icons/fa6";
// import { useStudent } from "../../../Context/StudentContext";
// const Header = () => {
//   const [click, assignClick] = useState(false);
//   const sideBar = () => {
//     console.log(click);
//     assignClick((prev) => !prev);
//   };
//   const { student } = useStudent();
//   return (
//     <>
//       <div className="header">
//         <Link onClick={sideBar}>
//           <FaListUl size={25} style={{ marginTop: 23, marginLeft: 20 }} />
//         </Link>
//         <h1 id="headTitle">
//           {student.Student_Name} - {student.Student_Id}
//         </h1>
//         <div className="headerSide">
//           <Link>
//             <CiUser size={35} style={{ marginRight: 20 }} />
//           </Link>
//         </div>
//       </div>
//       {click ? <SideBar /> : <></>}
//     </>
//   );
// };

// export default Header;

// // import React, { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { CiUser } from "react-icons/ci";
// // import {
// //   FaBars,
// //   FaTimes,
// //   FaUser,
// //   FaMoneyBillWave,
// //   FaHistory,
// //   FaSignOutAlt,
// // } from "react-icons/fa";
// // import { useStudent } from "../../../Context/StudentContext";

// // const Header = () => {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const { student } = useStudent();

// //   return (
// //     <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg w-full">
// //       <div className="container mx-auto px-6 py-4 flex items-center justify-between">
// //         {/* Logo / Title */}
// //         <h1 className="text-2xl font-bold">
// //           {student.Student_Name} - {student.Student_Id}
// //         </h1>

// //         {/* Navbar Links */}
// //         <nav className="hidden md:flex space-x-8 font-medium">
// //           <Link
// //             to="/student/profile"
// //             className="flex items-center space-x-2 hover:text-gray-300 transition"
// //           >
// //             <FaUser /> <span>Profile</span>
// //           </Link>
// //           <Link
// //             to="/student/payment"
// //             className="flex items-center space-x-2 hover:text-gray-300 transition"
// //           >
// //             <FaMoneyBillWave /> <span>Payment</span>
// //           </Link>
// //           <Link
// //             to="/student/history"
// //             className="flex items-center space-x-2 hover:text-gray-300 transition"
// //           >
// //             <FaHistory /> <span>History</span>
// //           </Link>
// //         </nav>

// //         {/* User Icon */}
// //         <Link className="hidden md:block hover:text-gray-300 transition">
// //           <CiUser size={30} />
// //         </Link>

// //         {/* Mobile Menu Button */}
// //         <button
// //           className="md:hidden focus:outline-none"
// //           onClick={() => setMenuOpen(!menuOpen)}
// //         >
// //           {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
// //         </button>
// //       </div>

// //       {/* Mobile Menu */}
// //       {menuOpen && (
// //         <div className="md:hidden bg-blue-700 text-white py-5 px-4 space-y-4 text-center shadow-md rounded-lg">
// //           <Link
// //             to="/student/profile"
// //             className="block py-2 px-4 bg-blue-800 rounded hover:bg-blue-900 transition"
// //           >
// //             Profile
// //           </Link>
// //           <Link
// //             to="/student/payment"
// //             className="block py-2 px-4 bg-blue-800 rounded hover:bg-blue-900 transition"
// //           >
// //             Payment
// //           </Link>
// //           <Link
// //             to="/student/history"
// //             className="block py-2 px-4 bg-blue-800 rounded hover:bg-blue-900 transition"
// //           >
// //             History
// //           </Link>
// //           <button className="block w-full py-2 px-4 mt-3 text-red-500 bg-gray-800 rounded hover:bg-red-600 hover:text-white transition">
// //             <FaSignOutAlt className="inline mr-2" /> LogOut
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <Link className="hidden md:block hover:text-yellow-400 transition">
        <CiUser size={30} />
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
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
          <button className="block w-full py-2 px-4 mt-3 text-red-500 bg-gray-800 rounded hover:bg-red-600 hover:text-white transition">
            <FaSignOutAlt className="inline mr-2" /> LogOut
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

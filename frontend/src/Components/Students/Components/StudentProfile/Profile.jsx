// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// //  import "./profile.css";
// import avengers from "../../../../assets/smile.jpg";
// import { useStudent } from "../../../Context/StudentContext";

// const Profile = () => {
//   const { student, updateStudent } = useStudent();
//   const navigate = useNavigate();
//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/students/details/2212049`
//         );
//         console.log("Student Data:", response.data);
//         updateStudent(response.data); 
//       } catch (error) {
//         console.error("Error fetching student details", error);
//       }
//     };

//     fetchStudentDetails();
//   }, []);

//   if (!student) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-container">
//       <div className="title-section">
//         <h1 className="title">National Engineering College</h1>
//       </div>
//       <div className="profile-section">
//         <div className="profile-header">
//           <h1>Sixth Semester</h1>
//           <img className="profile-photo" src={avengers} alt="Profile" />
//         </div>
//         <div className="fees-management-container">
//           <div className="student-details">
//             <div className="detail-item">
//               <label>
//                 <strong>StudentID:</strong>
//               </label>
//               <span>{student.Student_Id}</span>
//             </div>
//             <div className="detail-item">
//               <label>
//                 <strong>Name:</strong>
//               </label>
//               <span>{student.Student_Name}</span>
//             </div>
//             <div className="detail-item">
//               <label>
//                 <strong>Branch:</strong>
//               </label>
//               <span>{student.Branch}</span>
//             </div>
//             <div className="detail-item">
//               <label>
//                 <strong>Batch Year:</strong>
//               </label>
//               <span>{student.Year}</span>
//             </div>
//           </div>
//           <div className="payment-section">
//             <Link to="/student/payment">
//               <button className="pay-online-btn">Pay Online</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import avengers from "../../../../assets/smile.jpg";
import { useStudent } from "../../../Context/StudentContext";


const Profile = () => {
  const { student, updateStudent } = useStudent();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const StudentId = localStorage.getItem('StudentId');
    const fetchStudentDetails = async () => {
      try {
        //const studentId = decoded.email;
        const response = await axios.get(
          `http://localhost:3000/api/students/details/${StudentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Student Data:", response.data);
        updateStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details", error);
      }
    };

    fetchStudentDetails();
  }, []);

  if (!student) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl font-semibold text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="pt-20 h-screen overflow-hidden flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl px-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 px-6 rounded-t-xl shadow-lg">
          <h1 className="text-2xl font-bold">National Engineering College</h1>
          <p className="text-sm font-light opacity-90">
            Excellence in Education
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-b-2xl p-6">
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
              src={avengers}
              alt="Profile"
            />
            <h2 className="text-xl font-semibold mt-2 text-gray-800">
              {student.Student_Name}
            </h2>
            <p className="text-gray-500">
              Semester: <span className="font-medium">Sixth</span>
            </p>
          </div>

          {/* Student Details */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between bg-gray-100 px-4 py-2 rounded-lg">
              <span className="font-medium text-gray-700">Student ID:</span>
              <span className="text-gray-600">{student.Student_Id}</span>
            </div>
            <div className="flex justify-between bg-gray-100 px-4 py-2 rounded-lg">
              <span className="font-medium text-gray-700">Branch:</span>
              <span className="text-gray-600">{student.Branch}</span>
            </div>
            <div className="flex justify-between bg-gray-100 px-4 py-2 rounded-lg">
              <span className="font-medium text-gray-700">Batch Year:</span>
              <span className="text-gray-600">{student.Year}</span>
            </div>
          </div>

          {/* Payment Button */}
          <div className="mt-5 flex justify-center">
            <Link to="/student/payment">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105">
                Pay Fees Online
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

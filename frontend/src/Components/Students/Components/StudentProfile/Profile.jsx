import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import avengers from "../../../../assets/smile.jpg";
import { useStudent } from "../../../Context/StudentContext";

const Profile = () => {
  const { student, updateStudent } = useStudent();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/students/details/2212049`
        );
        console.log("Student Data:", response.data);
        updateStudent(response.data); // Update student data using Context API
      } catch (error) {
        console.error("Error fetching student details", error);
      }
    };

    fetchStudentDetails();
  }, []);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="title-section">
        <h1 className="title">National Engineering College</h1>
      </div>
      <div className="profile-section">
        <div className="profile-header">
          <h1>Third Semester</h1>
          <img className="profile-photo" src={avengers} alt="Profile" />
        </div>
        <div className="fees-management-container">
          <div className="student-details">
            <div className="detail-item">
              <label>
                <strong>StudentID:</strong>
              </label>
              <span>{student.Student_Id}</span>
            </div>
            <div className="detail-item">
              <label>
                <strong>Name:</strong>
              </label>
              <span>{student.Student_Name}</span>
            </div>
            <div className="detail-item">
              <label>
                <strong>Branch:</strong>
              </label>
              <span>{student.Branch}</span>
            </div>
            <div className="detail-item">
              <label>
                <strong>Batch Year:</strong>
              </label>
              <span>{student.Year}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

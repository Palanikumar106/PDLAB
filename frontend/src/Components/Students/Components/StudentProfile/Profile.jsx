import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './profile.css'
import avengers from"../../../../assets/smile.jpg"

const Profile = () => {
    const [studentDetails, setStudentDetails] = useState(null);
    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const payload = await axios.get(`/api/students/details/2212049`);
                console.log(payload);
                setStudentDetails(payload.data);  
                } catch (error) {
                console.error("Error fetching student details", error);
            }
        };
        fetchStudentDetails();
    }, []);
    if (!studentDetails) {
        return <div>Loading...</div>;
    }

    return (<div className="profile-container">
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
                        <label><strong>StudentID:</strong></label>
                        <span>{studentDetails.Student_Id}</span>
                    </div>
                    <div className="detail-item">
                        <label><strong>Name:</strong></label>
                        <span>{studentDetails.Student_Name}</span>
                    </div>
                    <div className="detail-item">
                        <label><strong>Branch:</strong></label>
                        <span>{studentDetails.Branch}</span>
                    </div>
                    <div className="detail-item">
                        <label><strong>Batch Year:</strong></label>
                        <span>{studentDetails.Year}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
}

export default Profile;

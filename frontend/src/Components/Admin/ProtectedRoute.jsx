import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const authToken = localStorage.getItem("token"); // Check authentication
    const userRole = localStorage.getItem("role"); // Get user role

    if (!authToken) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />; // Redirect if role is not allowed
    }

    return <Outlet />;
};

export default ProtectedRoute;

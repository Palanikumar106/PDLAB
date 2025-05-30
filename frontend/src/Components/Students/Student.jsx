import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Profile from "./Components/StudentProfile/Profile";
import Header from "./Components/header/Header";
import Payment from "./Components/StudentProfile/Payment/Payment";
import SuccessPage from "./Components/StudentProfile/Payment/SuccessPage";
import Dashboard from "../Dashboard/Dashboard";
import CancelPage from "./Components/StudentProfile/Payment/CancelPage";
import History from "./Components/StudentProfile/history/history";
import ProtectedRoute from "../Admin/ProtectedRoute";

const StudentLayout = () => (
  <>
    <Header />
    <Outlet /> {/* This will render child routes */}
  </>
);

const Student = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
      <Route path="student" element={<StudentLayout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="payment" element={<Payment />} />
        <Route path="history" element={<History />} />
      </Route>
      </Route>
    </Routes>
  );
};

export default Student;

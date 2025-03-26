import React, { useState } from "react";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./Components/Login/LoginPage";
import Admin from "./Components/Admin/Admin";
import Student from "./Components/Students/Student";
import Dashboard from "./Components/Dashboard/Dashboard";
import SuccessPage from "./Components/Students/Components/StudentProfile/Payment/SuccessPage";
import CancelPage from "./Components/Students/Components/StudentProfile/Payment/CancelPage";
import Master from "./Components/Admin/Master/Master";
import Ledger from "./Components/Admin/Ledger/Ledger";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="success" element={<SuccessPage />} />
        <Route path="cancel" element={<CancelPage />} />
      </Routes>
      <Admin />
      <Student />
    </BrowserRouter>
  );
}

export default App;

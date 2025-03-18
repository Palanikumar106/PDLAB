import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import { Provider } from "react-redux";
import store from "./redux/store";
import Report from "./components/Admin/Report/Report";
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
      {isLoggedIn && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Dashboard /> : <LoginPage onLogin={handleLogin} />
          }
        />
        <Route path="/master" element={<Master />}></Route>
        <Route path="/ledger" element={<Ledger />}></Route>
        <Route path="/report" element={<Report />}></Route>
        <Route path="success" element={<SuccessPage />} />
        <Route path="cancel" element={<CancelPage />} />
      </Routes>
      <Admin />
      <Provider store={store}>
        <Student />
      </Provider>
    </BrowserRouter>
  );
}

export default App;

import React, { useState } from "react";
import './App.css'
import Header from './components/header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Master from './components/Admin/Master/Master';
import Ledger from './components/Admin/Ledger/Ledger';
import Report from './components/Admin/Report/Report';
import LoginPage from './Components/Login/LoginPage';
import Admin from "./Components/Admin/Admin";
import Student from "./Components/Students/Student";
import Payment from "./Components/Students/Components/StudentProfile/Payment";
import SuccessPage from "./Components/Students/Components/StudentProfile/SuccessPage";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
<BrowserRouter>
      {isLoggedIn && <Header />}  
<Routes>
        <Route path='/' element={isLoggedIn?<Dashboard/>:<LoginPage onLogin={handleLogin} />}/> 
        <Route path='/master' element={<Master/>}></Route>
        <Route path='/ledger' element={<Ledger/>}></Route>
        <Route path='/report' element={<Report/>}></Route>
        <Route path='/success' element={<SuccessPage />} />

</Routes>
 <Admin />
 <Student/>

</BrowserRouter>
  );
}

export default App;

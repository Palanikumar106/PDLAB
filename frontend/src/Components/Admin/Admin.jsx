import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import HeaderField from "./Master/component/Home/homeComponent/HeadField/headField";
import LedgerField from "./Master/component/Home/homeComponent/LedgerField/ledgerField";
import BankAccount from "./Master/component/Home/homeComponent/BankAccount/BankAccount";
import FinancialYearCreation from "./Master/component/Home/homeComponent/Year/YearAssign";
import FeesAllotment from "./Ledger/component/Home/homeComponent/Allotment/FeesAllotment";
import Dashboard from "../Dashboard/Dashboard";
import Master from "./Master/Master";
import Ledger from "./Ledger/Ledger";
import Header from "../header/Header";
import Report from "./Report/Report";

const AdminLayout = () => (
  <>
    <Header />
    <Outlet /> 
  </>
);
const Admin = () => {
  return (
    <Routes>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="master" element={<Master />}/>
        <Route path="ledger" element={<Ledger />}/>
        <Route path="report" element={<Report />}/>
        <Route path="year" element={<FinancialYearCreation />} />
        <Route path="headType" element={<HeaderField />} />
        <Route path="ledgerType" element={<LedgerField />} />
        <Route path="bankAccount" element={<BankAccount />} />
        <Route path="allotment" element={<FeesAllotment />} />
      </Route>
    </Routes>
  );
};

export default Admin;

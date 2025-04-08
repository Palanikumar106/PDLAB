import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "../header/Header";
import Dashboard from "../Dashboard/Dashboard";
import Master from "./Master/Master";
import Ledger from "./Ledger/Ledger";
import Report from "./Report/Report";
import FinancialYearCreation from "./Master/component/Home/homeComponent/Year/YearAssign";
import HeaderField from "./Master/component/Home/homeComponent/HeadField/headField"
import LedgerField from "./Master/component/Home/homeComponent/LedgerField/ledgerField";
import BankAccount from "./Master/component/Home/homeComponent/BankAccount/BankAccount";
import FeesAllotment from "./Ledger/component/Home/homeComponent/Allotment/FeesAllotment";

const AdminLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

const Admin = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="master" element={<Master />} />
          <Route path="ledger" element={<Ledger />} />
          <Route path="report" element={<Report />} />
        <Route path="year" element={<FinancialYearCreation />} />
          <Route path="headType" element={<HeaderField />} />
        <Route path="ledgerType" element={<LedgerField />} />
        <Route path="bankAccount" element={<BankAccount />} />
        <Route path="allotment" element={<FeesAllotment />} />
      </Route>
      </Route>
    </Routes>
  );
};

export default Admin;

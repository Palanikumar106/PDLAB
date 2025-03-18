import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import HeaderField from './Master/component/Home/homeComponent/HeadField/headField'
import LedgerField from './Master/component/Home/homeComponent/LedgerField/ledgerField'
import BankAccount from './Master/component/Home/homeComponent/BankAccount/BankAccount'
import FinancialYearCreation from './Master/component/Home/homeComponent/Year/YearAssign'
import FeesAllotment from './Ledger/component/Home/homeComponent/Allotment/FeesAllotment'

const Admin = () => {
  return (
      <Routes>
      <Route path="/year" element={<FinancialYearCreation />} />
      <Route path="/headType" element={<HeaderField/>}/>
      <Route path="/ledgerType" element={<LedgerField/>}/>
      <Route path='/bankAccount' element={<BankAccount/>}/>
      <Route path='/allotment' element={<FeesAllotment/>}/>
      </Routes>

  )
}

export default Admin
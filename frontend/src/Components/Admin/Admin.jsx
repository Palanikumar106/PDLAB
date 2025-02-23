import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import YearAssign from './Master/component/Home/homeComponent/Year/YearAssign'
import HeaderField from './Master/component/Home/homeComponent/HeadField/headField'
import LedgerField from './Master/component/Home/homeComponent/LedgerField/ledgerField'

const Admin = () => {
  return (
      <Routes>
      <Route path="/year" element={<YearAssign />} />
      <Route path="/headType" element={<HeaderField/>}/>
      <Route path="/feesType" element={<LedgerField/>}/>
      </Routes>

  )
}

export default Admin
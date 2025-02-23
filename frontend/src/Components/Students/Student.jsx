import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from './Components/StudentProfile/Profile'
import Header from './Components/header/Header'
import Payment from './Components/StudentProfile/Payment'
import History from './Components/history/history'
import Alerts from './Components/alerts/alerts'
import SuccessPage from './Components/StudentProfile/SuccessPage'

const Student = () => {
  return (
    <Routes>
        <Route path="/student" element={<Header/>}>
        <Route path="profile" element={<Profile/>}/>
       <Route path='payment' element={<Payment/>}/>
       <Route path='history' element={<History/>}/>
        <Route path='alerts' element={<Alerts />} />
        
        </Route>
    </Routes>
  )
}

export default Student
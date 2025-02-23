import React from 'react'
import SideBar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Header = () => {
  return (
    <>     
     <div className="header">
          <h1>Welcome, Shanmugam</h1>
      </div> 

      <SideBar/>
      <Outlet />

      </>

)
}

export default Header
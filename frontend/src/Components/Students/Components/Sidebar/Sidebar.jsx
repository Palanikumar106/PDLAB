import React from 'react'
import './Sidebar.css'
import { Link, Outlet } from 'react-router-dom'
const SideBar = () => {
    return (
        <div className='sidebar'>
            <div class="sideOptions">
                <Link to="profile" className='sideTag'><h3>Profile</h3></Link>
                <Link to="payment" className='sideTag'><h3>Payment</h3></Link>
                <Link to="history" className='sideTag'><h3>History</h3></Link>
                <Link to="alerts" className='sideTag'><h3>Alerts</h3></Link>

            </div>
            <button id="logOut">LogOut</button>

        </div>
    )
}

export default SideBar
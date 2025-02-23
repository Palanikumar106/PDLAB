import React, { useState } from 'react'
import './Header.css'
import { CiUser } from "react-icons/ci";
import { FaListUl } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import SideBar from '../sideBar/SideBar';

const Header = () => {
    const [click,assignClick]=useState(true);
    const sideBar=()=>{
        console.log(click);
        assignClick((prev)=>!prev);
    }
  return (
    <>
    <div className='header'>
          <Link onClick={sideBar}><FaListUl size={25} style={{marginTop:23,marginLeft:20}}/></Link>
          <h1 id="headTitle">Admin Portal</h1>
          <div className='headerSide'>
             <Link to="/" className='linkTag'><h3>Home</h3></Link>
              <Link><CiUser size={35}style={{marginRight:20}} /></Link>
          </div>
    </div>
    {(click)?<SideBar/>:<></>}
    </>
  )
}

export default Header
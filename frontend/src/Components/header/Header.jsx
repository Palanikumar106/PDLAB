// import React, { useState } from 'react'
// import { CiUser } from "react-icons/ci";
// import { FaListUl } from "react-icons/fa6";
// import { Link } from 'react-router-dom';
// import SideBar from '../sideBar/SideBar';

// const Header = () => {
//     const [click,assignClick]=useState(false);
//     const sideBar=()=>{
//         console.log(click);
//         assignClick((prev)=>!prev);
//     }
//   return (
//     <>
//     <div className='header'>
//           <Link onClick={sideBar}><FaListUl size={25} style={{marginTop:23,marginLeft:20}}/></Link>
//           <h1 id="headTitle">Admin Portal</h1>
//           <div className='headerSide'>
//              <Link to="/" className='linkTag'><h3>Home</h3></Link>
//               <Link><CiUser size={35}style={{marginRight:20}} /></Link>
//           </div>
//     </div>
//     {(click)?<SideBar/>:<></>}
//     </>
//   )
// }

// export default Header
// import React from "react";
// import { CiUser } from "react-icons/ci";
// import { FiLogOut } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <>
//       <div className="flex justify-between items-center bg-blue-600 text-white h-16 fixed top-0 left-0 right-0 w-full px-5 z-50">
//         <div className="w-1/4"></div>{" "}
//         {/* Empty div to balance flex alignment */}
//         <h1 className="text-xl font-bold text-center w-1/2">Admin Portal</h1>
//         <div className="flex items-center space-x-6 w-1/4 justify-end">
//           <Link to="/admin/master" className="text-white hover:text-yellow-400">
//             Master
//           </Link>
//           <Link to="/admin/ledger" className="text-white hover:text-yellow-400">
//             Ledger
//           </Link>
//           <Link to="/admin/report" className="text-white hover:text-yellow-400">
//             Report
//           </Link>
//           <Link
//             to="/admin/dashboard"
//             className="text-white hover:text-yellow-400"
//           >
//             Home
//           </Link>
//           {/* <Link className="text-white hover:text-yellow-400">
//             <CiUser size={35} />
//           </Link> */}
//           <Link to='/'>
//             <button className="text-white hover:text-yellow-400 text-2xl">
//               <FiLogOut />
//             </button>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;




import React from "react";
import { CiUser } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-blue-600 text-white fixed top-0 left-0 w-full h-16 flex justify-between items-center px-6 shadow-md z-50">
      <h1 className="text-xl font-bold flex-1 text-center">Admin Portal</h1>
      <div className="flex items-center space-x-6">
        <Link to="/admin/master" className="hover:text-yellow-400">
          Master
        </Link>
        <Link to="/admin/ledger" className="hover:text-yellow-400">
          Ledger
        </Link>
        <Link to="/admin/report" className="hover:text-yellow-400">
          Report
        </Link>
        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>
        <CiUser size={30} className="cursor-pointer hover:text-yellow-400" />
        <button className="text-2xl hover:text-yellow-400">
          <FiLogOut />
        </button>
      </div>
    </div>
  );
};

export default Header;

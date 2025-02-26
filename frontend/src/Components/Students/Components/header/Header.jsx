import React, { useState } from "react";
import SideBar from "../Sidebar/Sidebar";
import { Link, Outlet } from "react-router-dom";
// import React, { useState } from "react";
// import "./Header.css";
import { CiUser } from "react-icons/ci";
import { FaListUl } from "react-icons/fa6";
import { useStudent } from "../../../Context/StudentContext";
const Header = () => {
  const [click, assignClick] = useState(true);
  const sideBar = () => {
    console.log(click);
    assignClick((prev) => !prev);
  };
  const { student } = useStudent();
  return (
    <>
      <div className="header">
        <Link onClick={sideBar}>
          <FaListUl size={25} style={{ marginTop: 23, marginLeft: 20 }} />
        </Link>
        <h1 id="headTitle">
          {student.Student_Name} - {student.Student_Id}
        </h1>
        <div className="headerSide">
          <Link>
            <CiUser size={35} style={{ marginRight: 20 }} />
          </Link>
        </div>
      </div>
      {click ? <SideBar /> : <></>}
    </>
  );
};

export default Header;

import React from "react";
import { Link, Outlet } from "react-router-dom";
import LedgerCard from "../Card/LedgerCard";
import dolar from "../../../../../assets/dolar.png";

const LedgerHome = () => {
    const imgArr = [dolar];
    const optArr = ["Allotment"];
    const path = ["allotment"];

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {imgArr.map((img, index) => (
          <Link
            key={index}
            to={`/admin/${path[index]}`}
            className="transform transition-all duration-300 hover:scale-105"
          >
            <LedgerCard
              imges={img}
              options={optArr[index]}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition duration-300"
            />
          </Link>
        ))}
      </div>
      <div className="w-full mt-8">
        <Outlet />
      </div>
    </div >
  );
};

export default LedgerHome;
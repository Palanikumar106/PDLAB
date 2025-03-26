import React from "react";
import "./MasterCard.css";

const MasterCard = ({ imges, options }) => {
  return (
    <div className="card">
      <div className="mPara">
        <img src={imges} alt="card" height={70} width={100} />
      </div>
      <h4>{options}</h4>
    </div>
  );
};

export default MasterCard;

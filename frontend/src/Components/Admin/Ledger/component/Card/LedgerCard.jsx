import React from 'react';

const LedgerCard = ({ imges, options }) => {
  return (
    <div className="card">
      <div className="mPara">
        <img src={imges} alt="card" height={70} width={100} />
      </div>
      <h4>{options}</h4>
    </div>
  );
};

export default LedgerCard;

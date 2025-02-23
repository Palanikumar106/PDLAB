import React from 'react'
import YearList from './yearComponent/YearListCard/YearList'
import './YearAssign.css'
const YearAssign = () => {
  const arr=["2022-2026","2023-2027","2024-2028"]
  return (
    <div className='Admin'>
        <h1 id="yearTitle">Financial Year</h1>
      <button type='button' className='yearButton'>Add</button>

      <div className='yearAssign'>
            {arr.map((val,index)=>{
             return <YearList key={index} Year={val} />

            })
            }
      </div>
            <button type='button' className='yearButton'>Assign</button>

    </div>
  )
}

export default YearAssign
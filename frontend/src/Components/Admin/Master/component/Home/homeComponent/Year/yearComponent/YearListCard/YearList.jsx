import React from 'react'
import './YearList.css'

const YearList = ({Year}) => {
  return (
    <div className='yearCard'>
        <input type='checkbox'/>
         <h3>{Year} Academic Year</h3>
    </div>
  )
}

export default YearList
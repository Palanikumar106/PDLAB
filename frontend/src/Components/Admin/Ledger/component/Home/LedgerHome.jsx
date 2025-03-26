import React from 'react'
import dolar from '../../../../../assets/dolar.png'
import LedgerCard from '../Card/LedgerCard'
import { Link, Outlet } from 'react-router-dom'
const LedgerHome = () => {
    const imgArr = [dolar]
    const optArr=["Allotment"]
    const path=["allotment"]
  return (
      <div className='Home'>
          <div className='masterContent'>
              {imgArr.map((img, index) => (
                  <Link key={index} to={`/admin/${path[index]}`} className='linkTag'><LedgerCard imges={img} options={optArr[index]} /></Link>
              ))}
              </div>
            <Outlet/>
      </div>  
    )
}

export default LedgerHome
import React from 'react'
import dolar from '../../../../../assets/dolar.png'
import smile from '../../../../../assets/smile.jpg'
import user from '../../../../../assets/user.png'
import MasterCard from '../Card/MasterCard'
import './MasterHome.css'
import { Link, Outlet } from 'react-router-dom'
const MasterHome = () => {
    const imgArr = [dolar,smile,user,smile]
    const optArr=["Year","Header","Ledger","BankAccount"]
    const path=["year","headType","ledgerType","bankAccount"]
  return (
      <div className='Home'>
          <div className='masterContent'>
              {imgArr.map((img, index) => (
                  <Link key={index} to={`/${path[index]}`} className='linkTag'><MasterCard imges={img} options={optArr[index]} /></Link>
              ))}
              </div>
            <Outlet/>
      </div>  
    )
}

export default MasterHome
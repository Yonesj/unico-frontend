import React from 'react'
import MasterProf from "../../Assets/images/Ellipse 9.svg"
import "./MasterCard.css"
const MasterCard = () => {
  return (
    <div className='p-4 pt-6 bg-white w-[218px] h-[261px] flex justify-evenly items-center flex-col  rounded-xl cursor-pointer hover:bg-[#E5F7F8] transition-all z-10'>
      <div className='relative'>
        <img src={MasterProf} alt="" />
        {/* <div className='w-20 h-20 rounded-full absolute top-0 amin'></div> */}
        <svg className='absolute -top-2 -right-2' xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
          <path d="M48 2.23736C48 1.0017 49.0024 -0.00544297 50.2367 0.0521078C60.8016 0.544702 70.9323 4.51606 79.0329 11.3808C87.7035 18.7288 93.4856 28.9151 95.3499 40.1266C97.2141 51.3381 95.0396 62.8474 89.2135 72.6059C83.3873 82.3644 74.2874 89.739 63.5336 93.4171C52.7797 97.0951 41.0696 96.8379 30.4876 92.6913C19.9056 88.5448 11.1382 80.7778 5.74607 70.7729C0.3539 60.768 -1.31322 49.1744 1.04143 38.0555C3.24126 27.6678 8.818 18.3242 16.8684 11.4648C17.8089 10.6634 19.2181 10.8457 19.9748 11.8225C20.7315 12.7994 20.5487 14.2005 19.612 15.0064C12.3975 21.2136 7.39934 29.6316 5.41906 38.9826C3.28391 49.0649 4.79562 59.5777 9.68512 68.6499C14.5746 77.7221 22.5246 84.765 32.1202 88.5251C41.7157 92.2851 52.3341 92.5183 62.0855 89.1831C71.8368 85.848 80.0884 79.1609 85.3714 70.3121C90.6545 61.4633 92.6262 51.0269 90.9358 40.8606C89.2453 30.6942 84.0022 21.4576 76.1399 14.7946C68.8478 8.61493 59.7414 5.02102 50.2366 4.53219C49.0026 4.46872 48 3.47302 48 2.23736Z" fill="#92DEAC" />
        </svg>

      </div>
      <div className='text-center my-6'>
        <h4 className='font-medium text-sm'>مهران رضایی</h4>
        <p className='text-[#929292] font-normal text-xs mt-3 '>معماری کامپیوتر - ریزپردازنده
          گسسته  </p>
      </div>
      <hr className='w-full h-2 mb-3' />
      <p className='font-normal text-sm text-[#838383] font-iransansfa'>589 نظر</p>
    </div>
  )
}

export default MasterCard
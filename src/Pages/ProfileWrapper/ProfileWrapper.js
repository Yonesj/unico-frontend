import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import SidebarContext from "../../Components/SidbarContext/SidbarContext"; // adjust path as needed
import { Link } from 'react-router-dom';
const ProfileWrapper = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);


    return (
         <div className='p-4 relative bg-[#F1F5F7] overflow-hidden h-screen'>
            <div className='flex h-[5%] justify-between mb-3'>
                <div className='flex items-center gap-7'>
                    <button onClick={() => setIsSidebarOpen(prev => !prev)} className='lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 6H3M21 12H9M21 18H7" stroke="#4E535A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <p className='font-normal text-sm text-[#383E46]'>پروفایل کاربری</p>
                </div>


            </div>
            <div className='bg-white p-7 rounded-xl w-full'>
                <div className='mb-14'>
                    <ul className='flex gap-8 unit-header-ul items-center text-[#383E46] text-sm font-normal mb-4 '>
                        <li><NavLink to="/profile/userProfile">پروفایل کاربری</NavLink></li>
                        <li><NavLink to="/profile/notifications">اعلان ها</NavLink></li>
                        <li><NavLink to="/profile/userComments">نظرات من</NavLink></li>
                        <li><NavLink to="/profile/userTickets">تیکت های من</NavLink></li>
                    </ul>
                    <hr />
                </div>
                <Outlet/>
            </div>
           
         
        </div>
    )
}

export default ProfileWrapper
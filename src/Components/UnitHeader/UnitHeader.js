import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./UnitHeader.css"
const UnitHeader = () => {
    return (
       <div className='mb-3 h-[110px]'>
         <div className='flex justify-between py-4'>
            <p className='font-normal text-sm'><span className='text-[#7A7E83]'>انتخاب واحد</span> / برنامه هفتگی</p>
            <p className='flex gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7.99962 9.5H11.9996M7.99962 13H14.9996M12.4996 20C17.194 20 20.9996 16.1944 20.9996 11.5C20.9996 6.80558 17.194 3 12.4996 3C7.8052 3 3.99962 6.80558 3.99962 11.5C3.99962 12.45 4.15547 13.3636 4.443 14.2166C4.55119 14.5376 4.60529 14.6981 4.61505 14.8214C4.62469 14.9432 4.6174 15.0286 4.58728 15.1469C4.55677 15.2668 4.48942 15.3915 4.35472 15.6408L2.71906 18.6684C2.48575 19.1002 2.36909 19.3161 2.3952 19.4828C2.41794 19.6279 2.50337 19.7557 2.6288 19.8322C2.7728 19.9201 3.01692 19.8948 3.50517 19.8444L8.62619 19.315C8.78127 19.299 8.85881 19.291 8.92949 19.2937C8.999 19.2963 9.04807 19.3029 9.11586 19.3185C9.18478 19.3344 9.27145 19.3678 9.44478 19.4345C10.3928 19.7998 11.4228 20 12.4996 20Z" stroke="#919498" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className='text-sm font-normal text-[#919498]'>میدونستی میتونی رو فاصله های خالی برنامت کلیک کنی و لیست دروس مطابق اون تایمو ببینی؟</span>
            </p>
        </div>
        <div className='bg-white rounded-xl'>
            <ul className='flex justify-center unit-header-ul gap-[3%] px-5 py-1 text-[#7A7E83]  '>
                <li className='py-3 ' ><NavLink className="py-2.5 px-1.5 rounded-lg transition-all duration-200 hover:text-black hover:bg-[#E5F7F8]" to="/unit/courses">لیست دروس</NavLink></li>
                <li className='py-3 ' ><NavLink className="py-2.5 px-1.5 rounded-lg transition-all duration-200 hover:text-black hover:bg-[#E5F7F8]" to='/unit/schedule'>برنامه هفتگی</NavLink></li>
                <li className='py-3 ' ><NavLink className="py-2.5 px-1.5 rounded-lg transition-all duration-200 hover:text-black hover:bg-[#E5F7F8]" to="/unit/exams">برنامه امتحانی</NavLink></li>
                <li className='py-3 ' ><NavLink className="py-2.5 px-1.5 rounded-lg transition-all duration-200 hover:text-black hover:bg-[#E5F7F8]" to="/unit/schedules/1">لیست برنامه ها</NavLink></li>
            </ul>
        </div>
       </div>
    )
}

export default UnitHeader
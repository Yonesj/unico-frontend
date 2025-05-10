import RatingSlider from '../../Components/RatingSlider'
import React, { useContext, useState, useEffect } from 'react'
import ProfessorProf from "../../Assets/images/Rectangle 17.png"
import { Link, useNavigate } from 'react-router-dom'
import { Select } from 'antd';
import { Flex, Radio } from 'antd';
import { Outlet } from 'react-router-dom';
const PostCommentContainer = () => {
    const [searchDropdown, setSearchDropdown] = useState(false);
    const navigate = useNavigate();
    const [professorList, setProfessorList] = useState([]);


    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const res = await fetch("http://localhost:8000/professor-reviewer/professors/", {
                    method: "GET",
                    headers: {
                        "Accept-Language": "fa",
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    console.log("ok");
                    console.log(data); // use data directly here
                    setProfessorList(data);
                } else {
                    throw new Error(Object.values(data)[0] || "An error occurred");
                }

            } catch (err) {
                console.error("Error:", err.message);
            } finally {
                console.log("finally");
            }
        };

        fetchProfessors();
    }, []);
    return (
        <>
            <div className='h-[60px] px-6 lg:p-0 w-full bg-white rounded-xl flex justify-between relative text-[#959595] text-sm items-center font-medium'>
                <div className='flex gap-8 sm:gap-14 lg:gap-0 w-[90%]  lg:w-[70%] xl:w-[50%] lg:justify-around'>
                    <button onClick={() => navigate(-1)} className='flex gap-2 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#959595" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className='hidden lg:block'>بازگشت</p>
                    </button>
                    <div className='flex gap-3 md:gap-6 lg:gap-10 items-center' >
                        <div className='font-semibold text-xs lg:text-base'>
                            <button>ثبت نظر</button>
                        </div>
                        <div className='h-5 w-[1px]  bg-[#D8D8D8]'></div>

                        <div className='flex gap-6 items-center text-sm font-normal'>
                            <p className='font-semibold text-sm lg:text-base text-black'>استاد مهران رضایی</p>
                            <p className='hidden md:block text-xs lg:text-sm'>دانشکده مهندسی کامپیوتر</p>
                        </div>
                    </div>

                </div>

                <div className='w-[10%]  justify-end   lg:justify-normal lg:w-[30%] xl:w-[357px] flex items-center gap-2 '>

                    <svg className='cursor-pointer' onClick={() => setSearchDropdown(prev => !prev)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input onFocus={() => setSearchDropdown(true)}
                        onBlur={() => setSearchDropdown(false)}
                        className='w-full h-full  hidden lg:inline-block z-[53]' type="text" placeholder='نام استاد یا درس را وارد کنید' />
                    <div className={`${searchDropdown ? "" : "hidden"} lg:hidden z-[53] absolute left-0 w-full  flex gap-2 bg-white h-12 rounded-xl items-center px-4 `}>
                        <svg className='cursor-pointer' onClick={() => setSearchDropdown(prev => !prev)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input onFocus={() => setSearchDropdown(true)}
                            onBlur={() => setSearchDropdown(false)}
                            className='w-full h-full   z-[53]' type="text" placeholder='نام استاد یا درس را وارد کنید' />
                    </div>

                    <div className={`h-[198px] poll-container w-full lg:w-[375px] rounded-xl outline-none  bg-white absolute  border border-[#DDD] p-2  transition-all text-nowrap opacity-0 text-xs lg:text-sm overflow-y-auto overflow-x-hidden rounded-b-2xl  ${searchDropdown ? "opacity-100 z-[53]" : "pointer-events-none"} top-[60px] left-0`}>
                        {professorList.map((professor, index) => {
                            return (
                                <div key={index} className='flex gap-3.5 p-2  text-[#949494] items-center '>
                                    <img src={ProfessorProf} alt="" />
                                    <p className='font-semibold text-[#464646]'>{professor.first_name}  {professor.last_name}</p>
                                    <p>-</p>
                                    <p className=' font-normal'>{professor.courses.map((course, indx) => {
                                        return (
                                            <span>{course.name}</span>
                                        )
                                    })}</p>
                                </div>
                            )
                        })}
                    </div>
                    {searchDropdown && (
                        <div
                            className="lg:hidden fixed top-0 left-0 w-full h-full backdrop-blur-[5px] z-[52]"
                            onClick={() => setSearchDropdown(false)} // Clicking outside closes it
                            style={{ backgroundColor: "rgba(209, 209, 209, 0.31)" }}
                        />
                    )}

                    <div className='h-5 w-[1px] absolute bg-[#D8D8D8] hidden lg:block -right-5 top-1'></div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default PostCommentContainer
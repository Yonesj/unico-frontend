import RatingSlider from '../../Components/RatingSlider'
import React, { useContext, useState, useEffect } from 'react'
import ProfessorProf from "../../Assets/images/Rectangle 17.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Select } from 'antd';
import { Flex, Radio } from 'antd';
import { Outlet } from 'react-router-dom';
const PostCommentContainer = () => {
    const id = useParams().professor;

    const [searchDropdown, setSearchDropdown] = useState(false);
    const navigate = useNavigate();
    const [professorList, setProfessorList] = useState([]);


    const [professorName, setProfessorName] = useState("");
    useEffect(() => {
        const delayDebounce = setTimeout(() => {


            const fetchProfessors = async () => {
                try {
                    const params = new URLSearchParams({ search: professorName });
                    const res = await fetch(`http://localhost:8000/professor-reviewer/professors/?${params.toString()}`, {
                        method: "GET",
                        headers: {
                            "Accept-Language": "fa",
                            "Content-Type": "application/json",
                        },
                    });

                    const data = await res.json();
                    if (res.ok) {
                        setProfessorList(data);
                    } else {
                        throw new Error(Object.values(data)[0] || "An error occurred");
                    }
                } catch (err) {
                    console.error("Error:", err.message);
                }

            };

            fetchProfessors();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [professorName]);

    const [professorDetails, setProfessorDetails] = useState({});
    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const res = await fetch(`http://localhost:8000/professor-reviewer/professors/${id}`, {
                    method: "GET",
                    headers: {
                        "Accept-Language": "fa",
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    console.log("ok");
                    setProfessorDetails(data);



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
    }, [id]);

    return (
        <>
            <div className='h-[60px] px-6 lg:p-0 w-full bg-white rounded-xl flex justify-between relative text-[#959595] text-sm items-center font-medium'>
                <div className='flex gap-8 sm:gap-14 lg:gap-0 w-[90%]  lg:w-[70%] xl:w-[50%] lg:justify-around'>
                    <button onClick={() => navigate(-1)} className='flex gap-2 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#959595" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className='hidden lg:block'>بازگشت</p>
                    </button>
                    <div className='flex gap-3 md:gap-6 lg:gap-10 items-center' >
                        <div className='font-semibold text-xs lg:text-base'>
                            <p>ثبت نظر</p>
                        </div>
                        <div className='h-5 w-[1px]  bg-[#D8D8D8]'></div>

                        <div className='flex gap-6 items-center text-sm font-normal'>
                            <p className='font-semibold text-sm lg:text-base text-black'>استاد {professorDetails?.first_name} {professorDetails?.last_name}</p>
                            <p className='hidden md:block text-xs lg:text-sm'>دانشکده  {professorDetails?.faculty}</p>
                        </div>
                    </div>

                </div>

                <div className='w-[10%]  justify-end   lg:justify-normal lg:w-[30%] xl:w-[357px] flex items-center gap-2 '>

                    <button className='cursor-pointer'

                        onClick={() => setSearchDropdown(prev => !prev)}>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                        </svg></button>
                    <input onFocus={() => setSearchDropdown(true)}
                        onBlur={() => setSearchDropdown(false)}
                        onChange={(e) => setProfessorName(e.target.value)}

                        className='w-full h-full  hidden lg:inline-block z-[53]' type="text" placeholder='نام استاد یا درس را وارد کنید' />
                    <div className={`${searchDropdown ? "" : "hidden"} lg:hidden z-[53] absolute left-0 w-full  flex gap-2 bg-white h-12 rounded-xl items-center px-4 `}>
                        <svg className='cursor-pointer' onClick={() => setSearchDropdown(prev => !prev)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                        </svg>
                        <input onFocus={() => setSearchDropdown(true)}
                            onBlur={() => setSearchDropdown(false)}
                            onChange={(e) => setProfessorName(e.target.value)}

                            className='w-full h-full   z-[53]' type="text" placeholder='نام استاد یا درس را وارد کنید' />

                    </div>

                    <div className={`h-[198px] overscroll-contain poll-container w-full lg:w-[375px] rounded-xl outline-none  bg-white absolute  border border-[#DDD] p-2  transition-all text-nowrap opacity-0 text-xs lg:text-sm overflow-y-auto overflow-x-hidden rounded-b-2xl  ${searchDropdown ? "opacity-100 z-[53]" : "pointer-events-none"} top-[60px] left-0`}>
                        {professorList.map((professor, index) => {
                            return (
                                <div
                                    onMouseDown={(e) => {
                                        if (e.button === 0) {
                                            navigate(`/poll/ProfessorDetails/${professor.id}`);
                                            setProfessorName("");
                                        }
                                    }}
                                    key={index}
                                    className="flex items-center gap-3.5 p-2 text-[#949494] cursor-pointer"
                                >
                                    <img src={ProfessorProf} alt="" className="flex-shrink-0 w-8 h-8" />

                                    <p className="font-semibold text-[#464646] whitespace-nowrap">
                                        {professor.first_name} {professor.last_name}
                                    </p>

                                    <div className='h-[2px] w-2.5 bg-[#E3E3E3]'></div>

                                    <div className="flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                                        <div className="text-xs lg:text-sm text-[#949494] overflow-hidden whitespace-nowrap text-ellipsis">
                                            <span
                                                className="inline-block truncate max-w-full align-middle"
                                                title={professor.courses.map(c => c.name).join(' - ')}
                                            >
                                                {professor.courses.map((course, index) => (
                                                    <React.Fragment key={course.id}>
                                                        {course.name}
                                                        {index !== professor.courses.length - 1 && (
                                                            <span className="inline-block mx-2 align-middle">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                                                    <circle cx="1.5" cy="2" r="1.5" fill="#D9D9D9" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </span>
                                        </div>
                                    </div>
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
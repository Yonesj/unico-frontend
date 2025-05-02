import React, { useContext, useState } from 'react'
import Progresswheel from '../Progresswheel'
import profesorImg from "../../Assets/images/Rectangle 18.png"
import { Link } from 'react-router-dom'
import SidebarContext from "../../Components/SidbarContext/SidbarContext"; // adjust path as needed
import Progressbar from '../Progressbar';
import prof from "../../Assets/images/professor.svg"
import { Select } from 'antd';
import "./ProfessorDetails.css"
import UserComment from '../UserComment/UserComment';
import ProfessorProf from "../../Assets/images/Rectangle 17.png"
import { useNavigate } from 'react-router-dom';
 


const ProfessorDetails = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
    const [searchDropdown, setSearchDropdown] = useState(false);
    const navigate = useNavigate();



    return (
        <div>
           
            <div className='h-[60px] px-6 lg:p-0 w-full bg-white rounded-xl flex justify-between text-[#959595] text-sm items-center font-medium'>
                <div className='flex gap-14 lg:gap-0 w-[30%] sm:w-[70%] lg:w-[35%] lg:justify-around'>
                    <button onClick={()=>navigate(-1)} className='flex gap-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#959595" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className='hidden lg:block'>بازگشت</p>
                    </button>
                    <div className='hidden sm:block'>
                        <button>درخواست اصلاح اطلاعات</button>
                    </div>

                </div>
                <div className='w-[70%]  justify-end  sm:w-[30%]  lg:justify-normal lg:w-[357px] flex items-center gap-2 relative'>
                    <div className='lg:hidden'>
                        <button className='flex items-center gap-0.5 text-black'>
                            <p>مشاهده نظرات</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 19V5" stroke="#565656" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M17 14L12 19L7 14" stroke="#565656" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </button>
                    </div>
                    <div className='h-5 w-[1px]  bg-[#D8D8D8] lg:hidden'></div>
                    <svg className='cursor-pointer' onClick={()=> setSearchDropdown(prev => !prev)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <input onFocus={() => setSearchDropdown(true)}
                        onBlur={() => setSearchDropdown(false)}
                        className='w-full h-full  hidden lg:inline-block' type="text" placeholder='نام استاد یا درس را وارد کنید' />

                    <div className={`h-[198px] poll-container w-[300px] md:w-[375px] rounded-xl outline-none  bg-white absolute  border border-[#DDD] p-2  transition-all text-nowrap opacity-0 text-xs lg:text-sm overflow-y-auto overflow-x-hidden rounded-b-2xl  ${searchDropdown ? "opacity-100 z-10" : "pointer-events-none"} top-12 -left-6 lg:left-0`}>
                        <div className='flex gap-3.5 p-2  text-[#949494] items-center '>
                            <img src={ProfessorProf} alt="" />
                            <p className='font-semibold text-[#464646]'>مهران رضایی </p>
                            <p>-</p>
                            <p className=' font-normal'>معماری کامپیوتر . ریزپردازنده</p>
                        </div>
                        <div className='flex gap-3.5 p-2  text-[#949494] items-center '>
                            <img src={ProfessorProf} alt="" />
                            <p className='font-semibold text-[#464646]'>مهران رضایی </p>
                            <p>-</p>
                            <p className=' font-normal'>معماری کامپیوتر . ریزپردازنده</p>
                        </div>
                        <div className='flex gap-3.5 p-2  text-[#949494] items-center '>
                            <img src={ProfessorProf} alt="" />
                            <p className='font-semibold text-[#464646]'>مهران رضایی </p>
                            <p>-</p>
                            <p className=' font-normal'>معماری کامپیوتر . ریزپردازنده</p>
                        </div>
                        <div className='flex gap-3.5 p-2  text-[#949494] items-center '>
                            <img src={ProfessorProf} alt="" />
                            <p className='font-semibold text-[#464646]'>مهران رضایی </p>
                            <p>-</p>
                            <p className=' font-normal'>معماری کامپیوتر . ریزپردازنده</p>
                        </div>
                        <div className='flex gap-3.5 p-2  text-[#949494] items-center '>
                            <img src={ProfessorProf} alt="" />
                            <p className='font-semibold text-[#464646]'>مهران رضایی </p>
                            <p>-</p>
                            <p className=' font-normal'>معماری کامپیوتر . ریزپردازنده</p>
                        </div>
                        <div className='flex gap-3.5 p-2  text-[#949494] items-center '>
                            <img src={ProfessorProf} alt="" />
                            <p className='font-semibold text-[#464646]'>مهران رضایی </p>
                            <p>-</p>
                            <p className=' font-normal'>معماری کامپیوتر . ریزپردازنده</p>
                        </div>
                    </div>
                    <div className='h-5 w-[1px] absolute bg-[#D8D8D8] hidden lg:block -right-5 top-1'></div>
                </div>
            </div>
            <div className='lg:h-[284px] w-full flex gap-2.5 mt-2.5 flex-col lg:flex-row'>
                <div className='h-[120px] lg:h-full w-full  bg-white rounded-xl flex justify-center lg:hidden items-center'>
                    <Progresswheel size={80} />
                </div>
                <div className='hidden h-[120px] lg:h-full w-[20%] bg-white rounded-xl lg:flex justify-center items-center'>
                    <Progresswheel size={150} />
                </div>
                <div className='  bg-white flex justify-center lg:w-[80%] rounded-xl  overflow-hidden '>
                    <div className='h-[470px] lg:h-full overflow-hidden w-full sm:w-8/12 lg:w-full   border-2 border-solid border-white relative flex flex-col gap-9 lg:gap-0 lg:flex-row justify-around rounded-xl py-10 ' >
                        <div className='flex flex-col items-center px-3 md:px-7 gap-8 lg:gap-0'>
                            <div className='flex gap-2 md:gap-6 w-full lg:w-full '>
                                <div className='w-[70px] h-[70px]'>
                                    <img className='' src={profesorImg} alt="" />

                                </div>
                                <div className='text-sm'>
                                    <h4 className='text-base md:text-lg font-semibold'>استاد مهران رضایی</h4>
                                    <p className='text-xs md:text-sm mt-3.5 mb-2'>دانشکده مهندسی کامپیوتر</p>
                                    <div className='flex items-center gap-2 font-normal text-xs lg:text-sm text-[#949494]'>
                                        <p>گسسته</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                            <circle cx="1.5" cy="2" r="1.5" fill="#D9D9D9" />
                                        </svg>
                                        <p>معماری کامپیوتر</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                            <circle cx="1.5" cy="2" r="1.5" fill="#D9D9D9" />
                                        </svg>
                                        <p>ریزپردازنده</p>
                                    </div>
                                </div>

                            </div>
                            <div className='flex gap-4  lg:mt-12 w-full  lg:w-auto '>
                                <button onClick={()=>navigate("/poll/popular/ProfessorDetails/1/3")} style={{ background: 'linear-gradient(90deg, #33BDC4 0%, #3C6AA0 100%)' }} className='h-9 lg:h-[52px] w-1/2  lg:w-[187px] rounded-md lg:rounded-xl  text-white justify-center gap-2 flex items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 13.5V7.5M9 10.5H15M9.9 19.2L11.36 21.1467C11.5771 21.4362 11.6857 21.5809 11.8188 21.6327C11.9353 21.678 12.0647 21.678 12.1812 21.6327C12.3143 21.5809 12.4229 21.4362 12.64 21.1467L14.1 19.2C14.3931 18.8091 14.5397 18.6137 14.7185 18.4645C14.9569 18.2656 15.2383 18.1248 15.5405 18.0535C15.7671 18 16.0114 18 16.5 18C17.8978 18 18.5967 18 19.1481 17.7716C19.8831 17.4672 20.4672 16.8831 20.7716 16.1481C21 15.5967 21 14.8978 21 13.5V7.8C21 6.11984 21 5.27976 20.673 4.63803C20.3854 4.07354 19.9265 3.6146 19.362 3.32698C18.7202 3 17.8802 3 16.2 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V13.5C3 14.8978 3 15.5967 3.22836 16.1481C3.53284 16.8831 4.11687 17.4672 4.85195 17.7716C5.40326 18 6.10218 18 7.5 18C7.98858 18 8.23287 18 8.45951 18.0535C8.76169 18.1248 9.04312 18.2656 9.2815 18.4645C9.46028 18.6137 9.60685 18.8091 9.9 19.2Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <p>ثبت نظر</p>
                                </button>
                                <button className='w-1/2 h-9  lg:h-[52px] lg:w-[187px]  rounded-md lg:rounded-xl border border-[#4CC6CB] py-2 px-4    text-[#00ADB5] justify-center gap-2 flex items-center'>
                                    مقایسه</button>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 font-iransansfa text-xs md:text-sm items-center px-3 md:px-7 text-[#3C3C3C]'>
                            <div className='flex items-center w-full  lg:w-full gap-3.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <rect width="28" height="28" rx="6" fill="#F4F7F8" />
                                    <path d="M19.8042 17.8418L18.8267 16.8643C18.5922 16.63 18.2744 16.4983 17.9429 16.4983C17.6114 16.4983 17.2936 16.63 17.0592 16.8643L16.2908 17.6327C16.2077 17.7176 16.1009 17.7756 15.9844 17.7991C15.8679 17.8225 15.747 17.8104 15.6375 17.7643C14.445 17.233 13.3619 16.4844 12.4433 15.5568C11.5194 14.6415 10.773 13.563 10.2417 12.376C10.1935 12.2628 10.1807 12.1378 10.2047 12.0172C10.2288 11.8966 10.2887 11.7861 10.3767 11.7002L11.065 11.0118C11.1934 10.8977 11.2975 10.7588 11.3709 10.6034C11.4443 10.4481 11.4856 10.2795 11.4922 10.1077C11.4988 9.93604 11.4707 9.76477 11.4094 9.60422C11.3482 9.44367 11.2551 9.29716 11.1358 9.17349L10.1583 8.19599C9.84577 7.88353 9.42193 7.70801 8.97999 7.70801C8.53805 7.70801 8.1142 7.88353 7.80165 8.19599L7.25832 8.73849C6.95387 9.04895 6.73013 9.42928 6.60665 9.84621C6.48317 10.2631 6.46371 10.704 6.54999 11.1302C7.11148 13.6492 8.40479 15.9462 10.2675 17.7327C12.0539 19.5953 14.3509 20.8887 16.87 21.4502C17.2962 21.5364 17.737 21.517 18.1539 21.3935C18.5709 21.27 18.9512 21.0463 19.2617 20.7418L19.8042 20.1993C19.959 20.0445 20.0818 19.8608 20.1656 19.6585C20.2494 19.4563 20.2925 19.2395 20.2925 19.0206C20.2925 18.8016 20.2494 18.5849 20.1656 18.3826C20.0818 18.1804 19.959 17.9966 19.8042 17.8418V17.8418Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.8335 9.82564C15.2742 9.8184 15.7119 9.89987 16.1205 10.0652C16.529 10.2306 16.9002 10.4764 17.2118 10.7881" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19.5685 8.43189C18.9474 7.80914 18.2093 7.31526 17.3967 6.97861C16.5841 6.64197 15.7131 6.4692 14.8335 6.47022" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18.1744 13.1664C18.1817 12.7257 18.1002 12.288 17.9348 11.8795C17.7695 11.4709 17.5236 11.0997 17.2119 10.7881" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19.5684 8.43164C20.1911 9.05277 20.685 9.79083 21.0216 10.6034C21.3583 11.416 21.531 12.2871 21.53 13.1666" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p>031-10253264</p>
                            </div>
                            <div className='flex items-center w-full  lg:w-full gap-3.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <rect width="28" height="28" rx="6" fill="#F4F7F8" />
                                    <path d="M13.8335 18.0883L12.1085 19.7625C12.0402 19.8286 11.9561 19.876 11.8642 19.9002C11.7724 19.9245 11.6758 19.9247 11.5838 19.901C11.4918 19.8772 11.4075 19.8303 11.3388 19.7646C11.2702 19.6989 11.2196 19.6167 11.1918 19.5258L10.0435 15.75" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.7499 13.1059L12.4857 16.0518C12.4084 16.1216 12.3475 16.2079 12.3076 16.3042C12.2677 16.4005 12.2498 16.5045 12.255 16.6086C12.2603 16.7127 12.2887 16.8143 12.3381 16.9061C12.3875 16.9979 12.4567 17.0775 12.5407 17.1393L17.0224 20.4501C17.1236 20.526 17.2423 20.5751 17.3676 20.5928C17.4928 20.6105 17.6205 20.5962 17.7388 20.5513C17.8571 20.5064 17.962 20.4323 18.044 20.336C18.1259 20.2396 18.1821 20.124 18.2074 20.0001L20.4116 9.62759C20.4357 9.51382 20.4287 9.39563 20.3913 9.28552C20.3538 9.17541 20.2873 9.07745 20.1988 9.002C20.1103 8.92655 20.003 8.8764 19.8884 8.85685C19.7737 8.8373 19.6559 8.84907 19.5474 8.89092L6.61824 13.8776C6.53467 13.9095 6.46315 13.9668 6.41364 14.0413C6.36413 14.1158 6.33909 14.2039 6.34203 14.2933C6.34496 14.3828 6.37572 14.469 6.43001 14.5402C6.4843 14.6113 6.55942 14.6637 6.64491 14.6901L10.0424 15.7501" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p>MehranRezaee</p>
                            </div>
                            <div className='flex items-center w-full  lg:w-full gap-3.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <rect width="28" height="28" rx="6" fill="#F4F7F8" />
                                    <path d="M6.5 9.6515C6.49992 9.89404 6.55928 10.1329 6.67289 10.3472C6.78649 10.5615 6.95088 10.7446 7.15167 10.8807L12.1358 14.2582C12.6877 14.6322 13.3391 14.8321 14.0058 14.8321C14.6725 14.8321 15.3239 14.6322 15.8758 14.2582L20.8475 10.8882C21.0485 10.7525 21.2132 10.5696 21.3269 10.3554C21.4407 10.1412 21.5001 9.90236 21.5 9.65984V9.6515C21.5 9.25766 21.3435 8.87994 21.0651 8.60145C20.7866 8.32296 20.4088 8.1665 20.015 8.1665H7.985C7.59115 8.1665 7.21344 8.32296 6.93495 8.60145C6.65645 8.87994 6.5 9.25766 6.5 9.6515V9.6515Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.5 9.83301V18.1663C6.5 18.6084 6.67559 19.0323 6.98816 19.3449C7.30072 19.6574 7.72464 19.833 8.16667 19.833H19.8333C20.2754 19.833 20.6993 19.6574 21.0118 19.3449C21.3244 19.0323 21.5 18.6084 21.5 18.1663V9.83301" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.98828 19.3447L12.1049 14.228" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.9004 14.2339L21.0087 19.3422" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p>MehranRezaee@gmail.com</p>
                            </div>
                            <div className='flex items-center w-full  lg:w-full gap-3.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <rect width="28" height="28" rx="6" fill="#F4F7F8" />
                                    <path d="M14 6.5C15.9891 6.5 17.8968 7.29018 19.3033 8.6967C20.7098 10.1032 21.5 12.0109 21.5 14C21.5 15.9891 20.7098 17.8968 19.3033 19.3033C17.8968 20.7098 15.9891 21.5 14 21.5" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14 21.5C12.0109 21.5 10.1032 20.7098 8.6967 19.3033C7.29018 17.8968 6.5 15.9891 6.5 14C6.5 12.0109 7.29018 10.1032 8.6967 8.6967C10.1032 7.29018 12.0109 6.5 14 6.5" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.4732 7.38332C11.2907 9.38801 10.667 11.6729 10.667 14.0004C10.667 16.3279 11.2907 18.6128 12.4732 20.6175C12.6276 20.886 12.8501 21.109 13.1182 21.2641C13.3863 21.4192 13.6905 21.5008 14.0003 21.5008C14.31 21.5008 14.6142 21.4192 14.8823 21.2641C15.1504 21.109 15.3729 20.886 15.5273 20.6175C16.7098 18.6128 17.3335 16.3279 17.3335 14.0004C17.3335 11.6729 16.7098 9.38801 15.5273 7.38332C15.3729 7.11484 15.1504 6.89182 14.8823 6.73674C14.6142 6.58166 14.31 6.5 14.0003 6.5C13.6905 6.5 13.3863 6.58166 13.1182 6.73674C12.8501 6.89182 12.6276 7.11484 12.4732 7.38332V7.38332Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.5 14H21.5" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p>MehranRezaee.com</p>
                            </div>
                            <div className='flex items-center w-full  lg:w-full gap-3.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <rect width="28" height="28" rx="6" fill="#F4F7F8" />
                                    <path d="M11.5967 15.8223C8.635 16.2123 6.5 17.2998 6.5 18.5831C6.5 20.1939 9.8575 21.4998 14 21.4998C18.1425 21.4998 21.5 20.1939 21.5 18.5831C21.5 17.2998 19.365 16.2123 16.4033 15.8223" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19 10.5273C18.9813 9.21977 18.4441 7.97314 17.5065 7.0616C16.5689 6.15006 15.3076 5.64824 14 5.6665C12.6924 5.64824 11.4311 6.15006 10.4935 7.0616C9.55587 7.97314 9.01866 9.21977 9 10.5273C9 14.1732 14 18.1665 14 18.1665C14 18.1665 19 14.1732 19 10.5273Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.1785 9.48798C15.4116 9.72104 15.5704 10.018 15.6348 10.3413C15.6991 10.6646 15.6661 10.9998 15.54 11.3044C15.4139 11.6089 15.2003 11.8693 14.9262 12.0524C14.6521 12.2356 14.3298 12.3333 14.0002 12.3333C13.6705 12.3333 13.3483 12.2356 13.0742 12.0524C12.8001 11.8693 12.5864 11.6089 12.4603 11.3044C12.3342 10.9998 12.3012 10.6646 12.3656 10.3413C12.4299 10.018 12.5887 9.72104 12.8218 9.48798C13.1344 9.17553 13.5582 9 14.0002 9C14.4421 9 14.866 9.17553 15.1785 9.48798" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <p>دانشکده مهندسی کامپیوتر - اتاق 118</p>
                                <Link className="text-[#EFB036] underline underline-offset-[6px] text-nowrap" to="">برنامه حضور در دفتر</Link>
                            </div>
                        </div>
                        <div className='absolute left-28 top-7 hidden lg:inline-block'>
                            <svg xmlns="http://www.w3.org/2000/svg" className='hidden lg:inline-block w-[77px] h-[77px] md:w-[137px] md:h-[137px] lg:w-[157px] lg:h-[157px]' viewBox="0 0 137 137" fill="none">
                                <path opacity="0.15" d="M121.041 0.900877C134.505 0.900878 141.151 17.266 131.499 26.6536L73.8293 82.7452L25.7947 132.279C16.414 141.952 0.0264681 135.311 0.0264687 121.836L0.0264733 15.9009C0.0264737 7.61659 6.7422 0.900872 15.0265 0.900873L121.041 0.900877Z" fill="#EFB135" />
                            </svg>
                        </div>

                        <div className='absolute left-[120px] -top-0 hidden lg:inline-block'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="158" height="30" viewBox="0 0 158 30" fill="none">
                                <circle opacity="0.15" cx="79.3062" cy="-48.9292" r="78.6943" transform="rotate(90 79.3062 -48.9292)" fill="#33BDC4" />
                            </svg>
                        </div>
                        <div className='absolute -left-2 top-7 hidden lg:inline-block'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="121" height="157" viewBox="0 0 121 157" fill="none">
                                <circle opacity="0.15" cx="42.3304" cy="78.7155" r="78.2584" transform="rotate(90 42.3304 78.7155)" fill="#33BDC4" />
                            </svg>
                        </div>
                        <div className='hidden lg:inline-block absolute -left-10 w-[158px] h-[158px] bg-[#33BDC4] opacity-20 rounded-[22px] -top-[130px]'>

                        </div>

                    </div>
                </div>
            </div>
            <div className='flex flex-col xl:flex-row w-full mt-2.5 gap-2.5'>
                <div className='h-[350px] w-full xl:w-1/2 py-7 pb-11 px-0 lg:px-10 items-center bg-white rounded-xl text-[#717171] text-sm flex flex-col gap-7'>
                    <div className='h-[270px] w-11/12 sm:w-auto md:w-[70%]   xl:w-10/12 flex flex-col  justify-between text-nowrap'>
                        <p>میانگین نظر دانشجویان</p>

                        <div className='flex gap-3 items-center'>
                            <p className='w-[89px] text-xs lg:text-sm text-black'>نمره دهی</p>
                            <Progressbar value={93} strok={8} />
                            <p className="hidden md:block">دست باز و با ارفاق</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <p className='w-[89px] text-xs lg:text-sm text-black'>دانش عمومی</p>
                            <Progressbar value={77} strok={8} />
                            <p className="hidden md:block">دست باز و با ارفاق</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <p className='w-[89px] text-xs lg:text-sm text-black'>جذابیت تدریس</p>
                            <Progressbar value={93} strok={8} />
                            <p className="hidden md:block">دست باز و با ارفاق</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <p className='w-[89px] text-xs lg:text-sm text-black'>سختی تکالیف</p>
                            <Progressbar value={15} strok={8} />
                            <p className="hidden md:block">دست باز و با ارفاق</p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <p className='w-[89px] text-xs lg:text-sm text-black'>سختی امتحان</p>
                            <Progressbar value={10} strok={8} />
                            <p className="hidden md:block">دست باز و با ارفاق</p>
                        </div>
                    </div>
                </div>
                <div className='w-full xl:w-1/2 rounded-xl flex flex-col gap-2.5'>
                    <div className='h-[220px] lg:h-[170px]  flex flex-col lg:flex-row items-center justify-center bg-white rounded-xl '>
                        <div className='flex gap-5 mr-2 items-center w-[310px] lg:w-[35%]'>
                            <div className='w-14 h-14 lg:w-20 lg:h-20 flex justify-center items-center rounded-full bg-[#E5F7F8]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <path d="M15 18.75C10.8579 18.75 7.5 15.3921 7.5 11.25V4.30556C7.5 3.78825 7.5 3.52959 7.57538 3.32247C7.70176 2.97527 7.97527 2.70176 8.32247 2.57538C8.52959 2.5 8.78825 2.5 9.30556 2.5H20.6944C21.2118 2.5 21.4704 2.5 21.6775 2.57538C22.0247 2.70176 22.2982 2.97527 22.4246 3.32247C22.5 3.52959 22.5 3.78825 22.5 4.30556V11.25C22.5 15.3921 19.1421 18.75 15 18.75ZM15 18.75V22.5M22.5 5H25.625C26.2074 5 26.4986 5 26.7284 5.09515C27.0346 5.22202 27.278 5.46536 27.4048 5.77165C27.5 6.00136 27.5 6.29257 27.5 6.875V7.5C27.5 8.66246 27.5 9.2437 27.3722 9.72057C27.0255 11.0147 26.0147 12.0255 24.7206 12.3722C24.2437 12.5 23.6625 12.5 22.5 12.5M7.5 5H4.375C3.79257 5 3.50136 5 3.27165 5.09515C2.96536 5.22202 2.72202 5.46536 2.59515 5.77165C2.5 6.00136 2.5 6.29257 2.5 6.875V7.5C2.5 8.66246 2.5 9.2437 2.62778 9.72057C2.97453 11.0147 3.98533 12.0255 5.27943 12.3722C5.7563 12.5 6.33754 12.5 7.5 12.5M9.30556 27.5H20.6944C21.0013 27.5 21.25 27.2513 21.25 26.9444C21.25 24.4898 19.2602 22.5 16.8056 22.5H13.1944C10.7398 22.5 8.75 24.4898 8.75 26.9444C8.75 27.2513 8.99873 27.5 9.30556 27.5Z" stroke="#00ADB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div className='font-iransansfa text-[#7F7F7F] flex items-center lg:items-start lg:flex-col text-sm gap-3'>
                                <h1 className='text-3xl xl:text-[40px] font-semibold text-black'>99%</h1>
                                <p>دوباره انتخابش می‌کنند.</p>
                            </div>

                        </div>
                        <div className='border-r border-solid border-[#D4DEE3] h-[58px] mx-[5%] xl:mx-[7%] hidden lg:block'></div>
                        <div className=' w-[298px] bg-[#D4DEE3] h-[1px] my-4 lg:hidden'></div>

                        <div className='flex gap-5 mr-2 items-center  w-[310px] lg:w-[35%] '>
                            <div className='w-14 h-14 lg:w-20 lg:h-20 flex justify-center items-center rounded-full bg-[#E5F7F8]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                    <path d="M26.25 22.4998L24.9998 23.8674C24.3368 24.5925 23.4377 24.9998 22.5002 24.9998C21.5626 24.9998 20.6635 24.5925 20.0005 23.8674C19.3365 23.1437 18.4375 22.7374 17.5002 22.7374C16.563 22.7374 15.6639 23.1437 15 23.8674M3.75 24.9998H5.84318C6.45466 24.9998 6.76039 24.9998 7.04811 24.9307C7.3032 24.8695 7.54706 24.7685 7.77075 24.6314C8.02304 24.4768 8.23923 24.2606 8.67161 23.8282L24.375 8.1248C25.4106 7.08926 25.4106 5.41033 24.375 4.37479C23.3395 3.33926 21.6606 3.33926 20.625 4.37479L4.92158 20.0782C4.4892 20.5106 4.27301 20.7268 4.1184 20.9791C3.98133 21.2028 3.88032 21.4466 3.81908 21.7017C3.75 21.9894 3.75 22.2952 3.75 22.9067V24.9998Z" stroke="#00ADB5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div className='font-iransansfa text-[#7F7F7F] flex items-center lg:items-start  lg:flex-col text-sm gap-3'>
                                <h1 className='text-3xl xl:text-[40px] font-semibold text-black'>19.5</h1>
                                <p>میانگین نمرات</p>
                            </div>

                        </div>
                    </div>
                    <div className='h-[169px] px-3 sm:px-9 py-6 w-full flex flex-col justify-center gap-5 items-center bg-white rounded-xl'>
                        <div>
                            <p className='text-[#717171] text-sm mb-6'>اساتید مرتبط</p>
                            <div className='flex gap-10 sm:gap-12 xl:gap-4 text-xs sm:text-sm md:text-bace'>
                                <div className='flex gap-1.5 md:gap-4 w-[100px] items-center   sm:w-[161px] h-[58px]'>
                                    <img className='w-[42px] lg:w-[58px]' src={prof} alt="" />
                                    <p>احمدرضا منتظرالقائم</p>

                                </div>
                                <div className='flex gap-1.5 md:gap-4 w-[100px] items-center   sm:w-[161px] h-[58px]'>
                                    <img className='w-[42px] lg:w-[58px] ' src={prof} alt="" />
                                    <p>احمدرضا منتظرالقائم</p>

                                </div>
                                <div className='hidden sm:flex gap-1.5 md:gap-4 w-[100px] items-center   sm:w-[161px] h-[58px]'>
                                    <img className='w-[42px] lg:w-[58px] ' src={prof} alt="" />
                                    <p>احمدرضا منتظرالقائم</p>

                                </div>



                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-full px-3 md:px-0 lg:px-[37px] pt-8 flex flex-col  items-center rounded-xl mt-2.5  bg-white'>
                <div className='sm:w-8/12 lg:w-full'>
                    <div className='flex flex-col md:flex-row justify-center md:justify-between gap-6 lg:gap-0 items-start md:items-center'>
                        <div>
                            <p className='text-[#717171] text-sm lg:text-lg font-medium font-iransansfa'>585 امتیاز و دیدگاه دانشجویان</p>
                        </div>
                        <div className='flex gap-4 select-container'>
                            <div className='w-[109px] lg:w-[166px]'>
                                <Select
                                    className='border border-gray-500 border-solid font-iransansfa text-xs lg:text-[16px]' // Responsive font size
                                    defaultValue="همه ی دروس"
                                    style={{ width: 186 }}
                                    options={[
                                        { value: 'jack', label: 'همه ی دروس' },
                                        { value: 'lucy', label: 'همه ی دروس' },
                                        { value: 'Yiminghe', label: 'همه ی دروس' },
                                    ]}
                                />
                            </div>

                            <div>
                                <Select
                                    className='border border-gray-500 border-solid font-iransansfa'
                                    defaultValue="جدیدترین نظرات"
                                    style={{ width: 186 }}
                                    options={[
                                        { value: 'jack', label: 'جدیدترین نظرات' },
                                        { value: 'lucy', label: 'جدیدترین نظرات' },
                                        { value: 'Yiminghe', label: 'جدیدترین نظرات' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='w-full  p-5 border border-solid border-[#80D6DA] bg-[#E5F7F8] rounded-xl mt-6 mb-4'>
                        <div className='flex items-center gap-4'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                    <path d="M6.75 33V25.5M6.75 10.5V3M3 6.75H10.5M3 29.25H10.5M19.5 4.5L16.8987 11.2633C16.4757 12.3631 16.2642 12.9131 15.9353 13.3756C15.6438 13.7856 15.2856 14.1438 14.8756 14.4353C14.4131 14.7642 13.8631 14.9757 12.7633 15.3987L6 18L12.7633 20.6013C13.8631 21.0243 14.4131 21.2358 14.8756 21.5647C15.2856 21.8562 15.6438 22.2144 15.9353 22.6244C16.2642 23.0869 16.4757 23.6369 16.8987 24.7367L19.5 31.5L22.1013 24.7367C22.5243 23.6369 22.7358 23.0869 23.0647 22.6244C23.3562 22.2144 23.7144 21.8562 24.1244 21.5647C24.5869 21.2358 25.1369 21.0243 26.2367 20.6013L33 18L26.2367 15.3987C25.1369 14.9757 24.5869 14.7642 24.1244 14.4353C23.7144 14.1438 23.3562 13.7856 23.0647 13.3756C22.7358 12.9131 22.5243 12.3631 22.1013 11.2633L19.5 4.5Z" stroke="#9C67FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <h4 className='text-base text-[#1B1B1B] font-semibold'>خلاصه دیدگاه دانشجویان</h4>
                                <p className='text-sm text-[#888] font-medium'>تولید شده با هوش مصنوعی</p>
                            </div>
                        </div>
                        <p className='text-[#181818] font-normal text-base my-6'>این استاد از نظر دانشجویان استاد باسواد و بااخلاقی است که تدریس خوبی  دارد، اما گاهی تند درس می‌دهد و سوالات امتحانش سخت‌تر از مطالب کلاس است. برخی دانشجویان از نمره‌دهی سختگیرانه‌اش گله دارند، ولی اگر فعال باشید و تمرین حل کنید، شانس قبولی خوبی دارید. به طور کلی، اگر دنبال یادگیری  عمیق هستید، انتخاب خوبی است، ولی باید برای امتحانات سخت آماده باشید.</p>
                        <p className='text-[#9E9E9E] font-normal text-[13px]'>این خلاصه ممکن است دقیق نباشد</p>

                    </div>
                    <div className='flex flex-col gap-[60px]'>
                        <UserComment />
                        <UserComment />
                        <UserComment />
                        <UserComment />
                        <UserComment />

                    </div>
                </div>
                <div className='my-14'>
                    <button className='bg-[#F1F5F7] w-[147px] lg:w-[193px] px-3 py-1 lg:px-4 lg:py-2 text-[#919498] text-sm lg:text-base h-9 lg:h-12   rounded-xl '>نمایش نظرات بیشتر</button>
                </div>
            </div>

        </div>
    )
}

export default ProfessorDetails
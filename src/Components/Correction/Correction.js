import React, { useContext, useState, useRef } from 'react'
import Progresswheel from '../Progresswheel'
import profesorImg from "../../Assets/images/Rectangle 18.png"
import { Link } from 'react-router-dom'
import SidebarContext from "../../Components/SidbarContext/SidbarContext"; // adjust path as needed
import Progressbar from '../Progressbar';
import prof from "../../Assets/images/professor.svg"
import { Select } from 'antd';
import UserComment from '../UserComment/UserComment';
import ProfessorProf from "../../Assets/images/Rectangle 17.png"
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const Correction = () => {
    const [searchDropdown, setSearchDropdown] = useState(false);
    const navigate = useNavigate();
    const commentsRef = useRef(null);
    return (
        <div>
            <div className='h-[60px] px-6 lg:p-0 w-full mb-2.5 bg-white rounded-xl flex justify-between text-[#959595] text-sm items-center font-medium'>
                <div className='flex gap-14 lg:gap-0 w-[30%] sm:w-[70%] lg:w-[35%] items-center lg:mr-9'>
                    <button onClick={() => navigate(-1)} className='flex gap-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#959595" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className='hidden lg:block'>بازگشت</p>
                    </button>


                </div>
                <div className='w-[70%]  justify-end  sm:w-[30%]  lg:justify-normal lg:w-[357px] flex items-center gap-2 relative'>

                    <svg className='cursor-pointer' onClick={() => setSearchDropdown(prev => !prev)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
            <div className=' px-[5%] font-iransansfa  md:px-[20%] lg:px-8 w-full flex flex-col gap-9 lg:gap-0 bg-white rounded-xl p-8 '>
                <h5 className='font-medium text-sm lg:text-base lg:mb-12'>درخواست اصلاح اطلاعات استاد</h5>
                <div>
                    <div className='w-full flex flex-col lg:flex-row mb-12 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2 items-center'>
                            <label className='w-full  lg:w-[82px] font-normal text-sm lg:text-base' htmlFor="">نام استاد :</label>
                            <input className='w-full lg:w-3/5 py-1.5 px-3 text-sm lg:text-base rounded-md h-10 text-[#8B8B8B] bg-[#F1F1F1]' type="text" placeholder='' disabled value="مهران" />
                        </div>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2 items-center'>
                            <label className='w-full lg:w-auto  lg:font-normal text-sm lg:text-base' htmlFor="">نام خانوادگی استاد :</label>
                            <input className='w-full lg:w-3/5 py-1.5 px-3 rounded-md h-10 text-[#8B8B8B] bg-[#F1F1F1] text-sm lg:text-base' type="text" placeholder='' disabled value="رضایی" />
                        </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row mb-8 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2  items-center'>
                            <label className='w-full  lg:w-[82px] font-normal text-sm lg:text-base' htmlFor="">دانشکده <span>*</span>  :</label>
                            <div className='w-full lg:w-3/5'>
                                <Select
                                    className='border  border-gray-500 border-solid h-10 font-iransansfa text-xs lg:text-base' // Responsive font size
                                    defaultValue="مهندسی کامپیوتر"
                                    style={{ width: 186 }}
                                    options={[
                                        { value: 'jack', label: 'همه ی دروس' },
                                        { value: 'lucy', label: 'همه ی دروس' },
                                        { value: 'Yiminghe', label: 'همه ی دروس' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2 items-center'>
                            <label className='w-full text-sm lg:text-base lg:font-normal lg:text-left  lg:w-[130px]' htmlFor="">دروس <span>*</span> :</label>
                            <input className='w-full text-sm lg:text-base lg:w-3/5 py-1.5 px-3 rounded-md h-10 text-[#8B8B8B] bg-[#F1F1F1]' type="text" placeholder='' disabled value="رضایی" />
                        </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row mb-8 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2  items-center'>
                            <label className='w-full  lg:w-[82px] font-normal text-sm lg:text-base' htmlFor="">شماره تلفن :</label>
                            <input className='w-full text-sm lg:text-base lg:w-3/5 py-1.5 px-3 rounded-md h-10 text-[#8B8B8B] border border-solid border-[#D9D9D9]' type="text" placeholder='031-00000000' />
                        </div>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2 items-center'>
                            <label className='w-full text-sm lg:text-base lg:font-normal lg:text-left  lg:w-[130px]' htmlFor="">ایمیل :</label>
                            <input className='w-full text-sm lg:text-base lg:w-3/5 py-1.5 px-3 rounded-md h-10 text-[#8B8B8B] border border-solid border-[#D9D9D9]' type="email" placeholder='example@gmail.com' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row mb-8 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2  items-center'>
                            <label className='w-full  lg:w-[88px] font-normal text-sm lg:text-base' htmlFor="">آدرس سایت :</label>
                            <input className='w-full text-sm lg:text-base lg:w-3/5 py-1.5 px-3 rounded-md h-10 text-[#8B8B8B] border border-solid border-[#D9D9D9]' type="text" placeholder='example.ir' />
                        </div>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2 items-center'>
                            <label className='w-full text-sm lg:text-base lg:font-normal lg:text-left  lg:w-[130px]' htmlFor="">آی دی تلگرام :</label>
                            <input className='w-full text-sm lg:text-base lg:w-3/5 py-1.5 px-3 rounded-md h-10 text-[#8B8B8B] border border-solid border-[#D9D9D9]' type="text" placeholder='@example' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row mb-12 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full  items-center'>
                            <label className='w-full  lg:w-[88px] font-normal text-sm lg:text-base' htmlFor="">آدرس دفتر :</label>
                            <input className='w-full text-sm lg:text-base lg:w-10/12 py-1.5 px-3 rounded-md h-10 text-[#8B8B8B] border border-solid border-[#D9D9D9]' type="text" placeholder='دانشکده مهندسی کامپیوتر - طبقه 2 - اتاق 110' />
                        </div>

                    </div>
                    <div className='w-full flex flex-col lg:flex-row mb-12 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full  items-center'>
                            <label className='w-full  lg:w-[88px] font-normal text-sm lg:text-base' htmlFor="">تصویر استاد :</label>
                            <div className='w-full lg:w-auto'>
                                <Upload {...props}>
                                    <Button className='text-[#383E46] custom-upload-button  w-full lg:w-[400px] h-[52px] font-iransans flex-row-reverse ' icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M17.5 12.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V12.5M14.1667 6.66667L10 2.5M10 2.5L5.83333 6.66667M10 2.5V12.5" stroke="#BFBFBF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>}>
                                        برای بارگذاری کلیک کنید
                                    </Button>
                                </Upload>

                            </div>
                        </div>

                    </div>
                    <div>
                        <button className='w-full lg:w-[293px] h-[52px] py-2 px-[15px] rounded-xl bg-[#4CC6CB] hover:bg-[#33BDC4] transition-all text-white mr-2 '>ثبت درخواست اصلاح</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Correction
import React, { useContext, useState, useRef, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

import prof from "../../Assets/images/professor.svg"
import { Select } from 'antd';
import ProfessorProf from "../../Assets/images/Rectangle 17.png"
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { DownOutlined } from '@ant-design/icons'; // or any icon you want
import { Modal } from 'antd';
import "../../Components/Revisions/Revisions.css"
import Progresswheel from '../../Components/Progresswheel';
import Progressbar from '../../Components/Progressbar';


const CompareProfessor = () => {
    const [addCourseModal, setAddCourseModal] = useState(false);

    const [fileList, setFileList] = useState([]);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const props = {
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('فقط فایل‌های تصویری مجاز هستند.');
                return false;
            }

            setFileToUpload(file);
            setFileList([file]);
            setPreviewUrl(URL.createObjectURL(file)); // Preview image

            return false; // Prevent auto-upload
        },
        onRemove: () => {
            setFileList([]);
            setFileToUpload(null);
            setPreviewUrl(null);
        },
        fileList,
    };
    const [professorList, setProfessorList] = useState([]);
    const [professorDetails, setProfessorDetails] = useState({});
    const id = useParams().professor;

    const [options, setOptions] = useState([
        { value: 'all', label: 'همه ی دروس' }
    ]);



    const [professorCourses, setProfessorCourses] = useState([]);

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
                    setProfessorCourses(data.courses);




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

    const [facultiesList, setFacultiesList] = useState([]);

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const res = await fetch(`http://localhost:8000/professor-reviewer/faculties/`, {
                    method: "GET",
                    headers: {
                        "Accept-Language": "fa",
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    console.log("ok");
                    setFacultiesList(data);
                    const courseOptions = data.map(course => ({
                        value: course.id, // or course.slug, etc.
                        label: course.name
                    }));
                    setOptions([{ value: 'all', label: 'همه ی دروس' }, ...courseOptions]);
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

    const [searchDropdown, setSearchDropdown] = useState(false);
    const [coursesDropdown, setCoursesDropdown] = useState(false);
    const navigate = useNavigate();
    const commentsRef = useRef(null);

    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const res = await fetch(`http://localhost:8000/professor-reviewer/courses/`, {
                    method: "GET",
                    headers: {
                        "Accept-Language": "fa",
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    console.log("ok");
                    setCourseList(data);



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


    const emailRef = useRef(professorDetails.email);

    const [newEmail, setNewEmail] = useState("");
    const [newTelegram, setNewTelegram] = useState("");
    const [newWebsite, setNewWebsite] = useState("");
    const [newOfficeNumber, setNewOfficeNumber] = useState("");
    const [newOfficeLocation, setNewOfficeLocation] = useState("");

    const removeCourse = (id) => {
        setProfessorCourses((prevCourses) => prevCourses.filter(course => course.id !== id));
    };

    const [courseName, setCourseName] = useState('');


    const newCourse = {
        id: courseList.length > 0 ? courseList[courseList.length - 1].id + 1 : 1,
        name: courseName.trim()
    };

    const addNewcourse = () => {
        if (!courseName.trim()) return; // Prevent adding empty names

        const newCourse = {
            id: courseList.length > 0 ? courseList[courseList.length - 1].id + 1 : 1,
            name: courseName.trim()
        };

        setProfessorCourses([...professorCourses, newCourse]);
        setCourseName('');
        setAddCourseModal(false);
    };
    const addCourse = (course) => {
        // Prevent duplicates
        if (!professorCourses.some(c => c.id === course.id)) {
            setProfessorCourses([...professorCourses, course]);
        }
    };

    return (
        <div>
            <div className='h-[60px] px-6 lg:p-0 w-full mb-2.5 bg-white rounded-xl flex relative justify-between text-[#959595] text-sm items-center font-medium'>
                <div className='flex gap-14 lg:gap-0 w-[30%] sm:w-[70%] lg:w-[35%] items-center lg:mr-9'>
                    <button onClick={() => navigate(-1)} className='flex gap-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#959595" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className='hidden lg:block'>بازگشت</p>
                    </button>


                </div>
                <div className='w-[70%]  justify-end  sm:w-[30%]  lg:justify-normal lg:w-[357px] flex items-center gap-2 '>

                    <button className='cursor-pointer' onBlur={() => setTimeout(() => setSearchDropdown(false), 100)}

                        onClick={() => setSearchDropdown(prev => !prev)}>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></button>
                    <input onFocus={() => setSearchDropdown(true)}
                        onBlur={() => setTimeout(() => setSearchDropdown(false), 100)}
                        className='w-full h-full  hidden lg:inline-block' type="text" placeholder='نام استاد یا درس را وارد کنید' />
                    <div className={`${searchDropdown ? "" : "hidden"} lg:hidden z-[53] absolute left-0 w-[100%]  flex gap-2 bg-white h-12 rounded-xl items-center px-4 `}>
                        <svg className='cursor-pointer' onClick={() => setSearchDropdown(prev => !prev)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input onFocus={() => setSearchDropdown(true)}
                            onBlur={() => setTimeout(() => setSearchDropdown(false), 100)}
                            className='w-full h-full   z-[53]' type="text" placeholder='نام استاد یا درس را وارد کنید' />
                    </div>

                    <div className={`h-[198px] poll-container w-[100%]  lg:w-[375px] rounded-xl outline-none  bg-white absolute  border border-[#DDD] p-2  transition-all text-nowrap opacity-0 text-xs lg:text-sm overflow-y-auto overflow-x-hidden rounded-b-2xl  ${searchDropdown ? "opacity-100 z-[53]" : "pointer-events-none"} top-[60px] lg:top-16 left-0`}>
                        {professorList.map((professor, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        navigate(`/poll/ProfessorDetails/${professor.id}`);

                                    }}
                                    key={index}
                                    className="flex items-center gap-3.5 p-2 text-[#949494] cursor-pointer"
                                >
                                    <img src={ProfessorProf} alt="" className="flex-shrink-0 w-8 h-8" />

                                    <p className="font-semibold text-[#464646] whitespace-nowrap">
                                        {professor.first_name} {professor.last_name}
                                    </p>

                                    <div className='h-[2px] w-2.5 bg-[#E3E3E3]'></div>

                                    <div className="flex-1 overflow-hidden">
                                        <div className="flex flex-wrap gap-1 overflow-hidden text-ellipsis">
                                            {professor.courses.map((course, indx) => (
                                                <span
                                                    key={indx}
                                                    className="truncate inline-block max-w-full"
                                                    title={course.name}
                                                >
                                                    {course.name}
                                                </span>
                                            ))}
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

            <div className=' w-full bg-white  px-[5%] font-iransansfa   lg:px-8  flex flex-col gap-9 lg:gap-0  rounded-xl p-8 '>
                <h5 className='font-medium text-sm lg:text-base lg:mb-12'>مقایسه اساتید</h5>
                <div className='flex flex-wrap justify-evenly'>
                    <div className='flex-1 py-3 border-l border-[#F0F0F0]  flex flex-col  items-center'>
                        <button className='w-11/12'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17.9995 6L5.99951 18M5.99951 6L17.9995 18" stroke="#7A7E83" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <div className='md:hidden mb-6'>
                            <Progresswheel
                                score={
                                    professorDetails.overall_rating
                                        ? Number(Number(professorDetails.overall_rating).toFixed(1))
                                        : 0
                                }
                                size={92}



                                compare={true}
                            />
                        </div>
                        <div className='hidden h-[126px] mb-6 md:block'>
                            <Progresswheel
                                score={
                                    professorDetails.overall_rating
                                        ? Number(Number(professorDetails.overall_rating).toFixed(1))
                                        : 0
                                }
                                size={126}



                                compare={true}
                            />
                        </div>

                        <div className='flex flex-col items-center'>
                            <p className='text-sm lg:text-lg font-semibold'>استاد {professorDetails?.first_name} {professorDetails?.last_name}</p>
                            <p className='mb-2 mt-1.5 text-xs text-center lg:text-sm'>دانشکده {professorDetails?.faculty} </p>
                            <div className='flex gap-2 items-center '>
                                {professorDetails?.courses?.map((course) => {
                                    return (
                                        <div className='flex gap-2 items-center text-center text-[#949494] text-xs lg:text-sm font-normal'>
                                            <p key={course.id}>{course.name}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                                <circle cx="1.5" cy="1.66797" r="1.5" fill="#D9D9D9" />
                                            </svg>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='w-full  text-center p-2 md:p-6  bg-[#FAFAFA] border border-[#F0F0F0] mt-10 border-r-0'>
                            <p className='mb-5'>{professorDetails?.reviews_count} نظر</p>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>نمره دهی</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.grading_avg).toFixed(1) * 5} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>دانش عمومی</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.general_knowledge_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>جذابیت تدریس</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.teaching_engagement_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>سختی تکالیف</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.homework_difficulty_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>سختی امتحان</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.exam_difficulty_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>

                            </div>
                        </div>
                        <div className='w-full py-7 border-b border-[#F0F0F0] text-center'>
                            <h1 className='text-[32px] lg:text-[40px] font-semibold'>{Number(professorDetails?.average_would_take_again)*20}%</h1>
                            <p className='text-xs lg:text-sm text-[#7F7F7F] font-medium'>دوباره انتخابش می‌کنند.</p>
                        </div>
                        <div className='py-7 text-center'>
                            <h1 className='text-[32px] lg:text-[40px] font-semibold'>{Number(professorDetails?.student_scores_avg)}</h1>
                            <p className='text-xs lg:text-sm text-[#7F7F7F] font-medium'>میانگین نمرات</p>
                        </div>
                    </div>
                    <div className='flex-1 py-3  flex flex-col  items-center'>
                        <button className='w-11/12'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17.9995 6L5.99951 18M5.99951 6L17.9995 18" stroke="#7A7E83" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <div className='md:hidden mb-6'>
                            <Progresswheel
                                score={
                                    professorDetails.overall_rating
                                        ? Number(Number(professorDetails.overall_rating).toFixed(1))
                                        : 0
                                }
                                size={92}



                                compare={true}
                            />
                        </div>
                        <div className='hidden h-[126px] mb-6 md:block'>
                            <Progresswheel
                                score={
                                    professorDetails.overall_rating
                                        ? Number(Number(professorDetails.overall_rating).toFixed(1))
                                        : 0
                                }
                                size={126}



                                compare={true}
                            />
                        </div>

                        <div className='flex flex-col items-center'>
                            <p className='text-sm lg:text-lg font-semibold'>استاد {professorDetails?.first_name} {professorDetails?.last_name}</p>
                            <p className='mb-2 mt-1.5 text-xs text-center lg:text-sm'>دانشکده {professorDetails?.faculty} </p>
                            <div className='flex gap-2 items-center '>
                                {professorDetails?.courses?.map((course) => {
                                    return (
                                        <div className='flex gap-2 items-center text-center text-[#949494] text-xs lg:text-sm font-normal'>
                                            <p key={course.id}>{course.name}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                                <circle cx="1.5" cy="1.66797" r="1.5" fill="#D9D9D9" />
                                            </svg>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='w-full  text-center p-2 md:p-6  bg-[#FAFAFA] border border-[#F0F0F0] mt-10 border-r-0'>
                            <p className='mb-5'>{professorDetails?.reviews_count} نظر</p>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>نمره دهی</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.grading_avg).toFixed(1) * 5} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>دانش عمومی</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.general_knowledge_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>جذابیت تدریس</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.teaching_engagement_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>سختی تکالیف</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.homework_difficulty_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>سختی امتحان</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.exam_difficulty_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>

                            </div>
                        </div>
                        <div className='w-full py-7 border-b border-[#F0F0F0] text-center'>
                            <h1 className='text-[32px] lg:text-[40px] font-semibold'>{Number(professorDetails?.average_would_take_again)*20}%</h1>
                            <p className='text-xs lg:text-sm text-[#7F7F7F] font-medium'>دوباره انتخابش می‌کنند.</p>
                        </div>
                        <div className='py-7 text-center'>
                            <h1 className='text-[32px] lg:text-[40px] font-semibold'>{Number(professorDetails?.student_scores_avg)}</h1>
                            <p className='text-xs lg:text-sm text-[#7F7F7F] font-medium'>میانگین نمرات</p>
                        </div>
                    </div>
                
                    <div className='flex-1 py-3 border-r border-[#F0F0F0] hidden  lg:flex   flex-col  items-center'>
                        <button className='w-11/12'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17.9995 6L5.99951 18M5.99951 6L17.9995 18" stroke="#7A7E83" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <div className='md:hidden mb-6'>
                            <Progresswheel
                                score={
                                    professorDetails.overall_rating
                                        ? Number(Number(professorDetails.overall_rating).toFixed(1))
                                        : 0
                                }
                                size={92}



                                compare={true}
                            />
                        </div>
                        <div className='hidden h-[126px] mb-6 md:block'>
                            <Progresswheel
                                score={
                                    professorDetails.overall_rating
                                        ? Number(Number(professorDetails.overall_rating).toFixed(1))
                                        : 0
                                }
                                size={126}



                                compare={true}
                            />
                        </div>

                        <div className='flex flex-col items-center'>
                            <p className='text-sm lg:text-lg font-semibold'>استاد {professorDetails?.first_name} {professorDetails?.last_name}</p>
                            <p className='mb-2 mt-1.5 text-xs text-center lg:text-sm'>دانشکده {professorDetails?.faculty} </p>
                            <div className='flex gap-2 items-center '>
                                {professorDetails?.courses?.map((course) => {
                                    return (
                                        <div className='flex gap-2 items-center text-center text-[#949494] text-xs lg:text-sm font-normal'>
                                            <p key={course.id}>{course.name}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                                <circle cx="1.5" cy="1.66797" r="1.5" fill="#D9D9D9" />
                                            </svg>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='w-full  text-center p-6  bg-[#FAFAFA] border border-[#F0F0F0] mt-10 border-r-0'>
                            <p className='mb-5'>{professorDetails?.reviews_count} نظر</p>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>نمره دهی</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.grading_avg).toFixed(1) * 5} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>دانش عمومی</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.general_knowledge_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>جذابیت تدریس</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.teaching_engagement_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>سختی تکالیف</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.homework_difficulty_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>سختی امتحان</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.exam_difficulty_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>

                            </div>
                        </div>
                        <div className='w-full py-7 border-b border-[#F0F0F0] text-center'>
                            <h1 className='text-[32px] lg:text-[40px] font-semibold'>{Number(professorDetails?.average_would_take_again)*20}%</h1>
                            <p className='text-xs lg:text-sm text-[#7F7F7F] font-medium'>دوباره انتخابش می‌کنند.</p>
                        </div>
                        <div className='py-7 text-center'>
                            <h1 className='text-[32px] lg:text-[40px] font-semibold'>{Number(professorDetails?.student_scores_avg)}</h1>
                            <p className='text-xs lg:text-sm text-[#7F7F7F] font-medium'>میانگین نمرات</p>
                        </div>
                    </div>
                    <div className='flex-1 py-3 border-r border-[#F0F0F0] hidden  xl:flex   flex-col  items-center'>
                        <button className='w-11/12'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17.9995 6L5.99951 18M5.99951 6L17.9995 18" stroke="#7A7E83" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <div className='md:hidden mb-6'>
                            <Progresswheel
                                score={
                                    professorDetails.overall_rating
                                        ? Number(Number(professorDetails.overall_rating).toFixed(1))
                                        : 0
                                }
                                size={92}



                                compare={true}
                            />
                        </div>
                        <div className='hidden h-[126px] mb-6 md:block'>
                            <Progresswheel
                                score={
                                    professorDetails.overall_rating
                                        ? Number(Number(professorDetails.overall_rating).toFixed(1))
                                        : 0
                                }
                                size={126}



                                compare={true}
                            />
                        </div>

                        <div className='flex flex-col items-center'>
                            <p className='text-sm lg:text-lg font-semibold'>استاد {professorDetails?.first_name} {professorDetails?.last_name}</p>
                            <p className='mb-2 mt-1.5 text-xs text-center lg:text-sm'>دانشکده {professorDetails?.faculty} </p>
                            <div className='flex gap-2 items-center '>
                                {professorDetails?.courses?.map((course) => {
                                    return (
                                        <div className='flex gap-2 items-center text-center text-[#949494] text-xs lg:text-sm font-normal'>
                                            <p key={course.id}>{course.name}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                                <circle cx="1.5" cy="1.66797" r="1.5" fill="#D9D9D9" />
                                            </svg>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='w-full  text-center p-6  bg-[#FAFAFA] border border-[#F0F0F0] mt-10 border-r-0'>
                            <p className='mb-5'>{professorDetails?.reviews_count} نظر</p>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>نمره دهی</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.grading_avg).toFixed(1) * 5} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>دانش عمومی</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.general_knowledge_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>جذابیت تدریس</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.teaching_engagement_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>سختی تکالیف</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.homework_difficulty_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>
                                <div className='flex flex-col gap-3  items-start'>
                                    <p className='text-xs lg:text-sm  text-[#181818] font-medium'>سختی امتحان</p>
                                    <Progressbar compare={true} value={Number(professorDetails?.exam_difficulty_avg).toFixed(1) * 20} strok={8} />
                                    <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                </div>

                            </div>
                        </div>
                        <div className='w-full py-7 border-b border-[#F0F0F0] text-center'>
                            <h1 className='text-[32px] lg:text-[40px] font-semibold'>{Number(professorDetails?.average_would_take_again)*20}%</h1>
                            <p className='text-xs lg:text-sm text-[#7F7F7F] font-medium'>دوباره انتخابش می‌کنند.</p>
                        </div>
                        <div className='py-7 text-center'>
                            <h1 className='text-[32px] lg:text-[40px] font-semibold'>{Number(professorDetails?.student_scores_avg)}</h1>
                            <p className='text-xs lg:text-sm text-[#7F7F7F] font-medium'>میانگین نمرات</p>
                        </div>
                    </div>
                
                   
                
                  
                  



                </div>


            </div>


        </div>
    )
}

export default CompareProfessor
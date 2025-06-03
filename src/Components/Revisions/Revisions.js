import React, { useContext, useState, useRef, useEffect } from 'react'
import Progresswheel from '../Progresswheel'
import profesorImg from "../../Assets/images/Rectangle 18.png"
import { Link, useParams } from 'react-router-dom'
import SidebarContext from "../SidbarContext/SidbarContext"; // adjust path as needed
import Progressbar from '../Progressbar';
import prof from "../../Assets/images/professor.svg"
import { Select } from 'antd';
import UserComment from '../UserComment/UserComment';
import ProfessorProf from "../../Assets/images/Rectangle 17.png"
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { DownOutlined } from '@ant-design/icons'; // or any icon you want
import { Modal } from 'antd';
import "./Revisions.css"
import SuccessAdd from "../../Assets/images/aaa 1 (1).svg"


const Revisions = () => {
    const [addCourseModal, setAddCourseModal] = useState(false);
    const [professorRevisionModal, setProfessorRevisionModal] = useState(false);

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


    // useEffect(() => {
    //     const fetchProfessors = async () => {
    //         try {
    //             const res = await fetch("http://localhost:8000/professor-reviewer/professors/", {
    //                 method: "GET",
    //                 headers: {
    //                     "Accept-Language": "fa",
    //                     "Content-Type": "application/json",
    //                 },
    //             });

    //             const data = await res.json();

    //             if (res.ok) {
    //                 console.log("ok");
    //                 console.log(data); // use data directly here
    //                 setProfessorList(data);
    //             } else {
    //                 throw new Error(Object.values(data)[0] || "An error occurred");
    //             }

    //         } catch (err) {
    //             console.error("Error:", err.message);
    //         } finally {
    //             console.log("finally");
    //         }
    //     };

    //     fetchProfessors();
    // }, []);

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
    const [newFaculty, setNewFaculty] = useState(null);

    const removeCourse = (id) => {
        setProfessorCourses((prevCourses) => prevCourses.filter(course => course.id !== id));
    };

    const [courseName, setCourseName] = useState('');
    const [newCourseId, setNewCourseId] = useState('');


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
        if (!professorCourses.some(c => c.id === course.id)) {
            setProfessorCourses([...professorCourses, course]);
        }
    };

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

    const submitProfessorRevision = async () => {
        try {
            const res = await fetch(`http://localhost:8000/professor-reviewer/professors/1/revisions/`, {
                method: "POST",
                headers: {
                    "Accept-Language": "fa",
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${JSON.parse(localStorage.getItem("AccessToken"))}`
                },
                body: JSON.stringify({
                    "professor": id,
                    "faculty": newFaculty,
                    "proposed_course_ids": [
                        19,
                        1
                    ],
                    "office_number": newOfficeNumber,
                    "telegram_account": newTelegram,
                    "email": newEmail,
                    "website_url": newWebsite,
                    "office_location": newOfficeLocation,
                    "profile_image": null,
                    "schedule_image": null

                })
            });

            const data = await res.json();

            if (res.ok) {
                console.log("ok");
                setProfessorRevisionModal(true);



            } else {
                throw new Error(Object.values(data)[0] || "An error occurred");
            }

        } catch (err) {
            console.error("Error:", err.message);
        } finally {
            console.log("finally");
        }
    };
    const submitCourse = async () => {
        try {
            const res = await fetch(`http://localhost:8000/professor-reviewer/courses/`, {
                method: "POST",
                headers: {
                    "Accept-Language": "fa",
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${JSON.parse(localStorage.getItem("AccessToken"))}`
                },
                body: JSON.stringify({
                    "professor": id,
                    "name": courseName
                })
            });

            const data = await res.json();

            if (res.ok) {
                console.log("ok");
                setNewCourseId(data.id)
                addNewcourse();

            } else {
                throw new Error(Object.values(data)[0] || "An error occurred");
            }

        } catch (err) {
            console.error("Error:", err.message);
        } finally {
            console.log("finally");
        }
    };

    return (
        <div>
            <div className='h-[60px] px-6 lg:p-0 w-full mb-2.5 bg-white rounded-xl flex relative justify-between text-[#959595] text-sm items-center font-medium'>
                <div className='flex gap-14 lg:gap-0 w-[30%] sm:w-[70%] lg:w-[35%] items-center lg:mr-9'>
                    <button onClick={() => navigate(-1)} className='flex gap-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#959595" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className='hidden lg:block'>بازگشت</p>
                    </button>


                </div>
                <div className='w-[70%]  justify-end  sm:w-[30%]  lg:justify-normal lg:w-[357px] flex items-center gap-2 '>

                    <button className='cursor-pointer'

                        onClick={() => setSearchDropdown(prev => !prev)}>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                        </svg></button>
                    <input onFocus={() => setSearchDropdown(true)}
                        onBlur={() => setSearchDropdown(false)}
                        onChange={(e) => setProfessorName(e.target.value)}

                        className='w-full h-full  hidden lg:inline-block' type="text" placeholder='نام استاد یا درس را وارد کنید' />
                    <div className={`${searchDropdown ? "" : "hidden"} lg:hidden z-[53] absolute left-0 w-[100%]  flex gap-2 bg-white h-12 rounded-xl items-center px-4 `}>
                        <svg className='cursor-pointer' onClick={() => setSearchDropdown(prev => !prev)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                        </svg>
                        <input onFocus={() => setSearchDropdown(true)}
                            onChange={(e) => setProfessorName(e.target.value)}
                            onBlur={() => setSearchDropdown(false)}
                            className='w-full h-full   z-[53]' type="text" placeholder='نام استاد یا درس را وارد کنید' />

                    </div>

                    <div className={`h-[198px] poll-container w-[100%]  lg:w-[375px] rounded-xl outline-none overscroll-contain  bg-white absolute  border border-[#DDD] p-2  transition-all text-nowrap opacity-0 text-xs lg:text-sm overflow-y-auto overflow-x-hidden rounded-b-2xl  ${searchDropdown ? "opacity-100 z-[53]" : "pointer-events-none"} top-[60px] lg:top-16 left-0`}>
                        {professorList.map((professor, index) => {
                            return (
                                <div
                                    onMouseDown={(e) => {
                                        if (e.button === 0) {
                                            navigate(`/poll/ProfessorDetails/${professor.id}`);
                                            setSearchDropdown(false);
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
            <div className=' px-[5%] font-iransansfa  md:px-[20%] lg:px-8 w-full flex flex-col gap-9 lg:gap-0 bg-white rounded-xl p-8 '>
                <h5 className='font-medium text-sm lg:text-base lg:mb-12'>درخواست اصلاح اطلاعات استاد</h5>
                <div>
                    <div className='w-full flex flex-col lg:flex-row mb-12 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2 items-center'>
                            <label className='w-full  lg:w-[82px] font-normal text-sm lg:text-base' htmlFor="">نام استاد :</label>
                            <input className='w-full lg:w-3/5 py-1.5 px-3 text-sm lg:text-base text-[#8B8B8B] rounded-md h-10  bg-[#F1F1F1]' type="text" placeholder='' disabled value={professorDetails.first_name} />
                        </div>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2 items-center'>
                            <label className='w-full lg:w-auto  lg:font-normal text-sm lg:text-base' htmlFor="">نام خانوادگی استاد :</label>
                            <input className='w-full lg:w-3/5 py-1.5 px-3 rounded-md h-10  text-[#8B8B8B] bg-[#F1F1F1] text-sm lg:text-base' type="text" placeholder='' disabled value={professorDetails.last_name} />
                        </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row mb-20 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2  items-center'>
                            <label className='w-full  lg:w-[82px] font-normal text-sm lg:text-base' htmlFor="">دانشکده <span className='text-[#E03B3A]'>*</span>  :</label>
                            <div className='w-full lg:w-3/5'>
                                <Select
                                    className='border  border-gray-500 border-solid h-10 font-iransansfa text-xs lg:text-base' // Responsive font size
                                    defaultValue="مهندسی کامپیوتر"
                                    style={{ width: 186 }}
                                    options={options}
                                    onChange={(e) => setNewFaculty(e)}

                                    suffixIcon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M4 6L8 10L12 6" stroke="#3B3B3B" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                                    </svg>} // custom arrow icon

                                />
                            </div>
                        </div>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2 items-center relative'>
                            <label className='w-full text-sm lg:text-base lg:font-normal lg:text-left  lg:w-[130px]' htmlFor="">دروس <span className="text-[#E03B3A]">*</span> :</label>
                            <div style={{ direction: "ltr" }} className='relative w-full lg:w-3/5'>
                                <div style={{ direction: "rtl" }} className='w-full text-sm flex-wrap pl-8   gap-2 lg:text-base flex items-center min-h-10 py-1.5 px-2 rounded-md  bg-white border border-solid border-[#D9D9D9]'>
                                    {professorCourses?.map((course) => {
                                        return (
                                            <div className='px-2 min-h-8 w-fit flex gap-2 items-center py-1 text-[13px] text-[#383E46] bg-[#E9EAEA] rounded-[6px]'>
                                                <p>{course.name}</p>
                                                <svg
                                                    className='cursor-pointer'
                                                    onClick={() => removeCourse(course.id)}
                                                    xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M9 3L3 9M3 3L9 9" stroke="#919498" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        )
                                    })}
                                </div>
                                <button onClick={() => setAddCourseModal(true)} className='w-[122px] text-sm mt-3 absolute left-0 gap-2 h-[38px] text-white bg-[#4CC6CB] flex items-center hover:bg-[#33BDC4] transition-all rounded-lg justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M7.46838 1.375H6.53088C6.44755 1.375 6.40588 1.41667 6.40588 1.5V6.40625H1.75C1.66667 6.40625 1.625 6.44792 1.625 6.53125V7.46875C1.625 7.55208 1.66667 7.59375 1.75 7.59375H6.40588V12.5C6.40588 12.5833 6.44755 12.625 6.53088 12.625H7.46838C7.55172 12.625 7.59338 12.5833 7.59338 12.5V7.59375H12.25C12.3333 7.59375 12.375 7.55208 12.375 7.46875V6.53125C12.375 6.44792 12.3333 6.40625 12.25 6.40625H7.59338V1.5C7.59338 1.41667 7.55172 1.375 7.46838 1.375Z" fill="white" />
                                    </svg>
                                    <p>افزودن درس</p>
                                </button>
                                <button className='cursor-pointer absolute left-2 top-3' onBlur={() => setCoursesDropdown(false)}

                                    onClick={() => setCoursesDropdown(prev => !prev)}>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="#7A7E83" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                                <div className={`h-[198px] poll-container w-full overscroll-contain  rounded-xl outline-none  bg-white absolute  border border-[#DDD] p-2  transition-all text-nowrap opacity-0 text-xs lg:text-sm overflow-y-auto overflow-x-hidden rounded-b-2xl  ${coursesDropdown ? "opacity-100 z-[53]" : "pointer-events-none"} -bottom-52 left-0`}>
                                    {courseList.map((course, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="flex flex-col gap-2 p-2 text-[#949494] cursor-pointer"
                                            >


                                                <button onMouseDown={() => addCourse(course)}
                                                    className="font-semibold text-[#464646] whitespace-nowrap">
                                                    {course.name}
                                                </button>
                                                <div className='w-full h-[1px] bg-gray-300'></div>


                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='w-full flex flex-col lg:flex-row mb-8 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2  items-center'>
                            <label className='w-full  lg:w-[82px] font-normal text-sm lg:text-base' htmlFor="">شماره تلفن :</label>
                            <input defaultValue={professorDetails.office_number}
                                onBlur={(e) => setNewOfficeNumber(e.target.value)} className='w-full text-sm lg:text-base lg:w-3/5 py-1.5 px-3 rounded-md h-10  border border-solid border-[#D9D9D9]' type="text" placeholder='031-00000000' />
                        </div>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2 items-center'>
                            <label className='w-full text-sm lg:text-base lg:font-normal lg:text-left  lg:w-[130px]' htmlFor="">ایمیل :</label>
                            <input
                                id="email"
                                defaultValue={professorDetails.email}
                                ref={emailRef}
                                onBlur={(e) => setNewEmail(e.target.value)}
                                className='w-full text-sm lg:text-base lg:w-3/5 py-1.5 px-3 rounded-md h-10 border border-solid border-[#D9D9D9]'
                                type="email"
                                placeholder='example@gmail.com'
                            />                        </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row mb-8 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2  items-center'>
                            <label className='w-full  lg:w-[88px] font-normal text-sm lg:text-base' htmlFor="">آدرس سایت :</label>
                            <input defaultValue={professorDetails.website_url}
                                onBlur={(e) => setNewWebsite(e.target.value)} className='w-full text-sm lg:text-base lg:w-3/5 py-1.5 px-3 rounded-md h-10  border border-solid border-[#D9D9D9]' type="text" placeholder='example.ir' />
                        </div>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full lg:w-1/2 items-center'>
                            <label className=' w-full text-sm lg:text-base lg:font-normal lg:text-left  lg:w-[130px]' htmlFor="">آی دی تلگرام :</label>
                            <input style={{ direction: "ltr" }} defaultValue={professorDetails.telegram_account}
                                onBlur={(e) => setNewTelegram(e.target.value)}
                                className='w-full text-end text-sm lg:text-base lg:w-3/5 py-1.5 px-3 rounded-md h-10  border border-solid border-[#D9D9D9]' type="text" placeholder='@example' />
                        </div>
                    </div>
                    <div className='w-full flex flex-col lg:flex-row mb-12 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full  items-center'>
                            <label className='w-full  lg:w-[88px] font-normal text-sm lg:text-base' htmlFor="">آدرس دفتر :</label>
                            <input defaultValue={professorDetails.office_location}
                                onBlur={(e) => setNewOfficeLocation(e.target.value)} className='w-full text-sm lg:text-base lg:w-10/12 py-1.5 px-3 rounded-md h-10  border border-solid border-[#D9D9D9]' type="text" placeholder='دانشکده مهندسی کامپیوتر - طبقه 2 - اتاق 110' />
                        </div>

                    </div>
                    <div className='w-full flex flex-col lg:flex-row mb-12 gap-9 lg:gap-0 justify-between'>
                        <div className='flex  flex-col lg:flex-row gap-2.5  lg:gap-8 w-full  items-center'>
                            <label className='w-full  lg:w-[88px] font-normal text-sm lg:text-base' htmlFor="">تصویر استاد :</label>
                            <div className='w-full lg:w-auto'>
                                <Upload {...props}>
                                    <Button className='text-[#383E46] custom-upload-button  w-full lg:w-[400px] h-[52px] font-iransans flex-row-reverse ' icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M17.5 12.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H6.5C5.09987 17.5 4.3998 17.5 3.86502 17.2275C3.39462 16.9878 3.01217 16.6054 2.77248 16.135C2.5 15.6002 2.5 14.9001 2.5 13.5V12.5M14.1667 6.66667L10 2.5M10 2.5L5.83333 6.66667M10 2.5V12.5" stroke="#BFBFBF" stroke-width="1.5" strokeLinecap="round" stroke-linejoin="round" />
                                    </svg>}>
                                        برای بارگذاری کلیک کنید
                                    </Button>
                                </Upload>



                            </div>
                            {previewUrl && (
                                <img
                                    src={previewUrl}
                                    alt="پیش‌نمایش تصویر"
                                    className="h-20 w-20 rounded shadow-md mt-4"
                                />
                            )}

                        </div>


                    </div>
                    <div>
                        <button onClick={submitProfessorRevision} className='w-full lg:w-[293px] h-[52px] py-2 px-[15px] rounded-xl bg-[#4CC6CB] hover:bg-[#33BDC4]  transition-all text-white mr-2 '>ثبت درخواست اصلاح</button>
                    </div>
                </div>

            </div>
            <Modal
                className="font-iransans addCourseModal"
                open={addCourseModal}
                onCancel={() => setAddCourseModal(false)}
                footer={[]}
                width={540}
                centered
            >
                <div className='w-full px-6 text-right text-[#383E46]'>
                    <div>
                        <p className='text-left text-[#383E46] font-medium'>افزودن درس جدید</p>
                    </div>
                    <div className='w-full h-0.5  bg-[#eee] mt-4 mb-[22px]'></div>
                    <p>عنوان درس</p>
                    <input type="text" placeholder='ریاضی 1' value={courseName} onChange={e => setCourseName(e.target.value)}
                        className='mt-2.5 mb-6 h-[52px] py-3 px-5 rounded-lg border border-solid border-[#A7A9AD] w-full' />
                    <button onClick={submitCourse} className='w-full h-[52px] rounded-lg   bg-[#4CC6CB] hover:bg-[#33BDC4] transition-all text-white font-bold text-base'>افزودن</button>
                </div>

            </Modal>

            <Modal
                className="font-iransans AddProfessor"
                open={professorRevisionModal}
                onOk={() => setProfessorRevisionModal(false)}
                onCancel={() => setProfessorRevisionModal(false)}
                footer={[]}
                width={540}

            >
                <div className=''>
                    <div className='flex flex-col items-center justify-center h-full gap-8 mt-7'>
                        <div>
                            <div>
                                <img className='w-36 h-36 lg:h-[186px] lg:w-[186px]' src={SuccessAdd} alt="" />
                            </div>
                        </div>
                        <div className='text-sm w-full lg:text-base '>
                            <p className='text-black font-normal mb-10'>درخواست اصلاح استاد {professorDetails.first_name} {professorDetails.last_name} ثبت شد!</p>
                            <button onClick={() => {
                                setProfessorRevisionModal(false);
                                navigate("/poll/most-popular");

                            }} className=' w-full h-[40px] text-white bg-[#4CC6CB] font-iransans flex-row-reverse rounded-lg'>تایید</button>

                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}

export default Revisions
import React, { useState, useRef, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import ProfessorProf from "../../Assets/images/Rectangle 17.png"
import { useNavigate } from 'react-router-dom';
import { Button, message, Upload } from 'antd';
import { Modal } from 'antd';
import "../../Components/Revisions/Revisions.css"
import Progresswheel from '../../Components/Progresswheel';
import Progressbar from '../../Components/Progressbar';
import MasterCard from '../../Components/MasterCard/MasterCard';


const CompareProfessor = () => {
    const [addCourseModal, setAddCourseModal] = useState(false);



    const [professorList, setProfessorList] = useState([]);
    const [professorDetails, setProfessorDetails] = useState({});
    const [id, setId] = useState(useParams().professor);



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
                    setProfessorDetails(data);
                    setProfessorCourses(data.courses);
                } else {
                    throw new Error(Object.values(data)[0] || "An error occurred");
                }

            } catch (err) {
                console.error("Error:", err.message);
            }
            // finally {
            //     console.log("finally");
            // }
        };

        fetchProfessors();
    }, [id]);



    const [relatedProfessors, setRelatedProfessors] = useState([]);

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const res = await fetch(`http://localhost:8000/professor-reviewer/professors/${id}/`, {
                    method: "GET",
                    headers: {
                        "Accept-Language": "fa",
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    setRelatedProfessors(data?.related_professors);
                } else {
                    throw new Error(Object.values(data)[0] || "An error occurred");
                }

            } catch (err) {
                console.error("Error:", err.message);
            }
            // finally {
            //     console.log("finally");
            // }
        };

        fetchProfessors();
    }, []);

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

    const [searchDropdown, setSearchDropdown] = useState(false);
    const [coursesDropdown, setCoursesDropdown] = useState(false);
    const navigate = useNavigate();









    const [showList, setShowList] = useState([]);
    const myid = useParams().professor;

    useEffect(() => {

        if (
            professorDetails &&
            Object.keys(professorDetails).length > 0
            &&
            !showList.some(prof => prof.id === professorDetails.id)
        ) {
            setShowList(prev => [...prev, professorDetails]);
        }
    }, [professorDetails]);

    const handleRemove = (target) => {

        setRelatedProfessors(prev => [...prev, target]);
        setShowList(prev => prev.filter(item => item.id !== target.id));
        setId(myid);

    };
    const [addProfessorModal, setAddProfessorModal] = useState(false);


    return (
        <div>
            <div className='h-[60px] px-6 lg:p-0 w-full mb-2.5 bg-white rounded-xl flex relative justify-between text-[#959595] text-sm items-center font-medium'>
                <div className='flex gap-14 lg:gap-0 w-[30%] sm:w-[70%] lg:w-[35%] items-center lg:mr-9'>
                    <button onClick={() => navigate(-1)} className='flex gap-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="#959595" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className='hidden lg:block'>بازگشت</p>
                    </button>


                </div>
                <div className='w-[70%]  justify-end  sm:w-[30%]  lg:justify-normal lg:w-[357px] flex items-center gap-2 '>

                    <button className='cursor-pointer'

                        onClick={() => setSearchDropdown(prev => !prev)}>  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg></button>
                    <input onFocus={() => setSearchDropdown(true)}
                        onBlur={() => setSearchDropdown(false)}
                        onChange={(e) => setProfessorName(e.target.value)}

                        className='w-full h-full  hidden lg:inline-block' type="text" placeholder='نام استاد یا درس را وارد کنید' />
                    <div className={`${searchDropdown ? "" : "hidden"} lg:hidden z-[53] absolute left-0 w-[100%]  flex gap-2 bg-white h-12 rounded-xl items-center px-4 `}>
                        <svg className='cursor-pointer' onClick={() => setSearchDropdown(prev => !prev)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input onFocus={() => setSearchDropdown(true)}
                            onBlur={() => setSearchDropdown(false)}
                            onChange={(e) => setProfessorName(e.target.value)}

                            className='w-full h-full   z-[53]' type="text" placeholder='نام استاد یا درس را وارد کنید' />
                    </div>

                    <div className={`h-[198px] poll-container w-[100%] overscroll-contain  lg:w-[375px] rounded-xl outline-none  bg-white absolute  border border-[#DDD] p-2  transition-all text-nowrap opacity-0 text-xs lg:text-sm overflow-y-auto overflow-x-hidden rounded-b-2xl  ${searchDropdown ? "opacity-100 z-[53]" : "pointer-events-none"} top-[60px] lg:top-16 left-0`}>
                        {professorList.map((professor, index) => {
                            return (
                                <div
                                    onMouseDown={(e) => {
                                        if (e.button === 0) {
                                            navigate(`/poll/ProfessorDetails/${professor.id}`);
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

            <div className=' w-full bg-white  px-[5%] font-iransansfa   lg:px-8  flex flex-col gap-9 lg:gap-0  rounded-xl p-8 '>
                <h5 className='font-medium text-sm lg:text-base lg:mb-12'>مقایسه اساتید</h5>
                <div className='flex flex-wrap h-[980px] md:h-[1030px] lg:h-[1100px] overflow-hidden'>
                    {showList.map((item, index) => {
                        const isLastItem = index === showList.length - 1;
                        return (
                            <div key={item.id} // Always add a key when mapping
                                className={`w-1/2 lg:w-1/3 xl:w-1/4 py-3 ${!isLastItem ? 'border-l' : ''
                                    } border-[#F0F0F0] flex flex-col items-center`}>
                                {item.id != myid ? (<button onClick={() => handleRemove(item)} className='w-11/12'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M17.9995 6L5.99951 18M5.99951 6L17.9995 18" stroke="#7A7E83" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>)  : (<div className='h-6'></div>)}
                                <div className='md:hidden mb-6'>
                                    <Progresswheel
                                        score={
                                            item.overall_rating
                                                ? Number(Number(item.overall_rating).toFixed(1))
                                                : 0
                                        }
                                        size={92}



                                        compare={true}
                                    />
                                </div>
                                <div className='hidden h-[126px] mb-6 md:block'>
                                    <Progresswheel
                                        score={
                                            item.overall_rating
                                                ? Number(Number(item.overall_rating).toFixed(1))
                                                : 0
                                        }
                                        size={126}



                                        compare={true}
                                    />
                                </div>

                                <div className='flex flex-col items-center h-20'>
                                    <p className='text-sm lg:text-lg font-semibold'>استاد {item?.first_name} {item?.last_name}</p>
                                    <p className='mb-2 mt-1.5 text-xs text-center lg:text-sm'>دانشکده {item?.faculty} </p>
                                    <div className='flex gap-2 items-center '>
                                        {item?.courses?.map((course) => {
                                            return (
                                                <div key={course.id} className='flex gap-2 items-center text-center text-[#949494] text-xs lg:text-sm font-normal'>
                                                    <p >{course.name}</p>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
                                                        <circle cx="1.5" cy="1.66797" r="1.5" fill="#D9D9D9" />
                                                    </svg>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={`w-full  text-center p-2 md:p-6  bg-[#FAFAFA] border border-[#F0F0F0] mt-10 border-r-0 `}>
                                    <p className='mb-5'>{item?.reviews_count} نظر</p>
                                    <div className='flex flex-col gap-6'>
                                        <div className='flex flex-col gap-3  items-start'>
                                            <p className='text-xs lg:text-sm  text-[#181818] font-medium'>نمره دهی</p>
                                            <Progressbar compare={true} value={Number(item?.grading_avg).toFixed(1) * 5} strok={8} />
                                            <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                        </div>
                                        <div className='flex flex-col gap-3  items-start'>
                                            <p className='text-xs lg:text-sm  text-[#181818] font-medium'>دانش عمومی</p>
                                            <Progressbar compare={true} value={Number(item?.general_knowledge_avg).toFixed(1) * 20} strok={8} />
                                            <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                        </div>
                                        <div className='flex flex-col gap-3  items-start'>
                                            <p className='text-xs lg:text-sm  text-[#181818] font-medium'>جذابیت تدریس</p>
                                            <Progressbar compare={true} value={Number(item?.teaching_engagement_avg).toFixed(1) * 20} strok={8} />
                                            <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                        </div>
                                        <div className='flex flex-col gap-3  items-start'>
                                            <p className='text-xs lg:text-sm  text-[#181818] font-medium'>سختی تکالیف</p>
                                            <Progressbar compare={true} value={Number(item?.homework_difficulty_avg).toFixed(1) * 20} strok={8} />
                                            <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                        </div>
                                        <div className='flex flex-col gap-3  items-start'>
                                            <p className='text-xs lg:text-sm  text-[#181818] font-medium'>سختی امتحان</p>
                                            <Progressbar compare={true} value={Number(item?.exam_difficulty_avg).toFixed(1) * 20} strok={8} />
                                            <p className=" text-xs lg:text-sm md:block text-[#6C6C6C]">دست باز و با ارفاق</p>
                                        </div>

                                    </div>
                                </div>
                                <div className='w-full py-7 border-b border-[#F0F0F0] text-center'>
                                    <h1 className='text-[32px] lg:text-[40px] font-semibold'>{Number(item?.average_would_take_again) * 20}%</h1>
                                    <p className='text-xs lg:text-sm text-[#7F7F7F] font-medium'>دوباره انتخابش می‌کنند.</p>
                                </div>
                                <div className='py-7 text-center'>
                                    <h1 className='text-[32px] lg:text-[40px] font-semibold'>{Number(item?.student_scores_avg)}</h1>
                                    <p className='text-xs lg:text-sm text-[#7F7F7F] font-medium'>میانگین نمرات</p>
                                </div>
                            </div>
                        )

                    })}
                    <div className='h-80 w-1/2 lg:w-1/3  xl:w-1/4 flex justify-center items-center border-r border-[#F0F0F0]'>
                        <button onClick={() => setAddProfessorModal(true)} className='border border-[#919498] text-[#383E46] font-semibold h-9 md:h-10 lg:h-12 w-[104px] md:w-36  lg:w-40 rounded-[10px] text-sm md:text-base'>افزودن استاد</button>
                    </div>










                </div>


            </div>

            <Modal
                className="font-iransans"
                open={addProfessorModal}
                // onOk={() => setAddProfessorSchedule(false)}
                // onCancel={() => setAddProfessorSchedule(false)}
                footer={[]}
                width={545}
                centered
                onCancel={() => setAddProfessorModal(false)}
            >
                <div className='h-full'>
                    <p className='text-left pr-4 font-medium text-sm lg:text-base mb-3 '>انتخاب استاد</p>
                    <div className='flex gap-2 py-3 px-5 items-center rounded-xl w-full border border-[#D1D1D1]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#A7A9AD" stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input className='w-full' type="text" placeholder='نام استاد یا درس را وارد کنید' />

                    </div>
                    <p className='text-right my-5 text-sm font-normal text-[#737373]'>مرتبط ترین استادان برای مقایسه</p>
                    <div className='w-full flex flex-wrap gap-[18px] h-[400px] overflow-scroll'>
                        {relatedProfessors.map((item) => {
                            return (
                                <div onClick={() => {
                                    setId(item.id);
                                    setAddProfessorModal(false);
                                    setRelatedProfessors(relatedProfessors.filter((temp) => item.id != temp.id));


                                }}
                                    key={item.id}
                                    className=''>
                                    <MasterCard event={false} first_name={item?.first_name} last_name={item?.last_name} id={item?.id} reviews_count={item?.reviews_count} overall_rating={item?.overall_rating} courses={item?.courses} />

                                </div>

                            )
                        })}



                    </div>

                </div>

            </Modal>


        </div>
    )
}

export default CompareProfessor
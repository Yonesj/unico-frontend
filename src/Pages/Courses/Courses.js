import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import "./Courses.css"
import { HolderOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table } from 'antd';
import { NavLink, useParams } from 'react-router-dom';
import GolestanLoginModal from '../../Components/Modal/GolestanLoginModal';
import { X } from 'lucide-react';
import AddUnitModal from "../../Components/Modal/AddUnitModal"
import { Modal } from "antd"
import "../../Components/Modal/AddUnitModal.css"
import { TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Select } from "antd";
import { DatePicker } from "antd";
import moment from 'moment-jalaali'; // Import moment-jalaali
import Swal from 'sweetalert2';
const format = 'HH:mm';




const RowContext = React.createContext({});

const columns = [
    { title: 'کد', dataIndex: 'sID', align: 'center', className: 'text-ltr' },
    { title: 'نام درس', dataIndex: 'courseName', align: 'center' },
    { title: 'تعداد واحد', dataIndex: 'unitNumber', align: 'center' },
    { title: 'نام استاد', dataIndex: 'teacherName', align: 'center' },
    { title: 'جنسیت', dataIndex: 'gender', align: 'center' },
    { title: 'زمان', dataIndex: 'time', align: 'center' },
    { title: 'تاریخ امتحان', dataIndex: 'examTime', align: 'center' },
    { title: 'پیش نیاز/هم نیاز', dataIndex: 'prerequisite', align: 'center' },
    { title: 'حذف', dataIndex: 'operation', align: 'center' },
];


const customItemRender = (current, type, originalElement) => {
    if (type === 'next') {
        return <a><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11.25 13.5L6.75 9L11.25 4.5" stroke="#7A7E83" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg></a>;
    }
    if (type === 'prev') {
        return <a><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#A7A9AD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg></a>;
    }
    return originalElement;
};

const Row = props => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,

    } = useSortable({ id: props['data-row-key'] });
    const style = Object.assign(
        Object.assign(Object.assign({}, props.style), {
            transform: CSS.Translate.toString(transform),
            transition,

        }),
        isDragging ? { position: 'relative', zIndex: 9999 } : {},
    );
    const contextValue = useMemo(
        () => ({ setActivatorNodeRef, listeners }),
        [setActivatorNodeRef, listeners],
    );
    return (
        <RowContext.Provider value={contextValue}>
            <tr {...props} ref={setNodeRef} style={style} {...attributes} />
        </RowContext.Provider>
    );
};

const CoursesList = (children) => {
    const deleteConfirm = (index) => {
        Swal.fire({
            title: "آیا از حذف درس اطمینان دارید؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#00ADB5",
            cancelButtonColor: "#d33",
            confirmButtonText: "بله",
            cancelButtonText: "خیر"
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteUnit(index);
                Swal.fire({
                    text: "درس مورد نظر با موفقیت پاک شد",
                    icon: "success",
                });
            }
        });
    }

    const [courses, setCourses] = useState([]);
    const [dataSource, setDataSource] = useState([]);
  



    const dayMap = {
        sat: "شنبه",
        sun: "یکشنبه",
        mon: "دوشنبه",
        tue: "سه‌شنبه",
        wed: "چهارشنبه",
        thu: "پنج‌شنبه",
        fri: "جمعه"
    };
    const dayMapreverse = {
        شنبه: "sat",
        یکشنبه: "sun",
        دوشنبه: "mon",
        سه‌شنبه: "tue",
        چهارشنبه: "wed",
        پنج‌شنبه: "thu",
        جمعه: "fri"
    };
    const handleDeleteUnit = (index) => {

        // Log the index to see where it was clicked

        // Update the courses state
        setCourses(prevState => {
            const updatedCourses = prevState.filter((_, i) => i !== index);

            // Save updated courses to local storage
            localStorage.setItem('courses', JSON.stringify(updatedCourses));
            return updatedCourses;
        });
        setIsRemoved(!isRemoved);
    };



    const [isAdded, setIsAdded] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);

    useEffect(() => {

        const saved = JSON.parse(localStorage.getItem("courses")) || [];
        setCourses(saved);
        const formatted = saved.map((c, i) => {
            // Regex to extract course names after the numeric codes
            
            const noteText = c.prerequisites || "-";
            const matches = [...noteText.matchAll(/\d+\s+(.+)/g)];
            const extractedNames = matches.map(m => m[1]).join("، ");
            
            
            return {
                key: (i + 1).toString(),
                sID: c.course_code,
                courseName: <><p>{c.course_name} - </p>{c.notes}<p></p></>,
                unitNumber: c.theory,
                teacherName: c.professor_name,
                gender: c.gender == "-" ? "-" :  c.gender === "F" ? "خواهران" : "برادران",
                time: c.classes ? (
                    <div>
                        {c.classes.map((time, index) => (
                            <p key={index}>{dayMap[time.day]} {time.start} - {time.end}</p>
                        ))}
                    </div>
                ) : "",
                examTime: (
                    <>
                        <p>{c.exam && c.exam.date ? c.exam.date : ""}</p>
                        {c.exam && c.exam.start ? (
                            <p>{c.exam.end} - {c.exam.start}</p>
                        ) : "-"}
                    </>
                ),
                prerequisite: noteText != "-" ? <p>{extractedNames}</p> : "-",  // <-- here is the parsed name
                operation: (
                    <button onClick={() => deleteConfirm(i)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                ),
            };
        });
        setDataSource(formatted);
    }, [isRemoved, isAdded]);


    // const initialData = [
    //     {
    //         key: "1", sID: courses[0] && courses[0].id ? courses[0].id : "1", courseName: 'ریاضی عمومی 2', unitNumber: '3', teacherName: 'رحمانی مورچه خورتی نفیسه', gender: 'مختلط', time: <><p>شنبه ۱۴:۰۰ - ۱۶:۰۰</p><p>دوشنبه ۱۰:۰۰ - ۱۲:۰۰</p><p>چهارشنبه ۰۸:۰۰ - ۱۰:۰۰</p></>, examTime: <><p>۱۴۰۴.۰۳.۳۰</p><p>۰۹:۰۰ - ۱۲:۰۰</p></>, prerequisite: "مقدمه ای بر علم داده", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    //             <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //         </svg></button>
    //     },
    //     {
    //         key: '2', sID: '4014142_11', courseName: 'ریاضی عمومی 2', unitNumber: '3', teacherName: 'رحمانی مورچه خورتی نفیسه', gender: 'مختلط', time: <><p>شنبه ۱۴:۰۰ - ۱۶:۰۰</p><p>دوشنبه ۱۰:۰۰ - ۱۲:۰۰</p><p>چهارشنبه ۰۸:۰۰ - ۱۰:۰۰</p></>, examTime: <><p>۱۴۰۴.۰۳.۳۰</p><p>۰۹:۰۰ - ۱۲:۰۰</p></>, prerequisite: "مقدمه ای بر علم داده", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    //             <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //         </svg></button>
    //     },
    //     {
    //         key: '3', sID: '4014142_11', courseName: 'ریاضی عمومی 2', unitNumber: '3', teacherName: 'رحمانی مورچه خورتی نفیسه', gender: 'مختلط', time: <><p>شنبه ۱۴:۰۰ - ۱۶:۰۰</p><p>دوشنبه ۱۰:۰۰ - ۱۲:۰۰</p><p>چهارشنبه ۰۸:۰۰ - ۱۰:۰۰</p></>, examTime: <><p>۱۴۰۴.۰۳.۳۰</p><p>۰۹:۰۰ - ۱۲:۰۰</p></>, prerequisite: "مقدمه ای بر علم داده", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    //             <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //         </svg></button>
    //     },
    //     {
    //         key: '4', sID: '4014142_11', courseName: 'ریاضی عمومی 2', unitNumber: '3', teacherName: 'رحمانی مورچه خورتی نفیسه', gender: 'مختلط', time: <><p>شنبه ۱۴:۰۰ - ۱۶:۰۰</p><p>دوشنبه ۱۰:۰۰ - ۱۲:۰۰</p><p>چهارشنبه ۰۸:۰۰ - ۱۰:۰۰</p></>, examTime: <><p>۱۴۰۴.۰۳.۳۰</p><p>۰۹:۰۰ - ۱۲:۰۰</p></>, prerequisite: "مقدمه ای بر علم داده", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    //             <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //         </svg></button>
    //     },
    //     {
    //         key: '5', sID: '4014142_11', courseName: 'ریاضی عمومی 2', unitNumber: '3', teacherName: 'رحمانی مورچه خورتی نفیسه', gender: 'مختلط', time: <><p>شنبه ۱۴:۰۰ - ۱۶:۰۰</p><p>دوشنبه ۱۰:۰۰ - ۱۲:۰۰</p><p>چهارشنبه ۰۸:۰۰ - ۱۰:۰۰</p></>, examTime: <><p>۱۴۰۴.۰۳.۳۰</p><p>۰۹:۰۰ - ۱۲:۰۰</p></>, prerequisite: "مقدمه ای بر علم داده", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    //             <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //         </svg></button>
    //     },
    //     {
    //         key: '6', sID: '4014142_11', courseName: 'ریاضی عمومی 2', unitNumber: '3', teacherName: 'رحمانی مورچه خورتی نفیسه', gender: 'مختلط', time: <><p>شنبه ۱۴:۰۰ - ۱۶:۰۰</p><p>دوشنبه ۱۰:۰۰ - ۱۲:۰۰</p><p>چهارشنبه ۰۸:۰۰ - ۱۰:۰۰</p></>, examTime: <><p>۱۴۰۴.۰۳.۳۰</p><p>۰۹:۰۰ - ۱۲:۰۰</p></>, prerequisite: "مقدمه ای بر علم داده", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    //             <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //         </svg></button>
    //     },
    //     {
    //         key: '7', sID: '4014142_11', courseName: 'ریاضی عمومی 2', unitNumber: '3', teacherName: 'رحمانی مورچه خورتی نفیسه', gender: 'مختلط', time: <><p>شنبه ۱۴:۰۰ - ۱۶:۰۰</p><p>دوشنبه ۱۰:۰۰ - ۱۲:۰۰</p><p>چهارشنبه ۰۸:۰۰ - ۱۰:۰۰</p></>, examTime: <><p>۱۴۰۴.۰۳.۳۰</p><p>۰۹:۰۰ - ۱۲:۰۰</p></>, prerequisite: "مقدمه ای بر علم داده", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    //             <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    //         </svg></button>
    //     },

    // ];


    const [golestanModal, setGolestanModal] = useState(false);
    const number = useParams();
    const handleOk = () => {
        setGolestanModal(false);
    }

    const [addUnitModal, setAddUnitModal] = useState(false);
    const courseName = useRef("");
    const professorName = useRef("");
    const courseCode = useRef("");
    // const [professorName, setProfessorName] = useState("");
    // const [courseCode, setCourseCode] = useState("");
    // const [theory, setTheory] = useState("");
    // const [gender, setGender] = useState("");
    // const [courseDay, setcourseDay] = useState("شنبه");
    // const [courseStarthour, setcourseStarthour] = useState("");
    // const [courseStartmin, setcourseStartmin] = useState("");
    // const [courseEndhour, setcourseEndhour] = useState("");
    // const [courseEndmin, setcourseEndmin] = useState("");
    const [courseExamStarthour, setcourseExamStarthour] = useState("");
    const [courseExamStartmin, setcourseExamStartmin] = useState("");
    const [courseExamEndhour, setcourseExamEndhour] = useState("");
    const [courseExamEndmin, setcourseExamEndmin] = useState("");
    const [courseExamTime, setcourseExamTime] = useState("");
    const [prerequisites, setPrerequisites] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    // const handleTime = (value) => {

    //     if (value) {
    //         setcourseStartmin(value[0].$m);
    //         setcourseStarthour(value[0].$H);
    //         setcourseEndmin(value[1].$m);
    //         setcourseEndhour(value[1].$H);
    //     }
    // }
    const handleDateChange = (date) => {


        const persianDate = moment(date.$d).format('jYYYY/jMM/jDD'); // Persian date format
        setSelectedDate(persianDate);
    };
    const handleExamTime = (value) => {

        if (value) {
            setcourseExamStartmin(value[0].$m);
            setcourseExamStarthour(value[0].$H);
            setcourseExamEndmin(value[1].$m);
            setcourseExamEndhour(value[1].$H);
        }
    }



    let [num, setNum] = useState(1);
    const [courseTimes, setCourseTimes] = useState(
        Array.from({ length: num }, () => ({ day: 'sat', start: '', end: '' }))
    );
    const handleDayChange = (value, index) => {        
        const updated = [...courseTimes];
        updated[index] = { ...updated[index], day: dayMapreverse[value] };
        setCourseTimes(updated);
    };
    const handleTimeChange = (value, index) => {
        const updated = [...courseTimes];
        updated[index] = { ...updated[index], start: value[0].$H, end: value[1].$H };
        setCourseTimes(updated);
    };
    const handleAddUnit = () => {
        const newUnit = {
            course_code: courseCode.current,
            course_name: courseName.current,
            professor_name: professorName.current,

            theory: "-", // you can update this with actual data
            prerequisites: "-", // add if needed
            notes: "", // add if needed
            gender: "-", // or "F"
            classes:[...courseTimes],
            exam: {
                date: selectedDate,
                start: courseExamStarthour,
                end: courseExamEndhour,
            },
        };

        // Save the new unit to the current list of courses
        const updatedCourses = [...courses, newUnit];
        setCourses(updatedCourses);

        // Save to localStorage
        localStorage.setItem("courses", JSON.stringify(updatedCourses));
        Swal.fire({
            text: "درس مورد نظر با موفقیت اضافه شد",
            icon: "success",

        });
        setIsAdded(!isAdded);

        // // Reset the form fields
        // setCourseName("");
        // setProfessorName("");
        // setCourseCode("");
        // setCourseDay("شنبه");
        // setStartTime(null);
        // setEndTime(null);
        // setExamDate(null);
        // setExamStart(null);
        // setExamEnd(null);

        // Close the modal
        setAddUnitModal(false);
    };


    const [searchText, setSearchText] = useState("")
    const normalizeText = (text) =>
        text.replace(/ی/g, "ي").replace(/ک/g, "ك").replace(/پ/g, "پ").toLowerCase();

    const filteredData = useMemo(() => {
        return dataSource.filter(item => {
          const courseText = item.courseName.props?.children?.[0]?.props?.children?.toString() || "";
               
          const search = normalizeText(searchText);
          return (
            normalizeText(courseText).includes(search)
          );
        });
      }, [searchText, dataSource]);
      
    const onDragEnd = ({ active, over }) => {
        if (active.id !== (over === null || over === void 0 ? void 0 : over.id)) {
            setDataSource(prevState => {
                const activeIndex = prevState.findIndex(
                    record => record.key === (active === null || active === void 0 ? void 0 : active.id),
                );
                const overIndex = prevState.findIndex(
                    record => record.key === (over === null || over === void 0 ? void 0 : over.id),
                );
                return arrayMove(prevState, activeIndex, overIndex);
            });
        }
    };
    





    return (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
            <SortableContext items={dataSource.map(i => i.key)} strategy={verticalListSortingStrategy}>
                <div className='bg-white px-4 py-2 rounded-xl '>
                    <div className='flex justify-between p-3 mb-2  items-center '>
                        <div>
                            <h1 className='text-base font-medium'>لیست دروس ارائه شده</h1>

                        </div>
                        <div className='flex items-center justify-evenly gap-3 text-sm '>
                            <div className='flex border border-solid border-[#D9D9D9] overflow-auto rounded-lg font-normal text-sm'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none">
                                    <rect x="0.5" y="-0.5" width="41" height="41" stroke="#D9D9D9" />
                                    <path d="M28 28L24.1333 24.1333M26.2222 19.1111C26.2222 23.0385 23.0385 26.2222 19.1111 26.2222C15.1838 26.2222 12 23.0385 12 19.1111C12 15.1838 15.1838 12 19.1111 12C23.0385 12 26.2222 15.1838 26.2222 19.1111Z" stroke="#64696F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <input onChange={(e) => setSearchText(e.target.value)} className='w-[200px] px-3 py-2 ' type="text" placeholder='نام درس را وارد کنید ...' />
                            </div>
                            <div className='flex gap-2'>
                                <button onClick={() => setAddUnitModal(true)} className='flex items-center  rounded-lg py-2 px-4 font-medium text-sm gap-3.5 border border-solid border-[#D9D9D9]'>

                                    <p>
                                        اضافه کردن

                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M7.46838 1.37598H6.53088C6.44755 1.37598 6.40588 1.41764 6.40588 1.50098V6.40723H1.75C1.66667 6.40723 1.625 6.44889 1.625 6.53223V7.46973C1.625 7.55306 1.66667 7.59473 1.75 7.59473H6.40588V12.501C6.40588 12.5843 6.44755 12.626 6.53088 12.626H7.46838C7.55172 12.626 7.59338 12.5843 7.59338 12.501V7.59473H12.25C12.3333 7.59473 12.375 7.55306 12.375 7.46973V6.53223C12.375 6.44889 12.3333 6.40723 12.25 6.40723H7.59338V1.50098C7.59338 1.41764 7.55172 1.37598 7.46838 1.37598Z" fill="#222831" />
                                    </svg>
                                </button>
                                <button onClick={() => { setGolestanModal(true) }} className='flex bg-[#00ADB5] rounded-lg py-2 px-4 font-medium text-sm text-white gap-2.5'>

                                    <p>
                                        آپدیت لیست
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.63617 0.803166C8.92907 0.510273 9.40394 0.510273 9.69683 0.803166L11.3635 2.46983C11.5042 2.61048 11.5832 2.80125 11.5832 3.00016C11.5832 3.19908 11.5042 3.38984 11.3635 3.53049L9.69683 5.19716C9.40394 5.49005 8.92907 5.49005 8.63617 5.19716C8.34328 4.90427 8.34328 4.42939 8.63617 4.1365L9.03242 3.74025C5.99381 4.20599 3.6665 6.83129 3.6665 10.0002C3.6665 12.1049 4.69245 13.97 6.27481 15.1228C6.6096 15.3667 6.68326 15.8359 6.43935 16.1706C6.19544 16.5054 5.72631 16.5791 5.39153 16.3352C3.43833 14.9121 2.1665 12.6046 2.1665 10.0002C2.1665 6.01193 5.14701 2.71984 9.00212 2.22977L8.63617 1.86383C8.34328 1.57093 8.34328 1.09606 8.63617 0.803166ZM13.5603 3.82969C13.8042 3.4949 14.2734 3.42124 14.6081 3.66515C16.5613 5.08818 17.8332 7.39569 17.8332 10.0002C17.8332 13.9884 14.8527 17.2805 10.9976 17.7706L11.3635 18.1365C11.6564 18.4294 11.6564 18.9043 11.3635 19.1972C11.0706 19.4901 10.5957 19.4901 10.3028 19.1972L8.63617 17.5305C8.49552 17.3898 8.4165 17.1991 8.4165 17.0002C8.4165 16.8012 8.49552 16.6105 8.63617 16.4698L10.3028 14.8032C10.5957 14.5103 11.0706 14.5103 11.3635 14.8032C11.6564 15.0961 11.6564 15.5709 11.3635 15.8638L10.9672 16.2601C14.0059 15.7943 16.3332 13.169 16.3332 10.0002C16.3332 7.89541 15.3072 6.03036 13.7249 4.87751C13.3901 4.6336 13.3164 4.16447 13.5603 3.82969Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className=''>
                        <Table


                            style={{ direction: "rtl", height: "500px" }} // Keeps table content in RTL
                            rowKey="key"
                            components={{ body: { row: Row } }}
                            columns={columns}
                            dataSource={filteredData}
                            pagination={false}
                            scroll={{ y: 400 }} // <-- This is the key
                        />
                    </div>
                </div>
            </SortableContext>
            <GolestanLoginModal onOk={() => handleOk()} onClose={() => setGolestanModal(false)} open={golestanModal} />
            <Modal
                className='font-iransans addUnitModal'
                open={addUnitModal} onOk={() => handleAddUnit()} onCancel={() => setAddUnitModal(false)}
                footer={
                    [
                    ]}

            >
                <div action="" dir="rtl" className="flex flex-col gap-5 h-full text-right mt-7 ">
                    <div className="flex flex-col ">
                        <label for="unitName">
                            عنوان درس
                        </label>
                        <input
                            className="border border-solid border-[#A7A9AD] py-2 px-5 rounded-lg mt-2 placeholder:text-[#A7A9AD]"
                            type="text"
                            name="unitName"
                            id="unitName"
                            onChange={(e) =>
                                courseName.current = e.target.value
                            }
                            placeholder="ریاضی ۱"
                            required
                        />
                    </div>
                    <div className="flex gap-6">
                        <div className="flex flex-col flex-1 ">
                            <label for="unitMaster">
                                نام استاد
                            </label>
                            <input
                                className="border border-solid border-[#A7A9AD] py-2 px-5 rounded-lg mt-2 placeholder:text-[#A7A9AD]"
                                type="text"
                                name="unitMaster"
                                id="unitMaster"
                                onChange={(e) =>
                                   professorName.current =  e.target.value
                                }
                                placeholder="امینی هرندی"
                                required
                            />
                        </div>
                        <div className="flex flex-col flex-1 ">
                            <label for="name">
                                کد درس
                            </label>
                            <input
                                className="border border-solid border-[#A7A9AD] py-2 px-5 rounded-lg mt-2 placeholder:text-[#A7A9AD]"
                                type="text"
                                name="name"
                                id="name"
                                onChange={(e) =>
                                    courseCode.current =  e.target.value
                                }
                                placeholder="401351 - 05"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5 mb-2.5">
                        <div className="flex">
                            <label for="name">
                                زمان های ارائه درس
                            </label>


                        </div>

                        <div className='flex flex-col gap-2'>
                            {Array.from({ length: num }).map((_, i) => (
                                <div className="flex" key={i}>

                                    <div className="flex w-1/2 items-center border border-solid border-[#A7A9AD] rounded-lg rounded-l-none outline-none text-base px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M14 6.66683H2M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M5.2 14.6668H10.8C11.9201 14.6668 12.4802 14.6668 12.908 14.4488C13.2843 14.2571 13.5903 13.9511 13.782 13.5748C14 13.147 14 12.5869 14 11.4668V5.86683C14 4.74672 14 4.18667 13.782 3.75885C13.5903 3.38252 13.2843 3.07656 12.908 2.88482C12.4802 2.66683 11.9201 2.66683 10.8 2.66683H5.2C4.0799 2.66683 3.51984 2.66683 3.09202 2.88482C2.71569 3.07656 2.40973 3.38252 2.21799 3.75885C2 4.18667 2 4.74672 2 5.86683V11.4668C2 12.5869 2 13.147 2.21799 13.5748C2.40973 13.9511 2.71569 14.2571 3.09202 14.4488C3.51984 14.6668 4.0799 14.6668 5.2 14.6668Z" stroke="#919498" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>

                                        <Select onChange={(value) => handleDayChange(value, i)} className="w-full  font-iransansfa " defaultValue={"شنبه"} suffixIcon={""} >
                                            <Select.Option value="شنبه">شنبه</Select.Option>
                                            <Select.Option value="یکشنبه">یکشنبه</Select.Option>
                                            <Select.Option value="دوشنبه">دوشنبه</Select.Option>
                                            <Select.Option value="سه‌شنبه">سه‌شنبه</Select.Option>
                                            <Select.Option value="چهارشنبه">چهارشنبه</Select.Option>
                                            <Select.Option value="پنج شنبه">پنج شنبه</Select.Option>
                                        </Select>
                                    </div>
                                    <div className="w-1/2" dir="ltr">
                                        <TimePicker.RangePicker onChange={(value) => handleTimeChange(value,i)} className="border-[#A7A9AD] rounded-lg rounded-r-none py-2 px-3 border-r-0 font-iransansfa" placeholder={['شروع', 'پایان']} // <-- This is the key line
                                            format={format}
                                            separator={<span>-</span>} // Custom separator

                                        />
                                    </div>

                                </div>
                            ))}
                        </div>

                        <div className="">
                            <button onClick={() => setNum(prev => prev + 1)} className="flex cursor-pointer items-center justify-center m-auto bg-transparent border-dashed p-1.5 rounded-lg border-[#D9D9D9]" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M9.99984 4.1665V15.8332M4.1665 9.99984H15.8332" stroke="#929292" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2.5" >

                        <div className="flex">
                            <label for="name">
                                تاریخ امتحان                            </label>


                        </div>
                        <div className="flex  ">


                            <div dir="ltr" className=" examDate flex w-1/2 items-center border border-solid border-[#A7A9AD] rounded-lg rounded-l-none outline-none text-base px-3">
                                <DatePicker onChange={(e) => handleDateChange(e)} placeholder="انتخاب تاریخ" className="border-none h-full font-iransansfa " />

                            </div>
                            <div className="w-1/2" dir="ltr">
                                <TimePicker.RangePicker onChange={(e) => handleExamTime(e)} className="border-[#A7A9AD] font-iransansfa rounded-lg rounded-r-none py-2 px-3 border-r-0" placeholder={['شروع', 'پایان']} // <-- This is the key line
                                    format={format}
                                    separator={<span>-</span>}
                                />
                            </div>

                        </div>
                    </div>
                    <div className="w-full ">
                        <button onClick={() => handleAddUnit()} className="cursor-pointer w-full bg-[#4CC6CB] py-3 px-3 text-white outline-none border-none rounded-lg text-base font-bold" type="button">
                            افزودن
                        </button>
                    </div>


                </div>


            </Modal>



        </DndContext>
    );
};
export default CoursesList;
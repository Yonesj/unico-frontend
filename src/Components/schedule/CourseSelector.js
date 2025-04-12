import CollegeCombobox from "../../Components/schedule/CollegeCombobox";
import BInput from "../../Components/dls/BInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Loading from "../../Components/Loading";
import messages from "../../constants/messages";
import { useToast } from "../../Components/dls/toast/ToastService";
import { convertEnglishNumberToPersian } from "../../utils/helpers";
import { ReactComponent as SearchIcon } from "../../Assets/images/search-md.svg";
import { ReactComponent as Repeat } from "../../Assets/images/repeat-04.svg";
import GolestanLoginModal from '../../Components/Modal/GolestanLoginModal';

export default function CourseSelector({
  mode = "search",
  schedules,
  setCoursesOfSchedule,
  currentScheduleId,
  setSchedules,
}) {
  if (!["search", "filter"].includes(mode)) {
    throw new Error("The mode should be either search or filter.");
  }
  const [golestanModal, setGolestanModal] = useState(false);
  const handleOk = ()=>
  {
      setGolestanModal(false);
      
  }
  const getDaysOfWeek = (dayKey) => {
    const dayNamesFa = {
      sun: "یک‌شنبه",
      mon: "دوشنبه",
      tue: "سه‌شنبه",
      wed: "چهارشنبه",
      thu: "پنج‌شنبه",
      fri: "جمعه",
      sat: "شنبه",
    };
    return dayNamesFa[dayKey] || dayKey;
  };
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [toolTip, setToolTip] = useState("");
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [add, setAdd] = useState(false);
  const parentRef = useRef();
  useEffect(() => {
    const schedules = JSON.parse(localStorage.getItem("schedules"));
    schedules.map((schedule) => {
      if (schedule.id === currentScheduleId) {
        setSelected(schedule.courses);
        console.log(selected, "selected");
      }
    });
  }, [currentScheduleId, schedules]);

  useEffect(() => {
    setIsLoading(true);
    const savedCourses = JSON.parse(localStorage.getItem("courses"));
    if (savedCourses) {
      setCourses(savedCourses);
      setIsLoading(false);
    } else {
      fetch("/courses.json")
        .then((res) => res.json())
        .then((data) => {
          setCourses(data.courses);
          localStorage.setItem("courses", JSON.stringify(data));
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("خطا در دریافت داده‌ها:", err);
          toast.open({ message: messages.ERROR_OCCURRED, type: "error" });
          setIsLoading(false);
        });
    }
  }, []);
  const filteredCourses =
    query === "" || !Array.isArray(courses)
      ? courses
      : courses.filter((course) => {
          const code = course.course_code || "";
          const name = course.course_name || "";
          const presenter = course.professor_name || "";

          return (
            code.includes(query) ||
            name.includes(query) ||
            presenter.includes(query)
          );
        });

  const addCourseToSchedule = (course) => {
    setSchedules((prev) => {
      setAdd(!add);
      const updatedSchedules = prev.map((schedule) => {
        if (schedule.id === currentScheduleId) {
          console.log(schedule.courses, "dsakdsalkdskl");
          const courseExists = schedule.courses?.some(
            (existingCourse) =>
              existingCourse.id === course.id && existingCourse.mode !== "hover"
          );
          console.log("courseExists", course);
          if (courseExists) {
            toast.open({
              message: "این درس قبلاً به برنامه اضافه شده است.",
              type: "error",
            });
            return schedule;
          }

          return {
            ...schedule,
            courses: [...(schedule.courses || []), course],
          };
        }
        return schedule;
      });

      localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
      return updatedSchedules;
    });
  };
  useEffect(() => {
    console.log('parentRef:', parentRef.current);
  }, []);
  const addCourseAsHoverToSchedule = (course) => {
    setSchedules((prev) => {
      setAdd(!add);

      const updatedSchedules = prev.map((schedule) => {
        if (schedule.id === currentScheduleId) {
          const exists = schedule.courses?.some((c) => c.id === course.id);

          if (exists) return schedule;

          return {
            ...schedule,
            courses: [
              ...(schedule.courses || []),
              { ...course, mode: "hover" },
            ],
          };
        }
        return schedule;
      });

      localStorage.setItem("schedules", JSON.stringify(updatedSchedules));

      return updatedSchedules;
    });
  };

  const removeHoverCourseFromSchedule = (course) => {
    setSchedules((prev) => {
      setAdd(!add);

      const updatedSchedules = prev.map((schedule) => {
        if (schedule.id === currentScheduleId) {
          return {
            ...schedule,
            courses: (schedule.courses || []).filter(
              (c) => !(c.id === course.id && c.mode === "hover")
            ),
          };
        }
        return schedule;
      });

      localStorage.setItem("schedules", JSON.stringify(updatedSchedules));

      return updatedSchedules;
    });
  };
  

  return (
    <div className="    rounded-xl bg-white  backdrop-blur p-1    overflow-visible ">
      <BInput
        value={query}
        icon={SearchIcon}
        placeholder="نام درس را وارد کنید ..."
        dir="rtl"
        wrapperClass="  px-[16px] py-[12px] border border-[#A7A9AD]  text-[12px]     font-thin"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid  text-center text-gray-500  border-b-2 py-1  border-[#F5F6F7] grid-cols-2 justify-between  w-full  text-sm ">
        <div className="col-span-1 "> نام درس</div>
        <div className="col-span-1"> زمان</div>
      </div>
      <div   ref={parentRef} className="course-list   h-[460px] relative  w-full   ">
        {isLoading ? (
          <Loading />
        ) : (
          filteredCourses.map((course, i) => {
            const isSelected = selected.some((c) => c.id === course.id);
            return (
              <>
                <div
                  key={i}
                  
                  className={`    grid grid-cols-2 text-center    h-[76px] cursor-pointer justify-center items-center bg-[#FFFFFF] px-2 text-primary-darker transition-all hover:bg-[#F0F3F5] hover:text-gray-800   ${
                    isSelected ? "bg-[#FDF7EB] text-[#DF9200]" : "bg-white"
                  }`}
                  onMouseEnter={(e) => {
                    addCourseAsHoverToSchedule(course);
                    setHoveredCourse(course);
                    if (parentRef.current) {
                      const parentRect = parentRef.current.getBoundingClientRect();
                      const mouseOffsetFromParentTop = e.clientY - parentRect.top;
                      setToolTip(mouseOffsetFromParentTop)
                      console.log('فاصله موس از بالای div والد:', mouseOffsetFromParentTop);
                    }
                  }}
                  onMouseLeave={() => {
                    removeHoverCourseFromSchedule(course);
                    setHoveredCourse(null);
                  }}
                  onClick={() => addCourseToSchedule(course)}
                >
                  <div className="col-span-1 font-medium text-sm  justify-center">
                    {course.course_name}
                  </div>

                  <ul className="col-span-1 justify-center">
                    {course.classes.map((cls, index) => (
                      <li
                        className="font-medium text-xs leading-tight justify-center"
                        key={index}
                      >
                        {cls?.day && cls?.start && cls?.end ? (
                          <>
                            {getDaysOfWeek(cls.day)} :{" "}
                            {convertEnglishNumberToPersian(cls.start)} -{" "}
                            {convertEnglishNumberToPersian(cls.end)}
                          </>
                        ) : (
                          "-"
                        )}
                      </li>
                    ))}
                  </ul>

                  {hoveredCourse === course && (
                    <div style={{top : toolTip + 50}} className="fixed   left-full z-[100] ml-4 bg-gray-800/40 rounded-md backdrop-blur-md px-3 py-2.5 inline-flex flex-col justify-start items-start gap-1.5 font-iransans w-72">
                      <div className=" self-stretch text-right text-white text-xs font-medium font-iransans w-full">
                        نام درس: {course?.course_name || "—"} (
                        {convertEnglishNumberToPersian(course?.course_code) ||
                          "—"}{" "}
                        )
                      </div>
                      <div className="text-right text-white text-xs font-medium font-iransans w-full">
                        نام استاد: {course?.professor_name || "—"}
                      </div>
                      <div className="text-right text-white text-xs font-medium font-iransans w-full">
                        تعداد واحد:{" "}
                        {convertEnglishNumberToPersian(course?.theory) || "—"}
                      </div>
                      <div className="text-right text-white text-xs font-medium font-iransans w-full">
                        ظرفیت:{" "}
                        {convertEnglishNumberToPersian(course?.capacity) || "—"}
                      </div>
                      <div className="text-right text-white text-xs font-medium font-iransans w-full">
                        تاریخ امتحان:
                        {course.exam ? (
                          <>
                            {convertEnglishNumberToPersian(course?.exam?.date)}{" "}
                            از{" "}
                            {convertEnglishNumberToPersian(course?.exam?.start)}{" "}
                            تا{" "}
                            {convertEnglishNumberToPersian(course?.exam?.end)}
                          </>
                        ) : (
                          "-"
                        )}
                      </div>

                      <div className="text-right text-white text-xs font-medium font-iransans w-full">
                        توضیحات: {course.notes || "—"}
                      </div>
                    </div>
                  )}
                </div>
                
              </>
            );

          })
        )}
      </div>
      <div className="absolute h-[15%] z-10 pointer-events-none p-10  bottom-0 w-full bg-gradient-to-b from-white/0 to-white rounded-bl-xl rounded-br-xl">
                </div>
                <button onClick={()=>{setGolestanModal(true)}} className='left-6 z-20 bottom-4 absolute bg-[#00ADB5] rounded-lg p-[10px] font-medium text-md text-white gap-2.5'>


<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.63617 0.803166C8.92907 0.510273 9.40394 0.510273 9.69683 0.803166L11.3635 2.46983C11.5042 2.61048 11.5832 2.80125 11.5832 3.00016C11.5832 3.19908 11.5042 3.38984 11.3635 3.53049L9.69683 5.19716C9.40394 5.49005 8.92907 5.49005 8.63617 5.19716C8.34328 4.90427 8.34328 4.42939 8.63617 4.1365L9.03242 3.74025C5.99381 4.20599 3.6665 6.83129 3.6665 10.0002C3.6665 12.1049 4.69245 13.97 6.27481 15.1228C6.6096 15.3667 6.68326 15.8359 6.43935 16.1706C6.19544 16.5054 5.72631 16.5791 5.39153 16.3352C3.43833 14.9121 2.1665 12.6046 2.1665 10.0002C2.1665 6.01193 5.14701 2.71984 9.00212 2.22977L8.63617 1.86383C8.34328 1.57093 8.34328 1.09606 8.63617 0.803166ZM13.5603 3.82969C13.8042 3.4949 14.2734 3.42124 14.6081 3.66515C16.5613 5.08818 17.8332 7.39569 17.8332 10.0002C17.8332 13.9884 14.8527 17.2805 10.9976 17.7706L11.3635 18.1365C11.6564 18.4294 11.6564 18.9043 11.3635 19.1972C11.0706 19.4901 10.5957 19.4901 10.3028 19.1972L8.63617 17.5305C8.49552 17.3898 8.4165 17.1991 8.4165 17.0002C8.4165 16.8012 8.49552 16.6105 8.63617 16.4698L10.3028 14.8032C10.5957 14.5103 11.0706 14.5103 11.3635 14.8032C11.6564 15.0961 11.6564 15.5709 11.3635 15.8638L10.9672 16.2601C14.0059 15.7943 16.3332 13.169 16.3332 10.0002C16.3332 7.89541 15.3072 6.03036 13.7249 4.87751C13.3901 4.6336 13.3164 4.16447 13.5603 3.82969Z" fill="white" />
</svg>
</button>
<GolestanLoginModal onOk={() => handleOk()} onClose={() =>setGolestanModal(false)} open={golestanModal} />

    </div>
  );
}

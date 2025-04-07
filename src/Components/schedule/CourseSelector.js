import CollegeCombobox from "../../Components/schedule/CollegeCombobox";
import BInput from "../../Components/dls/BInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import messages from "../../constants/messages";
import { useToast } from "../../Components/dls/toast/ToastService";
import { convertEnglishNumberToPersian } from "../../utils/helpers";
import { ReactComponent as SearchIcon } from "../../Assets/images/search-md.svg";
import { ReactComponent as Repeat } from "../../Assets/images/repeat-04.svg";

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
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [add, setAdd] = useState(false);

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
    <div className="min-w-[20rem] max-w-[20rem]    rounded-xl bg-white  backdrop-blur p-1   ">
      <BInput
        value={query}
        icon={SearchIcon}
        placeholder="نام درس را وارد کنید ..."
        dir="rtl"
        wrapperClass="  px-[16px] py-[12px] border border-[#A7A9AD]  text-[12px]    font-thin"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid  text-center text-gray-500  border-b-2 py-5  border-[#F5F6F7] grid-cols-2 justify-between  w-full  text-sm ">
        <div className="col-span-1 "> نام درس</div>
        <div className="col-span-1"> زمان</div>
      </div>
      <div className="course-list  h-[41rem]   overflow-y-scroll    ">
        {isLoading ? (
          <Loading />
        ) : (
          filteredCourses.map((course, i) => {
            const isSelected = selected.some((c) => c.id === course.id);
            return (
              <>
                <div
                  key={i}
                  
                  className={`  relative  grid grid-cols-2 text-center    h-[76px] cursor-pointer justify-center items-center bg-[#FFFFFF] px-2 text-primary-darker transition-all hover:bg-[#F0F3F5] hover:text-gray-800   ${
                    isSelected ? "bg-[#FDF7EB] text-[#DF9200]" : "bg-white"
                  }`}
                  onMouseEnter={() => {
                    addCourseAsHoverToSchedule(course);
                    setHoveredCourse(course);
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
                    <div className="absolute  -right-72  z-[100] ml-4 bg-gray-800/40 rounded-md backdrop-blur-md px-3 py-2.5 inline-flex flex-col justify-start items-start gap-1.5 font-iransans w-72">
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
      <div className="absolute h-[15%] z-10  p-10 bottom-0 w-full bg-gradient-to-b from-white/0 to-white rounded-bl-xl rounded-br-xl">
                </div>
      <div className=" absolute z-50  bottom-2  left-4">
      <Repeat className="  bg-[#00ADB5]  text-[#FFFFFF] rounded-lg   m-1 w-[36px] h-[36px] p-[8px] 
      "/>
      </div>
    </div>
  );
}

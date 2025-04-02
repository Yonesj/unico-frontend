import CollegeCombobox from "../../Components/schedule/CollegeCombobox";
import BInput from "../../Components/dls/BInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import messages from "../../constants/messages";
import { useToast } from "../../Components/dls/toast/ToastService";

export default function CourseSelector({
  mode = "search",
  setCoursesOfSchedule,
  currentScheduleId,
  setSchedules,
}) {
  if (!["search", "filter"].includes(mode)) {
    throw new Error("The mode should be either search or filter.");
  }

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState([]);

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
          setCourses(data);
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
          console.log("Before update:", prev); // نمایش اطلاعات قبل از به‌روزرسانی
          const updatedSchedules = prev.map((schedule) => {
            console.log("Schedule:", schedule); // نمایش اطلاعات هر schedule
            if (schedule.id === currentScheduleId) {
              return {
                ...schedule,
                courses: [...(schedule.courses || []), course], // اضافه کردن دوره جدید
              };
            }
      
            return schedule;
          });
      
          console.log("Updated schedules:", updatedSchedules); // نمایش اطلاعات به‌روزرسانی‌شده
          localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
          return updatedSchedules;
        });
      
        setCoursesOfSchedule((prev) => [...prev, course]);
      };
      
      

  const addCourseAsHover = (course) => {
    setCoursesOfSchedule((prev) => {
      if (!prev.find((c) => c.id === course.id)) {
        return [...prev, { ...course, mode: "hover" }];
      }
      return prev;
    });
  };

  const removeCourse = (course) => {
    setCoursesOfSchedule((prev) => {
      return prev.filter((c) => c.id !== course.id || c.mode !== "hover");
    });
  };

  return (
    <div className="min-w-[20rem] max-w-[20rem] space-y-4 rounded-xl bg-white p-4 backdrop-blur">
      <BInput
        value={query}
        icon={faSearch}
        placeholder="نام درس را وارد کنید ..."

        dir="rtl"
        wrapperClass="shadow-md"
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="max-h-[38.5rem] space-y-2 overflow-auto">
        {isLoading ? (
          <Loading />
        ) : (
          filteredCourses.map((course, i) => (
            <div
              key={i}
              className="flex cursor-pointer items-center justify-between rounded bg-grey-300/60 px-2 py-1 text-primary-darker transition-all hover:bg-grey-300"
              onMouseEnter={() => addCourseAsHover(course)}
              onMouseLeave={() => removeCourse(course)}
              onClick={() => addCourseToSchedule(course)}
            >
              <span>{course.course_name}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

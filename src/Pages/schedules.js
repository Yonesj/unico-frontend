import React, { useEffect, useState } from "react";
import Schedule from "../Components/schedule/Schedule";
import ScheduleTabs from "../Components/schedule/ScheduleTabs";
import CourseSelector from "../Components/schedule/CourseSelector";


const SchedulesPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [currentScheduleId, setCurrentScheduleId] = useState(1);
  const [courses, setCourses] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedSchedules = localStorage.getItem("schedules");
        let schedulesData = storedSchedules ? JSON.parse(storedSchedules) : [];

        if (!storedSchedules) {

          schedulesData = [
            {
              id: 1,
              courses: [],
            },
          ];

          localStorage.setItem("schedules", JSON.stringify(schedulesData));
        }

        setSchedules(schedulesData);

        if (schedulesData.length > 0) {
          setCurrentScheduleId(schedulesData[0].id);
          setCourses(schedulesData[0].courses);
        }
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCourses(
      schedules.find((s) => s.id === currentScheduleId)?.courses || []
    );
  }, [currentScheduleId, schedules]);

  return (
    <div className=" flex-wrap grid grid-cols-4 bg-[#F1F5F7] gap-2 w-full justify-center  text-black font-iransans h-[520px]   ">
      <div className="flex  col-span-3 grow flex-col justify-between  space-y-5 rounded-xl bg-[#ffffff] p-4 backdrop-blur">
        <ScheduleTabs
          currentScheduleId={currentScheduleId}
          schedules={schedules.map((s) => ({
            id: s.id,
          }))}
          setCurrentScheduleId={setCurrentScheduleId}
          setSchedules={setSchedules}
        />

        <Schedule
          courses={courses}
          setCurrentScheduleId={setCurrentScheduleId}
          currentScheduleId={currentScheduleId}
          setSchedules={setSchedules}
          schedules={schedules}
        />
      </div>
      <div className="col-span-1 ">
        <CourseSelector
          schedules={schedules}
          currentScheduleId={currentScheduleId}
          setCoursesOfSchedule={setCourses}
          setSchedules={setSchedules}
        />
      </div>
    </div>
  );
};

export default SchedulesPage;

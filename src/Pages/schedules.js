import React, { useEffect, useState } from "react";
import Schedule from "../Components/schedule/Schedule";
import ScheduleTabs from "../Components/schedule/ScheduleTabs";
import CourseSelector from "../Components/schedule/CourseSelector";
import Sidebar from "../Components/Sidebar/Sidebar"
import api from "../services/api";
import { setToken } from "../services/axios";
import { getSession } from "../services/authService";
import { courseMapper } from "../utils/mappers";
import { convertEnglishNumberToPersian } from "../utils/helpers";
import ToastContext, { useToast } from "../Components/dls/toast/ToastService";

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
          const response = await fetch("/courses.json");
          const coursesData = await response.json();

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
  }, [currentScheduleId, schedules ]);


  return (
    <div className="flex h-full min-h-[55rem] w-full justify-center p-6 bg-[#F1F5F7] text-black font-iransans">
      
      <div className="flex w-[94.875rem] grow gap-4 relative ">
        <div className="absolute   right-0   z-[9999]">

        </div>      
          <div className="flex grow flex-col justify-between  ms-24   rounded-xl bg-white p-4 backdrop-blur">
          <ScheduleTabs
            currentScheduleId={currentScheduleId}
            schedules={schedules.map((s) => ({
              id: s.id,
            }))}
            onChange={setCurrentScheduleId}
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

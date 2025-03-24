import React, { useEffect, useState } from "react";
import Schedule from "../Components/schedule/Schedule";
import ScheduleTabs from "../Components/schedule/ScheduleTabs";
import CourseSelector from "../Components/schedule/CourseSelector";
import api from "../services/api";
import { setToken } from "../services/axios";
import { getSession } from "../services/authService"; 
import { courseMapper } from "../utils/mappers";

const SchedulesPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [currentScheduleId, setCurrentScheduleId] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const session = getSession(); 
      if (session) setToken(session.accessToken);

      try {
        const schedulesData = await api.schedule
          .fetchSchedules()
          .then((res) => res.data.data);
        const collegesData = await api.department
          .fetchColleges()
          .then((res) => res.data.data);

        schedulesData.forEach((schedule) => {
          schedule.courses = schedule.classes.map(courseMapper) || [];
          delete schedule.classes;
        });

        setSchedules(schedulesData);
        setColleges(collegesData);

        if (schedulesData.length > 0) {
          setCurrentScheduleId(schedulesData[0].id);
          setCourses(schedulesData[0].courses);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCourses(schedules.find((s) => s.id === currentScheduleId)?.courses || []);
  }, [currentScheduleId, schedules]);

  return (
    <div className="flex h-full min-h-[55rem] w-full justify-center p-6 text-black">
      <div className="flex max-w-[98.875rem] grow gap-4">
        <div className="flex grow flex-col justify-between rounded-xl bg-primary/50 p-4 backdrop-blur">
          <h1 className="text-2xl font-bold">برنامه هفتگی کلاس‌ها</h1>
          <ScheduleTabs
            currentScheduleId={currentScheduleId}
            schedules={schedules.map((s) => ({ id: s.id }))}
            onChange={setCurrentScheduleId}
            setSchedules={setSchedules}
          />
          <Schedule
            courses={courses}
            currentScheduleId={currentScheduleId}
            setSchedules={setSchedules}
          />
        </div>

        <CourseSelector
          colleges={colleges}
          currentScheduleId={currentScheduleId}
          setCoursesOfSchedule={setCourses}
          setSchedules={setSchedules}
        />
      </div>
    </div>
  );
};

export default SchedulesPage;

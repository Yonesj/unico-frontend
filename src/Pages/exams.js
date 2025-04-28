import React, { useEffect, useState } from 'react';
import ScheduleTabs from '../Components/schedule/ScheduleTabs';
import ExamsTable from '../Components/exams/ExamsTable';
import { getSession } from '../services/authService'; 
import { setToken } from '../services/axios';
import api from '../services/api';
import { courseMapper } from '../utils/mappers';

const ExamsPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentScheduleId, setCurrentScheduleId] = useState(null);
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

    <div className=' flex-wrap  bg-[#F1F5F7] gap-2 w-full justify-center  text-black font-iransans h-[600px]  '>
      <div className='flex  grow flex-col justify-between  space-y-5 rounded-xl bg-[#ffffff] p-4 backdrop-blur'>

        <ScheduleTabs
          exams={true}
          currentScheduleId={currentScheduleId}
          schedules={schedules.map((s) => ({ id: s.id }))}
          setCurrentScheduleId={setCurrentScheduleId}
        />
        <ExamsTable  courses={courses}
            setCurrentScheduleId={setCurrentScheduleId}
            currentScheduleId={currentScheduleId}
            setSchedules={setSchedules}
            schedules={schedules} />
      </div>
    </div>
  );
};

export default ExamsPage;

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
      const session = getSession(); 
      if (session) setToken(session.accessToken);

      try {
        const schedulesData = await api.schedule
          .fetchSchedules()
          .then((res) => res.data.data);

        schedulesData.forEach((schedule) => {
          schedule.courses = schedule.classes.map(courseMapper);
          delete schedule.classes;
        });

        setSchedules(schedulesData);
        if (schedulesData.length > 0) {
          setCurrentScheduleId(schedulesData[0].id);
          setCourses(schedulesData[0].courses);
        }
      } catch (error) {
        console.error('خطا در دریافت اطلاعات:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (currentScheduleId) {
      const selectedSchedule = schedules.find((s) => s.id === currentScheduleId);
      setCourses(selectedSchedule?.courses || []);
    }
  }, [currentScheduleId, schedules]);

  return (
    <div className='absolute flex h-full w-full justify-center p-6 text-black'>
      <div className='flex max-w-[98.875rem] grow flex-col justify-between gap-4 rounded-xl bg-primary/50 p-4 backdrop-blur'>
        <h1 className='text-2xl font-bold'>برنامه امتحانات</h1>
        <ScheduleTabs
          showAddButton={false}
          currentScheduleId={currentScheduleId}
          schedules={schedules.map((s) => ({ id: s.id }))}
          onChange={setCurrentScheduleId}
        />
        <ExamsTable courses={courses} />
      </div>
    </div>
  );
};

export default ExamsPage;

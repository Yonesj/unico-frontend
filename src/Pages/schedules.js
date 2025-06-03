import React, { useEffect, useState } from "react";
import Schedule from "../Components/schedule/Schedule";
import ScheduleTabs from "../Components/schedule/ScheduleTabs";
import CourseSelector from "../Components/schedule/CourseSelector";
import { useToast } from "../Components/dls/toast/ToastService";


const SchedulesPage = () => {
  const [schedules, setSchedules] = useState([]);   
  const [currentScheduleId, setCurrentScheduleId] = useState(1);
  const [courseListShow, setCourseListShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const toast = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedSchedules = localStorage.getItem("schedules");
        let schedulesData = storedSchedules ? JSON.parse(storedSchedules) : [];
  
        if (!storedSchedules) {
          setLoading(true);
          try {
            const response = await fetch(
              "http://localhost:8000/course-scheduler/plans/",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ4MTEwMzA4LCJpYXQiOjE3NDc1MDU1MDgsImp0aSI6ImIzNWJiNDY2MTI5MzQ2ZjE5ZGJjNDFjMDc3YzMyYjM3IiwidXNlcl9pZCI6MjV9.RoIM4mtxFWLqTtg2DcE1i3RRfympNTVXMH7qkxYw5hE"

                },
              }
            );
  
            const data = await response.json();
  
            if (!response.ok)
              throw new Error(data.message || "خطایی رخ داده است");

              console.log("plans " , data);
            localStorage.setItem("schedules", JSON.stringify(data || []));
            toast.open({
              message: "برنامه‌ها با موفقیت دریافت شد",
              type: "success",
            });
  
            schedulesData = data; 
          } catch (err) {
            toast.open({
              message: err.message || "خطایی رخ داده است",
              type: "error",
            });
          } finally {
            setLoading(false);
          }
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
    <div className="  flex-wrap grid grid-cols-4 bg-[#F1F5F7] gap-2 w-full justify-center  text-black font-iransans  h-[fit] ">
      <div className={`flex  grow flex-col   space-y-5 rounded-xl bg-[#ffffff] p-4 backdrop-blur ${
    courseListShow ? "col-span-3" : "col-span-4"
  } `}>
        <ScheduleTabs
          currentScheduleId={currentScheduleId}
          schedules={schedules.map((s) => ({
            id: s.id,
          }))}
          setCurrentScheduleId={setCurrentScheduleId}
          setSchedules={setSchedules}
          setCourseListShow={setCourseListShow}
          courseListShow={courseListShow}

        />

        <Schedule
          courses={courses}
          setCurrentScheduleId={setCurrentScheduleId}
          currentScheduleId={currentScheduleId}
          setSchedules={setSchedules}
          schedules={schedules}
        />
      </div> 
      <div className={`   transition-all ${
    courseListShow ? "col-span-1" : "hidden"
  }`}>
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

import FullCalendar from "@fullcalendar/react";
import faLocale from "@fullcalendar/core/locales/fa";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DayTimeColsView } from "@fullcalendar/timegrid/internal";
import Course from "../../Components/schedule/Course";
import { convertEnglishNumberToPersian } from "../../utils/helpers";
import { weekDays } from "../../constants/const";
import { useState, useEffect, useRef } from "react";
import { useTimerToast } from "../../Components/dls/toast/TimerToastContext";
import { useToast } from "../../Components/dls/toast/ToastService";
import schedule from "../../services/api/schedule";
import ContextMenuSelector from "../ContextMenuSelector";
import { CopyOutlined, DeleteOutlined, ShareAltOutlined } from "@ant-design/icons";

export default function Schedule({
  currentScheduleId,
  setCurrentScheduleId,
  setSchedules,
  schedules,
  setCoursesOfSchedule,
}) {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [courseIdToBeDeleted, setCourseIdToBeDeleted] = useState(null);
  const [courses, setCourses] = useState([]);
  const [contextMenuCourses, setContextMenuCourses] = useState([]);
  const [contextMenuPosition, setContextMenuPosition] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const calendarRef = useRef();

  const dayMap = {
    sat: 0,
    sun: 1,
    mon: 2,
    tue: 3,
    wed: 4,
    thu: 5,
    fri: 6,
  };
  const [remove, setRemove] = useState(false);
  const timerToast = useTimerToast();

  useEffect(() => {
    const calendarEl = document.querySelector(".fc-timegrid");
  
    const handleRightClick = (e) => {
      e.preventDefault();
      if (!calendarEl) return;
  
      const timeSlot = e.target.closest(".fc-timegrid-slot");
      if (!timeSlot) return;
  
      const timeAttr = timeSlot.getAttribute("data-time");
      const hour = Number(timeAttr?.split(":")[0]);
      if (isNaN(hour)) return;
  
      const calendarRect = calendarEl.getBoundingClientRect();
      const x = e.clientX - calendarRect.left;
      const colEls = calendarEl.querySelectorAll(".fc-timegrid-col:not(.fc-timegrid-axis)");
      const colWidth = colEls[0]?.getBoundingClientRect().width || 0;
      const totalCols = colEls.length;
      const colIndex = totalCols - 1 - Math.floor(x / colWidth);
      if (isNaN(colIndex)) return;
      const baseDate = new Date("2025-04-05");
      baseDate.setDate(baseDate.getDate() + colIndex);
      const day = baseDate.toLocaleString("en-US", { weekday: "short" }).toLowerCase();
  
      setContextMenuPosition({
        x: e.clientX - calendarRect.left,
        y: e.clientY - calendarRect.top,
      });
  
      findCoursesMatchingSlot(day, hour, {
        x: e.clientX - calendarRect.left,
        y: e.clientY - calendarRect.top,
      });
    };
  
    calendarEl?.addEventListener("contextmenu", handleRightClick);
    return () => {
      calendarEl?.removeEventListener("contextmenu", handleRightClick);
    };
  }, []);
  
  const findCoursesMatchingSlot = (day, hour, position) => {
  const myCourses = JSON.parse(localStorage.getItem("courses"));
  if (!myCourses) return;

  const matchingCourses = myCourses.filter((course) =>
    (course.classes || []).some((cls) => {
      console.log("day" , day , "hour" , hour);
      return cls.day === day && cls.start <= hour && cls.end > hour;
    })
  );

  setContextMenuCourses(matchingCourses);
  if(matchingCourses.length==0){
    toast.open({
      message:"درسی در این بازه زمانی یافت نشد",
      type:"error"
    }
      
    )
  }
  setContextMenuPosition(position); 
};


const deleteSchedule = () => {
  if (!currentScheduleId) return;

  if (schedules.length === 1) {
    timerToast.open({
      message: "حداقل باید یک برنامه باقی بماند.",
      type: "info",
      duration: 3000,
    });
    return;
  }

  const deletedSchedule = schedules.find((s) => s.id === currentScheduleId);
  if (!deletedSchedule) return;

  setSchedules((prev) => {
    const updated = prev.filter((s) => s.id !== currentScheduleId);
    localStorage.setItem("schedules", JSON.stringify(updated));

    if (currentScheduleId === deletedSchedule.id && updated.length > 0) {
      setCurrentScheduleId(updated[0].id);
    } else if (updated.length === 0) {
      setCurrentScheduleId(null);
    }

    return updated;
  });

  timerToast.open({
    message: `برنامه "${deletedSchedule.name}" حذف شد.`,
    type: "warning",
    duration: 5000,
    onUndo: () => {
      setSchedules((prev) => {
        const updated = [...prev, deletedSchedule];
        localStorage.setItem("schedules", JSON.stringify(updated));
        return updated;
      });
      setCurrentScheduleId(deletedSchedule.id);
    },
  });
};



  const convertCoursesToEvents = (courses) => {
    const baseDate = new Date("2025-04-05");
    const events = [];

    courses.forEach((course) => {
      (course.classes || []).forEach((cls, index) => {
        if (cls.start == null || cls.end == null || !cls.day) return;

        const classDate = new Date(baseDate);
        classDate.setDate(baseDate.getDate() + dayMap[cls.day]);

        const dateStr = classDate.toISOString().split("T")[0];
        const pad = (n) => String(n).padStart(2, "0");

        events.push({
          id: `${course.id}_${index}`,
          start: `${dateStr}T${pad(cls.start)}:00:00`,
          end: `${dateStr}T${pad(cls.end)}:00:00`,
          extendedProps: {
            ...course,
            classInfo: cls,
          },
        });
      });
    });

    console.log("Converted Events:", events);
    return events;
  };
  useEffect(() => {
    const currentSchedule = schedules.find((s) => s.id === currentScheduleId);
    setCourses(currentSchedule ? currentSchedule.courses : []);
  }, [currentScheduleId, remove, schedules, setCoursesOfSchedule]);

  const handleEventClick = (clickInfo) => {
    const courseId = Number(clickInfo.event.extendedProps.id);
    const courseData = clickInfo.event.extendedProps;

    if (isNaN(courseId)) return;

    setSchedules((prev) => {
      const updated = prev.map((schedule) => {
        if (schedule.id === currentScheduleId) {
          return {
            ...schedule,
            courses: schedule.courses.filter((c) => c.id !== courseId),
          };
        }
        return schedule;
      });

      localStorage.setItem("schedules", JSON.stringify(updated));
      return updated;
    });

    setCourses((prev) => prev.filter((c) => c.id !== courseId));

    timerToast.open({
      message: `درس "${courseData.course_name} - ${courseData.course_code.slice(
        -2
      )} " حذف شد.`,
      type: "warning",
      duration: 5000,
      onUndo: () => {
        setSchedules((prev) => {
          const updated = prev.map((schedule) => {
            if (schedule.id === currentScheduleId) {
              return {
                ...schedule,
                courses: [...(schedule.courses || []), courseData],
              };
            }
            return schedule;
          });

          localStorage.setItem("schedules", JSON.stringify(updated));
          return updated;
        });

        setCourses((prev) => [...prev, courseData]);
      },
    });
  };
 
  const removeCourse = () => {
    setRemove(!remove);
    setSchedules((prev) => {
      const updatedSchedules = prev.map((schedule) => {
        if (schedule.id === currentScheduleId) {
          console.log(courseIdToBeDeleted, "courseIdToBeDeleted");
          const updatedCourses = (schedule.courses || []).filter(
            (course) => course.id !== courseIdToBeDeleted
          );

          return { ...schedule, courses: updatedCourses };
        }
        return schedule;
      });

      localStorage.setItem("schedules", JSON.stringify(updatedSchedules));

      return updatedSchedules;
    });
    setIsOpen(false);

    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.course_code !== courseIdToBeDeleted)
    );
  };

  return (
    <div className="h-[700px]  relative  ">
      <FullCalendar
        ref={calendarRef}

        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        headerToolbar={false}
        editable={false}
        selectable={false}
        expandRows
        dayMaxEvents
        eventOverlap={false}
        slotEventOverlap={true}
        weekends
        events={convertCoursesToEvents(courses)}
        eventClick={handleEventClick}
        slotMinTime={"07:00"}
        slotMaxTime={"20:00"}
        direction="rtl"
        initialDate={"2025-04-05"}
        locale={faLocale}
        firstDay={0}
        
        
        height={"700px"}
        views={{
          timeGrid: {
            component: DayTimeColsView,
            usesMinMaxTime: true,
            allDaySlot: false,
            slotDuration: "01:00:00",
            duration: { days: 6 },
            slotLabelContent: ({ date }) => (
              <div className="me-1 ms-2 text-sm font-medium  text-gray-500">
                {convertEnglishNumberToPersian(date.getHours().toString())}:۰۰
              </div>
            ),
            dayHeaderContent: ({ date }) => (
              <div className="pb-2 text-sm font-medium text-gray-500">
                {
                  weekDays[
                    ((date.getDay() % weekDays.length) + weekDays.length) %
                      weekDays.length
                  ]
                }
              </div>
            ),
            eventContent: (arg) => {
              const calendarApi = arg.view.calendar;
              const thisEvent = arg.event;
        
              const overlapping = calendarApi.getEvents().filter((ev) => {
                return (
                  ev.id !== thisEvent.id &&
                  ev.start < thisEvent.end &&
                  ev.end > thisEvent.start
                );
              });
        
              const isOverlapping = overlapping.length > 0;
        
              return (
                <Course
                  course={{
                    id: thisEvent.id,
                    ...thisEvent.extendedProps,
                  }}
                  isOverlapping={isOverlapping}
                />
              );
            },
          },
        }}

        
      />
      {contextMenuPosition && contextMenuCourses.length > 0 && (
  <ContextMenuSelector
    position={contextMenuPosition}
    options={contextMenuCourses}
    onSelect={(selectedId) => {
      const selectedCourse = contextMenuCourses.find((c) => c.id === Number(selectedId));
      if (!selectedCourse) return;

      setSchedules((prev) => {
        const updated = prev.map((schedule) => {
          if (schedule.id === currentScheduleId) {
            return {
              ...schedule,
              courses: [...(schedule.courses || []), selectedCourse],
            };
          }
          return schedule;
        });

        localStorage.setItem("schedules", JSON.stringify(updated));
        return updated;
      });

      setCourses((prev) => [...prev, selectedCourse]);
    }}
    onClose={() => setContextMenuPosition(null)}
  />
)}
<div dir="ltr" className="absolute left-0 bottom-[2px] flex justify-between w-[138px] h-[38px] z-50  ">
<div><DeleteOutlined  onClick={deleteSchedule} className="text-xl p-[9px]  bg-[#E03B3A] text-[#FFFFFF] rounded-lg  " /></div>
<div><CopyOutlined  className="text-xl p-[9px]  bg-[#EDF1F3] text-[#64696F] rounded-lg  "/></div>
<div><ShareAltOutlined  className="text-xl  p-[9px] bg-[#EDF1F3] text-[#64696F] rounded-lg  "/></div>



</div>
    </div>
  );
}

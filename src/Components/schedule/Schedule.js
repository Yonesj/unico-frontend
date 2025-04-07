import FullCalendar from "@fullcalendar/react";
import faLocale from "@fullcalendar/core/locales/fa";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DayTimeColsView } from "@fullcalendar/timegrid/internal";
import Course from "../../Components/schedule/Course";
import { convertEnglishNumberToPersian } from "../../utils/helpers";
import { weekDays } from "../../constants/const";
import DeleteCourseDialogConfirmation from "../../Components/schedule/DeleteCourseDialogConfirmation";
import { useState, useEffect } from "react";
import { useToast } from "../../Components/dls/toast/ToastService";

export default function Schedule({ currentScheduleId, setSchedules }) {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [courseIdToBeDeleted, setCourseIdToBeDeleted] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedSchedules = JSON.parse(localStorage.getItem("schedules")) || [];
    const currentSchedule = storedSchedules.find((s) => s.id === currentScheduleId);
    setCourses(currentSchedule ? currentSchedule.courses : []);
  }, [currentScheduleId]);

  const handleEventClick = (clickInfo) => {
    setCourseIdToBeDeleted(Number(clickInfo.event.id));
    setIsOpen(true);
  };

  const removeCourse = () => {
    setSchedules((prev) => {
      const updatedSchedules = prev.map((schedule) => {
        if (schedule.id === currentScheduleId) {
          const updatedCourses = schedule.courses.filter(
            (course) => course.id !== courseIdToBeDeleted
          );
          return { ...schedule, courses: updatedCourses };
        }
        return schedule;
      });

      localStorage.setItem("schedules", JSON.stringify(updatedSchedules));

      return updatedSchedules;
    });

    toast.open({
      message: "درس با موفقیت حذف شد.",
      type: "success",
    });

    setIsOpen(false);
  };

  return (
    <div className="">
      <DeleteCourseDialogConfirmation
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={removeCourse}
      />
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={false}
        editable={false}
        selectable={false}
        expandRows
        dayMaxEvents
        eventOverlap={false}
        slotEventOverlap={true}
        weekends
        events={courses}
        eventClick={handleEventClick}
        slotMinTime={"07:00"}
        slotMaxTime={"20:00"}
        direction="rtl"
        initialDate={"2023-12-30"}
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
              <div className="me-1 ms-2 text-sm font-medium">
                {convertEnglishNumberToPersian(date.getHours().toString())}:۰۰
              </div>
            ),
            dayHeaderContent: ({ date }) => (
              <div className="pb-2 text-sm font-medium">
                {
                  weekDays[
                    ((date.getDay() % weekDays.length) + weekDays.length) %
                      weekDays.length
                  ]
                }
              </div>
            ),
            eventContent: (event) => (
              <Course
                course={{
                  id: event.event.id,
                  ...event.event.extendedProps,
                }}
              ></Course>
            ),
          },
        }}
      />
    </div>
  );
}

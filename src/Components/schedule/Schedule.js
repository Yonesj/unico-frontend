import FullCalendar from "@fullcalendar/react";
import faLocale from "@fullcalendar/core/locales/fa";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DayTimeColsView } from "@fullcalendar/timegrid/internal";
import Course from "../../Components/schedule/Course";
import { convertEnglishNumberToPersian, convertPersianNumberToEnglish } from "../../utils/helpers";
import { weekDays } from "../../constants/const";
import DeleteCourseDialogConfirmation from "../../Components/schedule/DeleteCourseDialogConfirmation";
import { useState } from "react";
import { useToast } from "../../Components/dls/toast/ToastService";

// Placeholder API function (replace with actual API call)
const deleteCourseFromSchedule = async (scheduleId, courseId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

export default function Schedule({ courses, currentScheduleId, setSchedules }) {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [courseIdToBeDeleted, setCourseIdToBeDeleted] = useState(null);

  const handleEventClick = (clickInfo) => {
    setCourseIdToBeDeleted(Number(clickInfo.event.id));
    setIsOpen(true);
  };

  const removeCourse = async () => {
    try {
      await deleteCourseFromSchedule(currentScheduleId, courseIdToBeDeleted);

      setSchedules((prev) =>
        prev.map((schedule) =>
          schedule.id === currentScheduleId
            ? {
                ...schedule,
                courses: schedule.courses.filter(
                  (course) => course.id !== courseIdToBeDeleted
                ),
              }
            : schedule
        )
      );

      toast.open({
        message: "درس با موفقیت حذف شد.",
        type: "success",
      });
    } catch (error) {
      toast.open({
        message: "خطایی رخ داده است.",
        type: "error",
      });
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="h-[700px] overflow-hidden ">
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
        selectMirror={false}
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
                {convertEnglishNumberToPersian(date.getHours().toString())}
              </div>
            ),
            dayHeaderContent: ({ date }) => (
              <div className="pb-2 text-sm  font-iransans text-gray-500">
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
              />
            ),
          },
        }}
      />
    </div>
  );
}

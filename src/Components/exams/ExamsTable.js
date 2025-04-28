import FullCalendar from "@fullcalendar/react";
import faLocale from "@fullcalendar/core/locales/fa";
import timeGridPlugin from "@fullcalendar/timegrid";
import { DayTimeColsView } from "@fullcalendar/timegrid/internal";
import Course from "../schedule/Course";
import { convertEnglishNumberToPersian } from "../../utils/helpers";
import { useState, useEffect, useRef, useCallback } from "react";
import { useToast } from "../dls/toast/ToastService";
import jalaali from 'jalaali-js';

export default function Schedule({
  currentScheduleId,
  setCurrentScheduleId,
  setSchedules,
  schedules,
  setCoursesOfSchedule,
}) {
  const toast = useToast();
  const [courses, setCourses] = useState([]);
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

  const convertCoursesToEvents = useCallback((courses) => {
    const baseDate = new Date("2025-04-05");
    const events = [];

    courses.forEach((course) => {
      if (course.exam && course.exam.start && course.exam.end && course.exam.date) {
        const [year, month, day] = course.exam.date.split("/").map(Number);
        const convertedDate = jalaali.toGregorian(year, month, day);
        const classDate = new Date(convertedDate.gy, convertedDate.gm - 1, convertedDate.gd);

        const dateStr = classDate.toISOString().split("T")[0];

        const pad = (n) => String(n).padStart(2, "0");

        events.push({
          start: `${dateStr}T${pad(course.exam.start)}:00:00`,
          end: `${dateStr}T${pad(course.exam.end)}:00:00`,
          extendedProps: {
            ...course,
            classInfo: course.exam,
          },
        });
      }
    });


    return events;
  }, []);

  useEffect(() => {
    const currentSchedule = schedules.find((s) => s.id === currentScheduleId);
    if (currentSchedule) {
      setCourses(currentSchedule.courses || []);
    }
  }, [currentScheduleId, remove, schedules]);

  const getShamsiDate = (date) => {
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const converted = jalaali.toJalaali(year, month, day);
    return `${converted.jy}/${String(converted.jm).padStart(2, '0')}/${String(converted.jd).padStart(2, '0')}`;
  };


  return (
    <div className="h-[80%] min-h-[700px]   overflow-x-auto ">
      <div className="min-w-[4000px] ">
        <FullCalendar
          ref={calendarRef}
          plugins={[timeGridPlugin]}
          className="my-calender"
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
          slotMinTime={"07:00"}
          slotMaxTime={"20:00"}
          direction="rtl"
          initialDate={"2025-06-11"}
          locale={faLocale}
          firstDay={0}

          height="min(70vh, 900px)"
          views={{
            timeGrid: {
              component: DayTimeColsView,
              usesMinMaxTime: true,
              allDaySlot: false,
              slotDuration: "01:00:00",
              duration: { days: 17 },
              slotLabelContent: ({ date }) => (
                <div className="me-1 ms-2 text-sm font-medium text-gray-500 font-iransans">
                  {convertEnglishNumberToPersian(date.getHours().toString())}:۰۰
                </div>
              ),
              dayHeaderContent: ({ date }) => (
                <div className="pb-2 text-xs font-medium text-gray-500 font-iransans">
                  {convertEnglishNumberToPersian(getShamsiDate(date))}
                </div>
              ),
              eventContent: (arg) => {
                const calendarApi = arg.view.calendar;
                const thisEvent = arg.event;

                const overlapping = calendarApi.getEvents().filter((ev) => {
                  console.log(ev, "event");
                  return (
                    ev.extendedProps.id !== thisEvent.extendedProps.id &&
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

      </div>
    </div>

  );

}

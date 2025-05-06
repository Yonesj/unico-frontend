import React, { forwardRef, useContext, useEffect, useMemo, useState } from 'react';
import "./SchedulesList.css";
import { Button, Table } from 'antd';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useTimerToast } from "../../dls/toast/TimerToastContext";

const RowContext = React.createContext({});

const DragHandle = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return (
        <Button
            type="text"
            size="small"
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14.9998 1.71094H0.999791C0.921219 1.71094 0.856934 1.77522 0.856934 1.85379V2.99665C0.856934 3.07522 0.921219 3.13951 0.999791 3.13951H14.9998C15.0784 3.13951 15.1426 3.07522 15.1426 2.99665V1.85379C15.1426 1.77522 15.0784 1.71094 14.9998 1.71094ZM14.9998 12.8538H0.999791C0.921219 12.8538 0.856934 12.9181 0.856934 12.9967V14.1395C0.856934 14.2181 0.921219 14.2824 0.999791 14.2824H14.9998C15.0784 14.2824 15.1426 14.2181 15.1426 14.1395V12.9967C15.1426 12.9181 15.0784 12.8538 14.9998 12.8538ZM14.9998 7.28237H0.999791C0.921219 7.28237 0.856934 7.34665 0.856934 7.42522V8.56808C0.856934 8.64665 0.921219 8.71094 0.999791 8.71094H14.9998C15.0784 8.71094 15.1426 8.64665 15.1426 8.56808V7.42522C15.1426 7.34665 15.0784 7.28237 14.9998 7.28237Z" fill="black" fillOpacity="0.45" />
                </svg>
            }
            style={{ cursor: 'move' }}
            ref={setActivatorNodeRef}
            {...listeners}
        />
    );
};

// Table columns definition
const columns = [
    { title: 'ترتیب', key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    { title: 'کد', dataIndex: 'sID', align: 'center', className: 'text-ltr' },
    { title: 'نام درس', dataIndex: 'courseName', align: 'center' },
    { title: 'نام استاد', dataIndex: 'teacherName', align: 'center' },
    { title: 'ظرفیت', dataIndex: 'capacity', align: 'center' },
    { title: 'عملیات', dataIndex: 'operation', align: 'center' },
];

const Row = props => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: props['data-row-key'] });

    const style = {
        ...props.style,
        transform: CSS.Translate.toString(transform),
        transition,
        ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
    };

    const contextValue = useMemo(() => ({ setActivatorNodeRef, listeners }), [setActivatorNodeRef, listeners]);

    return (
        <RowContext.Provider value={contextValue}>
            <tr {...props} ref={setNodeRef} style={style} {...attributes} />
        </RowContext.Provider>
    );
};

const SchedulesList = forwardRef(({ setCurrentScheduleId, currentScheduleId, setSchedules, schedules } , ref) => {
    const [courses, setCourses] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const timerToast = useTimerToast();

    useEffect(() => {
        const currentSchedule = schedules.find((s) => s.id === currentScheduleId);
        if (currentSchedule) {
            setCourses(currentSchedule.courses || []);
        }
    }, [currentScheduleId, schedules]);
    useEffect(() => {
        const updatedData = courses.map((c, i) => ({
            key: c.course_code + '_' + i,
            sID: c.course_code,
            courseName: <><p>{c.course_name}</p><p>{c.notes}</p></>,
            teacherName: c.professor_name,
            capacity: c.capacity,
            operation: (
                <button onClick={()=>deleteCourse(c)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            ),
        }));
        setDataSource(updatedData);
    }, [courses]);

const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
        setDataSource((prevData) => {
            const oldIndex = prevData.findIndex(item => item.key === active.id);
            const newIndex = prevData.findIndex(item => item.key === over.id);
            const newData = arrayMove(prevData, oldIndex, newIndex);

            const newCourses = arrayMove(courses, oldIndex, newIndex);
            setCourses(newCourses); 
            const updatedSchedules = schedules.map(schedule => {
                if (schedule.id === currentScheduleId) {
                    return { ...schedule, courses: newCourses };
                }
                return schedule;
            });

            setSchedules(updatedSchedules);
            localStorage.setItem('schedules', JSON.stringify(updatedSchedules));

            return newData;
        });
    }
};
const deleteCourse = (c) => {
    const courseId = c.id
    const courseData = c

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

    setCourses((prev) => prev.filter((c) => c.id !== courseId ||[]));

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
 

    return (
        <div className='bg-white px-4 py-2 rounded-xl'>
            <div style={{ height: 'calc(100vh - 220px)' }} ref={ref}>
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={onDragEnd}
                    modifiers={[restrictToVerticalAxis]}
                >
                    <SortableContext
                        items={dataSource.map(item => item.key)}
                        strategy={verticalListSortingStrategy}
                    >
                        <Table
                            style={{ direction: "rtl", height: "510px"   }}
                            rowKey="key"
                            components={{ body: { row: Row } }}
                            columns={columns}
                            dataSource={dataSource}
                            pagination={false}
                        />
                    </SortableContext>
                </DndContext>
            </div>
        </div>
    );
});

export default SchedulesList;

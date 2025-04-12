import React, { useContext, useEffect, useMemo, useState } from 'react';
import "./SchedulesList.css"
import { HolderOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Table } from 'antd';
import { NavLink, useParams } from 'react-router-dom';
const RowContext = React.createContext({});
const DragHandle = () => {
    const { setActivatorNodeRef, listeners } = useContext(RowContext);
    return (
        <Button
            type="text"
            size="small"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14.9998 1.71094H0.999791C0.921219 1.71094 0.856934 1.77522 0.856934 1.85379V2.99665C0.856934 3.07522 0.921219 3.13951 0.999791 3.13951H14.9998C15.0784 3.13951 15.1426 3.07522 15.1426 2.99665V1.85379C15.1426 1.77522 15.0784 1.71094 14.9998 1.71094ZM14.9998 12.8538H0.999791C0.921219 12.8538 0.856934 12.9181 0.856934 12.9967V14.1395C0.856934 14.2181 0.921219 14.2824 0.999791 14.2824H14.9998C15.0784 14.2824 15.1426 14.2181 15.1426 14.1395V12.9967C15.1426 12.9181 15.0784 12.8538 14.9998 12.8538ZM14.9998 7.28237H0.999791C0.921219 7.28237 0.856934 7.34665 0.856934 7.42522V8.56808C0.856934 8.64665 0.921219 8.71094 0.999791 8.71094H14.9998C15.0784 8.71094 15.1426 8.64665 15.1426 8.56808V7.42522C15.1426 7.34665 15.0784 7.28237 14.9998 7.28237Z" fill="black" fillOpacity="0.45" />
            </svg>}
            style={{ cursor: 'move' }}
            ref={setActivatorNodeRef}
            {...listeners}
        />
    );
};
const columns = [
    { title: 'ترتیب', key: 'sort', align: 'center', width: 80, render: () => <DragHandle /> },
    { title: 'کد', dataIndex: 'sID', align: 'center', className: 'text-ltr' },
    { title: 'نام درس', dataIndex: 'courseName', align: 'center' },
    { title: 'نام استاد', dataIndex: 'teacherName', align: 'center' },
    { title: 'ظرفیت', dataIndex: 'capacity', align: 'center' },
    { title: 'عملیات', dataIndex: 'operation', align: 'center' },
];
const initialData = [
    {
        key: '1', sID: '4014142_11', courseName: 'ریاضی عمومی 2', teacherName: 'رحمانی مورچه خورتی نفیسه', capacity: "۵۰", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg></button>
    },
    {
        key: '2', sID: '4014142_11', courseName: 'ریاضی عمومی 2', teacherName: 'رحمانی مورچه خورتی نفیسه', capacity: "۵۰", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg></button>
    },
    {
        key: '3', sID: '4014142_11', courseName: 'ریاضی عمومی 2', teacherName: 'رحمانی مورچه خورتی نفیسه', capacity: "۵۰", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg></button>
    },
    {
        key: '4', sID: '4014142_11', courseName: 'ریاضی عمومی 2', teacherName: 'رحمانی مورچه خورتی نفیسه', capacity: "۵۰", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg></button>
    },
    {
        key: '5', sID: '4014142_11', courseName: 'ریاضی عمومی 2', teacherName: 'رحمانی مورچه خورتی نفیسه', capacity: "۵۰", operation: <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg></button>
    }

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
    const style = Object.assign(
        Object.assign(Object.assign({}, props.style), {
            transform: CSS.Translate.toString(transform),
            transition,

        }),
        isDragging ? { position: 'relative', zIndex: 9999 } : {},
    );
    const contextValue = useMemo(
        () => ({ setActivatorNodeRef, listeners }),
        [setActivatorNodeRef, listeners],
    );
    return (
        <RowContext.Provider value={contextValue}>
            <tr {...props} ref={setNodeRef} style={style} {...attributes} />
        </RowContext.Provider>
    );
};
const SchedulesList = () => {
    const number = useParams();

    const [dataSource, setDataSource] = useState([])
    const onDragEnd = ({ active, over }) => {
        if (active.id !== (over === null || over === void 0 ? void 0 : over.id)) {
            setDataSource(prevState => {
                const activeIndex = prevState.findIndex(
                    record => record.key === (active === null || active === void 0 ? void 0 : active.id),
                );
                const overIndex = prevState.findIndex(
                    record => record.key === (over === null || over === void 0 ? void 0 : over.id),
                );
                return arrayMove(prevState, activeIndex, overIndex);
            });
        }
    };
    const [schedules, setSchedules] = useState([])

    console.log(dataSource);
    

     useEffect(() => {
    
            const saved = JSON.parse(localStorage.getItem("schedules")) || [];
            const temp = saved[(number.number)-1].courses;
            
            setDataSource(saved)
            setSchedules(saved[(number.number)-1]);
            
            const formatted = temp.map((c, i) => {
                // Regex to extract course names after the numeric codes
                return {
                    key: (i + 1).toString(),
                    sID: c.course_code,
                    courseName: <><p>{c.course_name} - </p>{c.notes}<p></p></>,
                    teacherName: c.professor_name,
                    capacity: c.capacity,
                    
                   
                    operation: (
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M12 4L4 12M4 4L12 12" stroke="#C12B2D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    ),
                };
            });
            
            setSchedules(formatted);
            
        }, [number]);

    return (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
            <SortableContext items={schedules.map(i => i.key)} strategy={verticalListSortingStrategy}>
                <div className='bg-white px-4 py-2 rounded-xl'>
                    <div className='flex justify-between p-3 mb-2  items-center h-[60px] '>
                        <div>
                            <ul className='flex gap-3 schedulesUl'>
                            {dataSource.map((item,i) => {
                                    return <li><NavLink className="px-3 py-2.5" to={`/unit/schedules/${i+1}`}>برنامه {i+1}</NavLink></li> 
                                })}     
                            
                            </ul>

                        </div>
                        <div className='flex items-center justify-evenly gap-3 text-sm'>
                            <p className='text-[#4E535A]'>تعداد واحد انتخاب شده <span className='text-black'>22</span></p>
                            <div className='w-[1px] h-[22px] bg-[#B4B4B4]'></div>
                            <button type="button" className='rounded-lg w-9 h-9 bg-gray-100 hover:bg-[#EDF1F3] flex justify-center items-center n'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M9 15L12 18M12 18L15 15M12 18L12 12M14 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H15.2C16.8802 22 17.7202 22 18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362C20 19.7202 20 18.8802 20 17.2V8L14 2Z" stroke="#64696F" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                            <button type="button" className='rounded-lg w-9 h-9 bg-[#E03B3A]  flex justify-center items-center hover:bg-red-600'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="white" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>

                    </div>
                    <div className='' style={{ height: 'calc(100vh - 220px)' }}>
                        <Table
                            style={{ direction: "rtl", height: "510px" }} // Keeps table content in RTL
                            rowKey="key"
                            components={{ body: { row: Row } }}
                            columns={columns}
                            dataSource={schedules}
                            pagination={false}
                        />
                    </div>
                </div>
            </SortableContext>
        </DndContext>
    );
};
export default SchedulesList;
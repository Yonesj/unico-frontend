import { useEffect, useRef } from "react";
import { useState, useMemo } from "react";
import { convertEnglishNumberToPersian } from "../utils/helpers";
import { CloseOutlined } from "@ant-design/icons";
import {ReactComponent as SearchIcon} from "../Assets/images/search-md.svg"
export default function ContextMenuSelector({
  position,
  options,
  onSelect,
  onClose,
}) {
  const menuRef = useRef();
  const getDaysOfWeek = (dayKey) => {
    const dayNamesFa = {
      sun: "یک‌شنبه",
      mon: "دوشنبه",
      tue: "سه‌شنبه",
      wed: "چهارشنبه",
      thu: "پنج‌شنبه",
      fri: "جمعه",
      sat: "شنبه",
    };
    return dayNamesFa[dayKey] || dayKey;
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    return options.filter((course) =>
      `${course.course_name}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

  return (
    <div
      ref={menuRef}
      className="absolute  rounded-xl font-iransans bg-white border border-gray-300shadow-[5px_20px_32px_0px_rgba(31,41,55,0.08)] shadow-[5px_2px_16px_0px_rgba(31,41,55,0.08)]  z-50 p-2 w-[279px] h-[396px]"
      style={{ top: position.y -50, left: position.x + 50 }}
    >
      <div className=" absolute top-0 right-0 py-1 px-2 text-gray-500 cursor-pointer">
        <CloseOutlined className="text-xs" onClick={onClose} />
      </div>
      <div className=" py-5  px-[1px]">
        <div className="mx-auto  w-[95%] rounded-lg flex  overflow-hidden  border  border-gray-300 text-sm my-1">
         <div className=" border overflow-hidden p-[6px] ">
<SearchIcon/> 
         </div>
          <input
            type="text"
            className=" text-sm font-normal text-gray-700  placeholder:text-[#00000040] ms-2"
            placeholder="نام درس را وارد کنید ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ul className="space-y-1 max-h-[320px] overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((course) => (
              <li
                key={course.id}
                onClick={() => {
                  onSelect(course.id);
                  onClose();
                }}
                className="cursor-pointer flex p-1 rounded hover:bg-gray-100 text-xs  font-iransans w-full text-center h-[76px] justify-center items-center"
              >
                <div className="flex-row text-[12px]   font-normal text-center  w-1/2  space-y-1">
                  <div className="">
                    {course.course_name} - {course.course_code.slice(-2)}
                  </div>
                  <div className=" text-[11px]">{course.professor_name}</div>
                </div>
                <div className=" flex-col w-1/2">
                  {course.classes.map((cls) => (
                    <li className=" font-normal text-[13px] leading-tight">
                      {cls?.day && cls?.start && cls?.end ? (
                        <>
                          {getDaysOfWeek(cls.day)} :{" "}
                          {convertEnglishNumberToPersian(cls.start)} -{" "}
                          {convertEnglishNumberToPersian(cls.end)}
                        </>
                      ) : (
                        "-"
                      )}
                    </li>
                  ))}
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-sm text-center">درسی یافت نشد</li>
          )}
        </ul>
      </div>
    </div>
  );
}

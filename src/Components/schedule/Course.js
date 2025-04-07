import classNames from "classnames";
import BBtn from "../../Components/dls/BBtn";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";

const Course = ({ course,isOverlapping ,  className, ...props }) => {
  const mode = course.mode || "default";
  
  if (!["default", "search", "hover", "filter"].includes(mode)) {
    throw new Error("The mode should be either default, search, filter, or hover.");
  }

  const isSearch = ["search", "filter"].includes(mode);

  const wrapperClasses = classNames(
   "course flex h-full w-full flex-col items-center justify-center cursor-pointer ripple",
    "gap-1 rounded-lg py-2",
    isOverlapping ?  "border-[#C12B2D] border-2  rounded-[6px] bg-[#FDF7EB]" :
    {
      "text-grey-50 bg-primary-lighter": isSearch,
      "border-[#7A7E83] border-[2px]  rounded-[6px] bg-[#F0F3F5]": mode === "hover",
      " border-[#EFB036] border-[2px]  rounded-[6px] bg-[#FDF7EB]": mode === "default",
    },
    className
  );

  return (
    <div className={wrapperClasses} {...props}>

      <span className="text-center  font-iransans  text-xs font-semibold  text-gray-800">{course.course_name} - {course.course_code.slice(-2)}</span>
      <span className="text-center  font-iransans  text-xs font-normal text-gray-800">{course.professor_name }</span>

      {mode === "search" && (
        <BBtn className="h-[2.1875rem]" preIcon={faPlus} iconSize="sm">
          اضافه کردن
        </BBtn>
      )}

      {mode === "filter" && <BBtn preIcon={faFilter}>فیلتر کردن</BBtn>}
    </div>
  );
};

export default Course;

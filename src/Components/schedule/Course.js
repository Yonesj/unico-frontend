import classNames from "classnames";
import BBtn from "../../Components/dls/BBtn";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";

const Course = ({ course, className, ...props }) => {
  const mode = course.mode || "default";
  
  if (!["default", "search", "hover", "filter"].includes(mode)) {
    throw new Error("The mode should be either default, search, filter, or hover.");
  }

  const isSearch = ["search", "filter"].includes(mode);

  const wrapperClasses = classNames(
    "flex h-full w-full flex-col items-center justify-center cursor-pointer ripple",
    "gap-1 rounded-lg py-2",
    {
      "text-grey-50 bg-primary-lighter": isSearch,
      "text-primary-darker bg-grey-300": mode === "hover",
      "text-primary-darker bg-tertiary-dark": mode === "default",
    },
    className
  );

  return (
    <div className={wrapperClasses} {...props}>
      <span>
        {course.course_code}-{course.group}
      </span>
      <span className="text-center font-bold">{course.course_name}</span>
      <span>{course.presented_by}</span>

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

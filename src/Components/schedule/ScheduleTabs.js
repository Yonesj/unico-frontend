import { Fragment, useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import BBtn from "../../Components/dls/BBtn";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { convertEnglishNumberToPersian } from "../../utils/helpers";
import { useToast } from "../../Components/dls/toast/ToastService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LayoutOutlined } from "@ant-design/icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ScheduleTabs({
  currentScheduleId,
  schedules,
  setSchedules,
  onChange,
  showAddButton = true,
}) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);




  const selectedIndex = schedules.findIndex((s) => s.id === currentScheduleId);

  const createNewSchedule = () => {
    if (schedules.length >= 5) {
      toast.open({
        message: "حداکثر تعداد برنامه‌ها ۵ عدد است!",
        type: "error",
      });
      return;
    }
  
    setIsLoading(true);
    setTimeout(() => {
      const newSchedule = {
        id: Math.floor(Math.random() * 1000),
        name: `برنامه ${convertEnglishNumberToPersian(schedules.length + 1)}`,
        courses: [],
      };
  
      setSchedules((prev) => {
        const updatedSchedules = [...prev, newSchedule];
        localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
        return updatedSchedules;
      });
  
      toast.open({
        message: "برنامه‌ی جدید با موفقیت ساخته شد.",
        type: "success",
      });
  
      setIsLoading(false);
    }, 500);
  };
  
  return (
    <div className="flex justify-between">
      <Tab.Group
      selectedIndex={selectedIndex}
      onChange={(i) => {
        onChange(schedules[i].id)
      }}
    >
        <Tab.List className="flex gap-2">
          {schedules.map((nav, index) => (
            <Tab key={nav.id} as={Fragment}>
              {({ selected }) => (
                 <button
                 className={classNames(
                   'ripple h-full text-sm font-bold',
                   'rounded-md px-4 py-2 focus-visible:outline-none',
                   selected
                     ? 'bg-secondary/30 text-secondary ring-2 ring-secondary'
                     : 'text-grey-200 hover:bg-white/10 hover:text-white',
                 )}
               >
                 {'برنامه ' +
                   convertEnglishNumberToPersian((index + 1).toString())}
               </button>
              )}
            </Tab>
          ))}
          {showAddButton && (
            <BBtn
              icon={faPlus}
              iconSize="lg"
              className="h-[2.5rem] w-[2.5rem] rounded-lg bg-[#EDF1F3] text-[#64748B] hover:bg-[#64748B] hover:text-[#EDF1F3]"
              loading={isLoading}
              onClick={createNewSchedule}
            />
          )}
        </Tab.List>
      </Tab.Group>

      <div className="tab-side flex items-center">
        <div className="bg-white pl-4 font-iransans font-normal text-sm">
          تعداد واحد انتخاب شده <span className="mr-2 font-semibold">۲۲</span>
        </div>
        <div className="border-r pr-4 border-gray-300 text-gray-600">
          <LayoutOutlined width={20} height={20} />
        </div>
      </div>
    </div>
  );
}

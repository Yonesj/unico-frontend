import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./Ticket.css";
import { ReactComponent as Mail } from "../../Assets/images/Mail_write.svg";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { ReactComponent as CheckTicket } from "../../Assets/images/check_ticket.svg";
import { ReactComponent as CloseTicket } from "../../Assets/images/close_ticket.svg";
import { ReactComponent as ProgressTicket } from "../../Assets/images/search_tcket.svg";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("جدید ترین تیکت ها");
 const nav = useNavigate();
  const options = ["جدید ترین تیکت ها", "قدیمی ترین تیکت ها"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const fetchTicketStats = async () => {
    try {
      setLoading(true);
  
      const response = await fetch('http://localhost:8000/tickets/stats/', {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `JWT ${JSON.parse(localStorage.getItem("AccessToken"))}`

        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch ticket stats');
      }
  
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching ticket stats:", err);
      setError("خطا در دریافت اطلاعات. مجدد تلاش کنید");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchTickets = async (ordering = '-created_at') => {
    try {
      setLoading(true);
  
      const response = await fetch(`http://localhost:8000/tickets/?ordering=${ordering}`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `JWT ${JSON.parse(localStorage.getItem("AccessToken"))}`

        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch tickets');
      }
  
      const data = await response.json();
      setTickets(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("خطا در دریافت اطلاعات. مجدد تلاش کنید");

    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchTicketStats();
    const ordering = selectedOption === "جدید ترین تیکت ها" ? "-created_at" : "created_at";
    fetchTickets(ordering);
  }, []);
  useEffect(() => {
    const ordering = selectedOption === "جدید ترین تیکت ها" ? "-created_at" : "created_at";
    fetchTickets(ordering);
  }, [selectedOption]);
  const StatCard = ({ title, value, iconBgColor, iconColor }) => (
    <div className="flex-1 bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center text-center min-w-[150px] max-w-[calc(33.33%-1rem)] md:max-w-none">
      <div className={`p-3 rounded-full ${iconBgColor} mb-2`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${iconColor}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
  const TicketTableRowPhone = ({ ticket }) => {
    let statusColorClass = "bg-gray-400";
    let dotColorClass = "bg-gray-600";

    if (ticket.status_display === "پاسخ داده شده") {
      statusColorClass = "bg-[#E4F7EA] text-[#008933]";
      dotColorClass = "bg-[#00AD4B]";
    } else if (ticket.status_display === "در حال برسی") {
      statusColorClass = "bg-blue-100 text-blue-700";
      dotColorClass = "bg-blue-500";
    } else if (ticket.status_display === "بسته شده") {
      statusColorClass = " bg-[#FEEBEE] text-[#CE3134]";
      dotColorClass = "bg-[#EA5454]";
    }
    return (
      <div
        className="flex px-[14px] py-3 flex-col items-end gap-[14px] self-stretch   border-[1px] rounded-[12px] border-[#E3E3E3] cursor-pointer font-iransansfa  hover:bg-slate-50"
        key={ticket.id}
      >
       
        <div className="flex items-center self-stretch justify-between">
          <div className="flex items-center gap-6 text-xs  font-medium">
            <div>{ticket.title}</div>
            <div className="sm:block hidden">({ticket.uid})</div>
          </div>
          <div className="text-xs">
            {" "}
            <span
              className={`px-3 py-1 rounded-full  font-normal ${statusColorClass} flex items-center`}
            >
              <span
                className={`w-[6px] h-[6px] rounded-full ml-1 ${dotColorClass}`}
              ></span>
              {ticket.status_display}
            </span>
          </div>
        </div>
        <div className=" flex   justify-between items-start self-stretch  text-xs  font-medium ">
          <div>{ticket.subject_display}</div>
          <div className=" text-[10px] font-medium text-right">
            {ticket.time} - {ticket.date}
          </div>
        </div>
      </div>
    );
  };
  const TicketTableRow = ({ ticket }) => {
    let statusColorClass = "bg-gray-400";
    let dotColorClass = "bg-gray-600";

    if (ticket.status_display === "پاسخ داده شده") {
      statusColorClass = "bg-[#E4F7EA] text-[#008933]";
      dotColorClass = "bg-[#00AD4B]";
    } else if (ticket.status_display === "در حال برسی") {
      statusColorClass = "bg-blue-100 text-blue-700";
      dotColorClass = "bg-blue-500";
    } else if (ticket.status_display === "بسته شده") {
      statusColorClass = " bg-[#FEEBEE] text-[#CE3134]";
      dotColorClass = "bg-[#EA5454]";
    }

    return (
      <div onClick={()=>{ nav(`/chat/${ticket.id}`)}} className="grid cursor-pointer grid-cols-ticket-table text-sm py-3 border-b border-gray-200 last:border-b-0 items-center hover:bg-slate-50 transition-all min-w-[700px] ticket-row font-medium  ">
        <div className="text-gray-700 mx-auto overflow-ellipsis">
          {ticket.uid}
        </div>
        <div className="text-gray-800 font-medium  text-center mx-auto overflow-ellipsis">
          {ticket.title}
        </div>
        <div className="text-gray-600 mx-auto overflow-ellipsis">
          {ticket.subject_display}
        </div>
        <div className="text-gray-600 mx-auto overflow-ellipsis">
          {ticket.date}
        </div>
        <div className="text-gray-600 mx-auto overflow-ellipsis">
          {ticket.time}
        </div>
        <div className="flex justify-end items-center mx-auto">
          <span
            className={`px-3 py-1 rounded-full  font-normal ${statusColorClass} flex items-center`}
          >
            <span
              className={`w-[6px] h-[6px] rounded-full ml-1 ${dotColorClass}`}
            ></span>
            {ticket.status_display}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray font-iransansfa bg-slate-100 px-4">
     <BreadCrumb
        links={[
          { id: 1, title: "پشتیبانی", to: "/" },
          {
            id: 2,
            title: "تیکت ها",
            to: "/ticket",
          },
        ]}
      />
    
      <div className="bg-[#FFFFFF]  rounded-[12px] pt-[28px] px-[14px]">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            direction: rtl; /* Set text direction to Right-to-Left for Persian */
            text-align: right; /* Align text to the right */
          }
          /* Custom scrollbar for better aesthetics */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          /* Custom grid template for the ticket table to match column widths */
          .grid-cols-ticket-table {
            grid-template-columns: 1.2fr 2.5fr 1fr 0.8fr 0.8fr 1fr;
          }
          .table-header > div {
            text-align: right;
          }
          .table-header > div:last-child {
            text-align: end; /* Align status header to end */
          }
          .ticket-row > div {
            text-align: right;
          }
          .ticket-row > div:last-child {
            text-align: end; /* Align status cell to end */
          }
          /* Specific styles for the header navigation */
          .header-nav-link {
            position: relative;
            padding-bottom: 0.5rem;
            transition: color 0.2s ease-in-out;
            font-size: 0.95rem; /* Slightly larger font */
          }
          .header-nav-link.active {
            color: #3B82F6; /* Blue-600 */
            font-weight: 600;
          }
          .header-nav-link.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 2px;
            background-color: #3B82F6; /* Blue-600 */
            border-radius: 1px;
          }
        `}
        </style>

        <div className="bg-white rounded-xl p-4">
          <ul className="flex sm:justify-start  justify-between text-sm font-normal ticket-header-ul gap-[2px] sm:gap-[32px] sm:px-5 py-1 text-[#383E46]  font-iransansfa ">
            <li className="py-3 ">
              <NavLink
                className=" rounded-lg transition-all p-1 sm:p-2 duration-200 hover:text-black hover:bg-[#E5F7F8]"
                to="#"
              >
                پروفایل کاربری
              </NavLink>
            </li>
            <li className="py-3 ">
              <NavLink
                className="rounded-lg transition-all p-1 sm:p-2 duration-200 hover:text-black hover:bg-[#E5F7F8]"
                to="/unit/schedule"
              >
                اعلان ها
              </NavLink>
            </li>
            <li className="py-3 ">
              <NavLink
                className=" rounded-lg transition-all p-1 sm:p-2 duration-200 hover:text-black hover:bg-[#E5F7F8]"
                to="/unit/exams"
              >
                نظرات من
              </NavLink>
            </li>
            <li className="py-3 ">
              <NavLink
                className=" p-1 sm:p-2 rounded-lg transition-all duration-200 hover:text-black hover:bg-[#E5F7F8]"
                to="/unit/schedules/1"
              >
                 تیکت ها
              </NavLink>
            </li>
          </ul>
        </div>
        <div className=" sm:p-4">
          {loading && (
            <div className="flex justify-start items-start  sm:justify-center sm:items-center h-48">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
              <p className="mr-4 text-lg text-gray-700">
                در حال بارگذاری اطلاعات...
              </p>
            </div>
          )}

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6"
              role="alert"
            >
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {!loading && !error && (
            <>
              <section className="flex lg:flex-row flex-col justify-start items-start lg:items-center  gap-4 lg:justify-between  py-[24px]  border-b-[1px] border-b-[#0000000F] text-white">
                <div
                  dir="rtl "
                  className="flex lg:flex-row flex-col  items-center gap-[32px]"
                >
                  {stats && (
                    <>
                      <div className=" flex items-center gap-[24px]">
                        <CheckTicket />
                        <div className="flex w-[150px] flex-col items-start gap-[10px]">
                          <div className="text-[#7F7F7F] text-sm text-right font-medium">
                            تیکت پاسخ داده شده
                          </div>
                          <div className="text-black text-right text-3xl font-medium">
                            {stats.answered}
                          </div>
                        </div>
                      </div>
                      <div className=" flex items-center gap-[24px] lg:border-s-2 lg:border-s-[#E4E4E4] lg:ps-7">
                        <ProgressTicket />
                        <div className="flex w-[150px] flex-col items-start gap-[10px] ">
                          <div className="text-[#7F7F7F] text-sm text-right font-medium">
                            تیکت در حال بررسی
                          </div>
                          <div className="text-black text-right text-3xl font-medium">
                            {stats.in_progress_or_open}
                          </div>
                        </div>
                      </div>
                      <div className=" flex items-center gap-[24px] lg:border-s-2 lg:border-s-[#E4E4E4] lg:ps-7">
                        <CloseTicket />
                        <div className="flex w-[150px] flex-col items-start gap-[10px]">
                          <div className="text-[#7F7F7F] text-sm text-right font-medium">
                            تیکت بسته شده
                          </div>
                          <div className="text-black text-right text-3xl font-medium">
                            {stats.closed}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div onClick={()=>{ nav(`/new-ticket`)}} className="flex  cursor-pointer text-center w-[95%] lg:w-[196px] h-[52px] px-[15px] py-[7px]   justify-center items-center gap-[10px] bg-[#00ADB5] rounded-[8px] text-base font-bold ">
                  <Mail />
                  ارسال تیکت جدید
                </div>
              </section>

              <main className="bg-white rounded-lg overflow-x-auto">
                <div className="flex flex-col md:flex-row  items-start py-[16px] px-2">
                  <div className="relative md:w-[206px] w-[172px] font-iransansfa text-right">
                    {" "}
                    <div
                      className="flex justify-between items-center p-3 border border-gray-300 rounded-lg cursor-pointer bg-white shadow-sm"
                      onClick={toggleDropdown}
                    >
                      <span className="text-gray-700  text-sm">
                       مرتب سازی بر اساس
                      </span>
                      {isOpen ? (
                        <UpOutlined className="h-3 w-3 text-gray-500" />
                      ) : (
                        <DownOutlined className="h-3 w-3 text-gray-500" />
                      )}
                    </div>
                    {isOpen && (
                      <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {options.map((option) => (
                          <li
                            key={option}
                            className={`p-3 cursor-pointer text-right text-sm ${
                              option === selectedOption
                                ? "bg-blue-100 text-blue-800"
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() => handleOptionClick(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {tickets.length > 0 ? (
                  <>
                    <div className="md:block hidden overflow-x-auto">
                      <div className="  font-iransansfa py-[16px] px-[12px] text-black font-medium   items-center    grid grid-cols-ticket-table text-center text-sm  border-b border-gray-300 table-header min-w-[700px] bg-[#FAFAFA]">
                        <div className="mx-auto">شماره</div>
                        <div className="mx-auto">عنوان</div>
                        <div className="mx-auto">موضوع</div>
                        <div className="mx-auto">تاریخ</div>
                        <div className="mx-auto">زمان</div>
                        <div className="text-end mx-auto">وضعیت</div>
                      </div>
                      {tickets.map((ticket) => (
                        <TicketTableRow  key={ticket.id} ticket={ticket} />
                      ))}
                    </div>
                    <div className="flex-col gap-2 flex md:hidden">
                      {tickets.map((ticket) => (
                        <TicketTableRowPhone key={ticket.id} ticket={ticket} />
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-600 py-8">
                    تیکتی برای نمایش وجود ندارد.
                  </p>
                )}
              </main>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Ticket;

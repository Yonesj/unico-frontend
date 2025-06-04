import { ArrowRightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactComponent as Send} from "../../../Assets/images/send-03.svg";
import BreadCrumb from "../../../Components/BreadCrumb/BreadCrumb";
export default function TicketChat() {
  const { id } = useParams();
  const nav = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/tickets/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${JSON.parse(localStorage.getItem("AccessToken"))}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch ticket");
        return res.json();
      })
      .then((data) => {
        setTicket(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      setError("خطا در دریافت اطلاعات. مجدد تلاش کنید");

        setLoading(false);
      });
  }, [id]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    fetch(`http://localhost:8000/tickets/${id}/messages/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${JSON.parse(localStorage.getItem("AccessToken"))}`,
      },
      body: JSON.stringify({
        
        body: newMessage,
      }),
    })
      .then((res) => {
        if (!res.ok) toast.open({
          message: "خطا در ارسال پیام",
          type: "error",
        });
      setError("خطا در دریافت اطلاعات. مجدد تلاش کنید");

        return res.json();
      })
      .then((data) => {
        setTicket((prev) => ({
          ...prev,
          messages: [...prev.messages, data],
        }));
        setNewMessage("");
      })
      .catch((err) => console.error(err));
  };

  

  let statusColorClass = "bg-gray-200 text-gray-700";
  let dotColorClass = "bg-gray-600";

  if (ticket?.status_display === "پاسخ داده شده") {
    statusColorClass = "bg-[#E4F7EA] text-[#008933]";
    dotColorClass = "bg-[#00AD4B]";
  } else if (ticket?.status_display === "در حال برسی") {
    statusColorClass = "bg-blue-100 text-blue-700";
    dotColorClass = "bg-blue-500";
  } else if (ticket?.status_display === "بسته شده") {
    statusColorClass = "bg-[#FEEBEE] text-[#CE3134]";
    dotColorClass = "bg-[#EA5454]";
  }

  return (

      <div className="flex flex-col px-4 h-screen overflow-y-auto bg-[#F1F5F7] font-iransansfa">
      <BreadCrumb
        links={[
          { id: 1, title: "پشتیبانی", to: "/" },
          {
            id: 2,
            title: "تیکت ها",
            to: "/ticket",
          },          {
            id: 3,
            title: "چت",
            to: `/chat/${ticket?.id}`,
          },
        ]}
      />
      
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
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative my-6"
        role="alert"
      >
        <span className="block sm:inline"> {error}</span>
      </div>
    )}
    {!loading && !error && (
 <>
 <div className="flex w-full text-[#959595] text-base font-medium px-8 py-4 items-start bg-white rounded-xl justify-between">
        <div className="flex sm:gap-[90px] gap-7 md:gap-[140px]">
          <div
            onClick={() => nav("/ticket")}
            className="cursor-pointer"
          >
            <ArrowRightOutlined />
            <span className="ms-2 lg:inline hidden">بازگشت</span>
          </div>
          <h2 className="text-[#1B1B1B] text-base font-semibold">
            <span className="md:inline  hidden "> {ticket?.id}# </span><span className="text-[#DCDCDC] mx-4 md:inline  hidden ">|</span><span className=" w-[100px] overflow-x-scroll hidden md:inline"> {ticket?.title}</span> <div className=" max-w-[100px]  inline-flex md:hidden  overflow-hidden  text-ellipsis whitespace-nowrap"> {ticket?.title}</div>
          </h2>
        </div>

        <div>
          <div className="text-sm">
            <span
              className={`px-3 py-1 rounded-full font-normal ${statusColorClass} flex items-center`}
            >
              <span className={`w-[6px] h-[6px] rounded-full ml-1 ${dotColorClass}`}></span>
              {ticket?.status_display}
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 bg-white  mt-2 rounded-t-xl ">
  {ticket?.messages?.map((msg) => (
    <div
      key={msg.id}
      className={` max-w-[90%] md:max-w-[60%] w-fit    p-4 text-sm shadow ${
        msg.user === "support_agent"
          ? "bg-[#E5F7F8] self-start  rounded-bl-2xl rounded-tr-2xl rounded-br-2xl "
          : "bg-[#F1F5F7] self-end  rounded-bl-2xl rounded-tl-2xl rounded-br-2xl"
      }`}
    >
      <p className="break-words whitespace-pre-wrap pb-3
       border-b-[1px] border-[#DADFE9] text-[#494949]">{msg?.body}</p>
      <div className="flex text-left text-xs justify-between text-[#8C8C8C]  pt-3">
        <div>{msg?.date}</div> <div> {msg?.time}</div>
      </div>
    </div>
  ))}
</div>

      <div className=" border-t-2 border-gray-300  font-iransansfa w-full">
        <div className="flex relative items-center gap-2  w-full bg-white ">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="پیام خود را بنویسید..."
            className="flex-1 p-4 border border-gray-300 max-w-[85%]  text-sm"
          />
          <div
            onClick={handleSendMessage}
            className="absolute end-3 bg-[#00ADB5] text-white px-1  text-xs py-[2px] rounded-lg  cursor-pointer"
          >
            <Send/>
          </div>
        </div>
      </div>
    </>
    )}
    </div>
  );
}

import React, { useState } from "react";
import { useToast } from "../../../Components/dls/toast/ToastService";

import "./NewTicket.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../Components/BreadCrumb/BreadCrumb";
export default function NewTicket() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("financial");
  const [unit, setUnit] = useState("none");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const nav=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:8000/tickets/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${JSON.parse(localStorage.getItem("AccessToken"))}`

        },
        body: JSON.stringify({
          title,
          subject,
          unit,
          description,
        }),
      });

      if (response.ok) {

        setTitle("");
        setSubject("financial");
        setUnit("none");
        setDescription("");
        toast.open({
          message: "تیکت با موفقیت ثبت شد",
          type: "success",
        });
      } else {
        const errData = await response.json();
        throw new Error(errData.message || "ارسال با خطا مواجه شد.");
      }
    } catch (err) {
      toast.open({
        message: "خطا در ثبت تیکت ",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-screen overflow-y-auto bg-gray-100 flex flex-col px-4 font-iransansfa ">
     <BreadCrumb
        links={[
          { id: 1, title: "پشتیبانی", to: "/" },
          {
            id: 2,
            title: "تیکت ها",
            to: "/ticket",
          },          {
            id: 3,
            title: "ارسال تیکت جدید",
            to: "/new-ticket",
          },
        ]}
      />
      <div className="flex mb-2  w-full text-[#959595] text-base font-medium px-8 py-4 items-start bg-white runded-12px justify-start sm:gap-[90px] gap-7  md:gap-[140px] rounded-xl">
        <div onClick={()=>{ nav('/ticket')}} className=" cursor-pointer">
          <ArrowRightOutlined /> <span className="lg:inline hidden ms-2"> بازگشت</span>
        </div>
        <h2 className=" text-[#1B1B1B] text-base font-semibold">ارسال تیکت جدید</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full  bg-white rounded-xl sm:p-6 p-2 shadow-md"
      >
        <div className=" inline-flex px-2 sm:px-4 sm:pt-10  pt-4 flex-col items-end gap-9 w-full">
          <div className="flex flex-col items-start gap-6 self-stretch w-full">
            <div className=" flex  items-center  justify-end flex-col gap-[123px]">
              <div className="inline-block space-y-3 lg:flex  justify-center items-center gap-[32px]">
                <div
                  className="text-base font-normal  text-black text-right sm:ps-2"
                  dir="rtl"
                >
                  عنوان:
                </div>
                <div className="border rounded-md border-1   border-gray-200  flex sm:px-3 py-[8px] w-[250px]  sm:w-[380px]">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="عنوان"
                    className="w-full !border !border-1 !border-gray-300 rounded-md  px-3 "
                    required
                  />
                </div>
              </div>
            </div>
            <div className=" flex items-center  justify-between w-full flex-wrap gap-6">
              <div className="  inline-block space-y-3 lg:flex  justify-center items-center gap-[32px]">
                <div
                  className="text-base font-normal  text-black text-right"
                  dir="rtl"
                >
                  موضوع:
                </div>
                <div className="w-[250px]  sm:w-[380px]">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="financial">مالی</option>
                    <option value="technical">فنی</option>
                    <option value="suggestion">پیشنهادات و انتقادات</option>
                    <option value="advertisement">تبلیغات</option>
                  </select>
                </div>
              </div>

              {/* واحد */}
              <div className=" inline-block space-y-3 lg:flex  justify-center items-center gap-[32px]">
                <div
                  className="text-base font-normal  text-black text-right"
                  dir="rtl"
                >
                  واحد:
                </div>
                <div className=" w-[250px] sm:w-[380px]">
                  <select
                    disabled={true}
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full border border-gray-300 bg-slate-300  cursor-not-allowed rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="financial">هیچکدام</option>
                    <option value="technical">کامپیوتر</option>
                    <option value="support">مکانیک</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* متن تیکت */}
          <div className="w-full">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              maxLength={250}
              placeholder="متن تیکت..."
              className="w-full lg:h-[200px] md:h-[300px] h-[320px] border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            ></textarea>
            <div className="text-gray-400 text-sm text-left mt-1">
              {description.length}/250
            </div>
          </div>
        </div>

        {/* پیام موفقیت یا خطا */}
        {success && (
          <div className="text-green-600 text-sm mt-4">
            تیکت با موفقیت ارسال شد.
          </div>
        )}
        {error && <div className="text-red-600 text-sm mt-4">خطا: {error}</div>}

        {/* دکمه ارسال */}
        <div className="mt-6 flex justify-center md:justify-start ">
          <button
            type="submit"
            className="bg-[#00ADB5]  text-white font-medium px-4 py-2 h-9 md:h-[52px]  w-[95%]  md:w-[290px] rounded-[12px] text-base  transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "در حال ارسال..." : "ارسال تیکت"}
          </button>
        </div>
      </form>
    </div>
  );
}

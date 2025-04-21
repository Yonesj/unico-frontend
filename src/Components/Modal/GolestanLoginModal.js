import { Modal } from "antd";
import { useState } from "react";
import "./AddUnitModal.css";
import React from "react";
import IsfahanSvg from "../../Assets/images/University-of-Isfahan-Logo(4) 1.svg";
import "./GolestanLoginModal.css";
import { useToast } from "../../Components/dls/toast/ToastService";
import Spinner from "../../Components/spinner";

const GolestanLoginModal = ({ onOk, onClose, open }) => {
  const [stuID, setStuID] = useState("");
  const [stuPass, setStuPass] = useState("");
  const [loading, setLoading] = useState(false);
  const isValidNum = /^.{1,255}$/.test(stuID);
  const isValidPass = /^.{1,255}$/.test(stuPass);

  const toast = useToast();

  const handleLogin = async () => {
    if (!stuID || !stuPass) {
      toast.open({
        message: "شماره دانشجویی و رمز عبور را وارد کنید",
        type: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/course-scheduler/courses/",
        {
          method: "POST",
          headers: {
            "Accept-Language": "fa",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: stuID,
            password: stuPass,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "خطایی رخ داده است");
      const courses = data.courses
      console.log(courses);
      localStorage.setItem("courses", JSON.stringify(courses)||[]);
      toast.open({ message: "ورود موفقیت‌آمیز بود", type: "success" });

      onOk(data);
    } catch (err) {
      toast.open({
        message: err.message || "خطایی رخ داده است",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="font-iransans GolestanLoginModal"
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <div className="px-5 py-4">
        <header className="mt-4">
          <img
            className="m-auto mb-2.5"
            src={IsfahanSvg}
            alt="university-logo"
          />
          <h1 className="font-bold text-base mb-1">
            ورود به سیستم دانشگاهی گلستان
          </h1>
          <p className="font-normal text-base">دانشگاه اصفهان</p>
        </header>
        <div className="h-[190px] flex flex-col items-start my-6 gap-2.5">
          <label className="text-base" htmlFor="stuID">
            شماره دانشجویی
          </label>
          <input
            className="w-full py-3 px-5 border-solid border border-[#A7A9AD] rounded-lg"
            type="text"
            id="stuID"
            value={stuID}
            onChange={(e) => setStuID(e.target.value)}
            placeholder="4013401340"
          />
          <label className="text-base" htmlFor="stuPass">
            رمز عبور
          </label>
          <input
            className="w-full py-3 px-5 border-solid border border-[#A7A9AD] rounded-lg"
            type="password"
            id="stuPass"
            value={stuPass}
            onChange={(e) => setStuPass(e.target.value)}
            placeholder="*******"
          />
        </div>
        <div>
          <button
            className="w-full py-1.5 px-3 bg-[#4CC6CB] text-white h-[52px] rounded-lg flex justify-center items-center disabled:bg-gray-400"
            type="button"
            onClick={handleLogin}
            disabled={!isValidNum || !isValidPass || loading}
          >
            {loading ? <Spinner size="lg" /> : "ورود"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GolestanLoginModal;

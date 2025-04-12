import React, { useState } from "react";
import "./ForgetpassModal.css";
import { Modal } from "antd";
import ForgetpassLogo from "../../Assets/images/ForgetpassLogo.svg";
import { useToast } from "../dls/toast/ToastService";
import Spinner from "../../Components/spinner";
import { Navigate, useNavigate } from "react-router";

const ForgetpassModal = ({ open, onOk, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
  const toast = useToast();
const navigate = useNavigate();
  const handleSendEmail = async (event) => {
    event.preventDefault();
    if (!isValidEmail) {
      toast.open({ message: "ایمیل را به درستی وارد کنید", type: "warning" });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auth/password-reset/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "ایمیل وارد شده نامعتبر است");
      toast.open({ message: "لینک تغییر گذرواژه به ایمیل شما ارسال شد", type: "success" });
      onOk();
    } catch (error) {
      toast.open({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal className="font-iransans p-[40px]" open={open} onCancel={onClose} footer={null}>
      <div className="header">
        <img className="m-auto w-1/3" src={ForgetpassLogo} alt="" />
      </div>
      <div className="w-full flex flex-col">
        <h2 className="font-bold text-xl mt-4 mb-7">فراموشی رمز عبور</h2>
        <p className="text-base text-[#222831]">
          ایمیل خود را وارد کرده تا ما لینک بازیابی رمز عبور را برای شما ارسال کنیم
        </p>
        <input
          dir="rtl"
          className="outline-none border border-solid rounded-lg border-[#A7A9AD] w-full px-3 h-14 text-sm placeholder-[#A7A9AD] font-light my-11 p-[24px]"
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full h-14 outline-none rounded-lg bg-[#4CC6CB] text-white font-bold text-base flex justify-center items-center mb-4 disabled:bg-gray-400"
          onClick={handleSendEmail}
          disabled={!isValidEmail || loading}
        >
          {loading ? <Spinner size="lg" /> : "ارسال"}
        </button>
        <p className="text-sm font-normal text-center">
          ثبت نام نکرده‌اید؟ <span className="text-[#EFB036] cursor-pointer" onClick={()=> navigate("/sign-up")}>صفحه ثبت نام</span>
        </p>
      </div>
    </Modal>
  );
};

export default ForgetpassModal;
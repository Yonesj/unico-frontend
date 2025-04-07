import React, { useState } from "react";
import "./SaveCoursesModal.css";
import { Modal } from "antd";
import ForgetpassLogo from "../../Assets/images/ForgetpassLogo.svg";
import { useToast } from "../dls/toast/ToastService";
const SaveCoursesModal = ({ open, onOk, onClose }) => {
  

  return (
    <Modal
      className="font-iransans  p-[40px]"
      open={open}
      onOk={handleSendEmail}
      onCancel={onClose}
      footer={null}
    >
      <div className="header">
        <img className="m-auto w-1/3" src={ForgetpassLogo} alt="" />
      </div>
      <div className="w-full flex flex-col">
        <h2 className="font-bold text-xl mt-4 mb-7">فراموشی رمز عبور</h2>
        <p className="text-base text-[#222831]">
          ایمیل خود را وارد کرده تا ما لینک بازیابی رمز عبور را برای شما ارسال
          کنیم
        </p>

        <div className="input w-full">
          <input
            dir="rtl"
            className="outline-none border border-solid rounded-lg border-[#A7A9AD] w-full px-3 h-14 text-sm placeholder-[#A7A9AD] font-light my-11 p-[24px]"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <button
            className="w-full h-14 outline-none rounded-lg bg-[#4CC6CB] text-white font-bold text-base mb-4 disabled:bg-gray-400"
            onClick={handleSendEmail}
            disabled={!isValidEmail} // Disable button if code is invalid
          >
            ارسال
          </button>
          <p className="text-sm font-normal text-center">
            ثبت نام نکرده‌اید؟{" "}
            <span className="text-[#EFB036]">صفحه ثبت نام</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SaveCoursesModal;

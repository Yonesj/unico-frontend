import React, { useState, useContext } from "react";
import "./AccountVerificationModal.css";
import { useToast } from "../../Components/dls/toast/ToastService";
import { Modal } from "antd";
import AccountVerifyLogo from "../../Assets/images/AccountVerifyLogo.svg";
import AuthContext from "../../context/authContext";
import Spinner from "../../Components/spinner"; 

const AccountVerificationModal = ({ open, onOk, onClose, email, password }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const authContext = useContext(AuthContext);

  const isValidCode = /^[A-Za-z0-9]{8}$/.test(code);

  const userLogin = async (event) => {
    if (event) event.preventDefault();
    setLoading(true);
    
    const userData = { email, password };

    try {
      const res = await fetch("http://localhost:8000/auth/jwt/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(Object.values(data)[0] || "An error occurred");
      
      toast.open({ message: "ورود کاربر", type: "success" });
      authContext.login({}, data.access, data.refresh);
    } catch (err) {
      toast.open({
        message: err.message === "No active account found with the given credentials" 
          ? "اکانت فعالی با این ایمیل و رمزعبور وجود ندارد"
          : "خطایی رخ داده است",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAccount = async (event) => {
    event.preventDefault();
    if (!isValidCode) {
      toast.open({ message: "کد تایید باید 8 کاراکتر عددی یا حروفی باشد", type: "warning" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/auth/activate-user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activation_code: code }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "کد وارد شده نامعتبر است");

      toast.open({ message: "حساب کاربری با موفقیت فعال شد", type: "success" });
      await userLogin();
    } catch (error) {
      toast.open({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      className="font-iransans p-[40px] z-10"
      open={open}
      onCancel={onClose}
      footer={null}
      maskClosable={false}
    >
      <div className="header">
        <img className="m-auto w-1/3" src={AccountVerifyLogo} alt="" />
      </div>
      <div className="w-full flex flex-col gap-8">
        <h2 className="font-bold text-xl">فعالسازی اکانت کاربر</h2>
        <p className="text-base">کدی که به آدرس ایمیل زیر فرستاده شده را وارد کنید</p>
        <p className="text-[#00ADB5]">{email || "example@gmail.com"}</p>
        <input
          dir="rtl"
          className="outline-none border border-solid rounded-lg border-[#A7A9AD] w-full px-3 h-14 text-sm placeholder-[#A7A9AD] p-[24px] font-light"
          type="text"
          placeholder="کد را اینجا وارد کنید"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="w-full h-14 outline-none rounded-lg bg-[#4CC6CB] text-white font-bold text-base flex justify-center items-center disabled:bg-gray-400"
          onClick={handleVerifyAccount}
          disabled={!isValidCode || loading}
        >
          {loading ? <Spinner size="lg" /> : "تایید"}
        </button>
      </div>
    </Modal>
  );
};

export default AccountVerificationModal;
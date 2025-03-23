import React, { useState, useContext } from "react";
import "./AccountVerificationModal.css";
import { useToast } from "../../Components/dls/toast/ToastService";
import { Modal } from "antd";
import AccountVerifyLogo from "../../Assets/images/AccountVerifyLogo.svg";
import AuthContext from "../../context/authContext";
const AccountVerificationModal = ({ open, onOk, onClose, email, password }) => {
  const [code, setCode] = useState("");
  const toast = useToast();
  const authContext = useContext(AuthContext);

  const isValidCode = /^[A-Za-z0-9]{6}$/.test(code); 

  const userLogin = (event) => {
    event.preventDefault();

    const userData = {
      email: email,
      password:password,
    };
    fetch("http://localhost:8000/auth/jwt/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          console.log(Object.values(data));
          throw new Error(Object.values(data)[0] || "An error occurred");
        }
        return data;
      })
      .then((data) => {
        toast.open({
          message: "ورود کاربر",
          type: "success",
        });
        authContext.login({}, data.access, data.refresh);
      })
      .catch((err) => {
        if (
          err.message == "No active account found with the given credentials"
        ) {
          toast.open({
            message: "اکانت فعالی با این ایمیل و رمزعبور وجود ندارد",
            type: "error",
          });
        }
      });
  };

  const handleVerifyAccount = async (event) => {
    event.preventDefault();

    if (!isValidCode) {
      toast.open({
        message: "کد تایید باید ۶ کاراکتر عددی یا حروفی باشد",
        type: "warning",
      });
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/auth/activate-user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ activation_code: code }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "کد وارد شده نامعتبر است");
      } else {
        toast.open({
          message: "حساب کاربری با موفقیت فعال شد",
          type: "success",
        });
        userLogin();
        onOk(); // Close modal on success
      }
    } catch (error) {
      toast.open({
        message: error.message,
        type: "error",
      });
    }
  };

  const handleReverifyAccount = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/auth/users/resend_activation/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error("خطا در انجام عملیات");
      }

      toast.open({
        message: `کد تایید به ایمیل "${email}" ارسال شد`,
        type: "success",
      });
    } catch (error) {
      toast.open({
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      {/* Toast moved above Modal */}
      <div className="toast-container">
        {/* Toast messages will be displayed here */}
      </div>

      <Modal
        className="font-iransans p-[40px] z-10"
        open={open}
        onOk={handleVerifyAccount}
        onCancel={onClose}
        footer={null}
        maskClosable={false}
      >
        <div className="header">
          <img className="m-auto w-1/3" src={AccountVerifyLogo} alt="" />
        </div>

        <div className="w-full flex flex-col gap-8">
          <h2 className="font-bold text-xl">فعالسازی اکانت کاربر</h2>

          <div>
            <p className="text-base">
              :کدی که به آدرس ایمیل زیر فرستاده شده را وارد کنید
            </p>
            <p className="text-[#00ADB5]">{email || "example@gmail.com"}</p>
          </div>

          <div className="input w-full">
            <input
              dir="rtl"
              className="outline-none border border-solid rounded-lg border-[#A7A9AD] w-full px-3 h-14 text-sm placeholder-[#A7A9AD] p-[24px] font-light"
              type="text"
              placeholder="کد را اینجا وارد کنید"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              className="w-full h-14 outline-none rounded-lg bg-[#4CC6CB] text-white font-bold text-base disabled:bg-gray-400"
              onClick={handleVerifyAccount}
              disabled={!isValidCode} // Disable button if code is invalid
            >
              تایید
            </button>
            <p className="text-sm font-normal text-center">
              کدی دریافت نکردید؟{" "}
              <span
                className="text-[#EFB036] cursor-pointer"
                onClick={handleReverifyAccount}
              >
                ارسال مجدد
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AccountVerificationModal;

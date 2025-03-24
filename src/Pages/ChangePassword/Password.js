import React, { useContext, useState } from "react";
import "./Password.css";
import { useLocation } from "react-router-dom";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Input from "../../Components/Form/Input";
import { ReactComponent as PassImage } from "../../Assets/images/PassImage.svg";
import { useToast } from "../../Components/dls/toast/ToastService";
import { ReactComponent as PassIcon } from "../../Assets/images/PassIcon.svg";
import { Modal } from "antd";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/rules";
import { useEffect } from "react";
import AuthContext from "../../context/authContext";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import AccountVerificationModal from "../../Components/Modal/AccountVerificationModal";
import ForgetpassModal from "../../Components/Modal/ForgetpassModal";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
export default function Password() {
  const [reCaptchaVerify, setReCaptchaVerify] = useState(false);
const toast= useToast();
  const query = useQuery();
  const token = query.get("token"); 
  const uid = query.get("uid"); 
  const onChangeHandler = () => {
    setReCaptchaVerify(true);
  };
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [formState, onInputHandler] = useForm(
    {
      password: {
        value: "",
        isValid: true,
      },
      repassword: {
        value: "",
        isValid: true,
      },
    },
    false
  );
  console.log(token, uid);
  const [passType, setPassType] = useState("");

  const resetPass = (event) => {
    event.preventDefault();

    const userData = {
      uid: uid,
      token:token,
      password: formState.inputs.password.value,
      retyped_password: formState.inputs.repassword.value
    };
    fetch("http://localhost:8000/auth/password-reset/confirm/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.status=="400") {
          console.log(Object.values(data)[0]);
          throw new Error(Object.values(data)[0] || "An error occurred");
        }
        if (res.status=="429") {
         
          throw new Error("too many requests");
        }
        return data;
      })
      .then((data) => {
       
        toast.open({
          message: "رمزعبور با موفقیت تغیر کرد",
          type: "success",
        });
        authContext.login({}, data.access , data.refresh );
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message[0] == "This password is too common.") {
          toast.open({
            message: "تعداد درخواست ها بیش از حد مجاز است . کمی بعد مجدد تلاش کتید",
            type: "warning",
          });
        }else if (err.message == "") {
          toast.open({
            message: "تعداد درخواست ها بیش از حد مجاز است . کمی بعد مجدد تلاش کتید",
            type: "warning",
          });
        }
      });
  };
  const myFunction = () => {
    if (passType == "password") {
      setPassType("text");
    } else {
      setPassType("password");
    }
  };
  return (
    <>
      <main
        dir="rtl"
        className="relative w-full  grid grid-cols-2  h-dvh font-iransans"
      >
        <div className="login-content col-span-2 lg:col-span-1 bg-white flex justify-center items-center p-10  ">
          <div className="login-main flex flex-col justify-between w-[500px] h-[600px] items-center">
            <div className="login-header   w-[172px] h-[172px] px-5 self-center  items-center text-center">
              <div className="header-logo ">
                <PassIcon />
              </div>
            </div>
            <div className="login-body w-full flex flex-col  justify-between   h-[412px] ">
              <div className="header-text text-center  flex flex-col justify-between   self-center  font-iransans font-bold text-[26px] leading-7 w-[331px] h-[84px]">
                <div className="header-title  font-bold text-2xl ">
                  فراموشی رمز عبور
                </div>
                <div className="header-desc font-normal text-base">
                  رمز عبور جدید خود را وارد کنید
                </div>
              </div>
              <div className="login-body-inputs flex flex-col  gap-4 h-[188px] ">
                <div className="login-input flex flex-col gap-2 ">
                  <label className="text-gray-800  font-normal text-base px-2">
                    رمز عبور
                  </label>
                  <div
                    className={`user-name_input flex justify-start px-2 items-center h-[52px]  border brder-1 rounded-[8px] ${
                      formState.inputs.password.isValid
                        ? "border-green-500"
                        : "border-[#a7a9ad] "
                    }`}
                  >
                    <div
                      className={`input h-[24px]   px-1 ${
                        formState.inputs.password.isValid
                          ? "text-green-500"
                          : "text-[#a7a9ad] "
                      }`}
                    >
                      <LockOutlined />
                    </div>
                    <Input
                      className="password-form__password-input"
                      id="password"
                      type="text"
                      placeholder="*******"
                      element="input"
                      validations={[requiredValidator(), minValidator(8)]}
                      onInputHandler={onInputHandler}
                    />
                  </div>
                </div>
                <div className="login-input flex flex-col gap-2 ">
                  <label className="text-gray-800  font-normal text-base px-2">
                    تکرار رمز عبور
                  </label>
                  <div
                    className={`user-name_input flex justify-start px-2 items-center h-[52px]  border brder-1 rounded-[8px] ${
                     (formState.inputs.repassword.value==formState.inputs.password.value)
                        ? "border-green-500"
                        : "border-[#a7a9ad] "
                    }`}
                  >
                    <div
                      className={`input h-[24px]   px-1 ${
                        (formState.inputs.repassword.value==formState.inputs.password.value)
                          ? "text-green-500"
                          : "text-[#a7a9ad] "
                      }`}
                    >
                      <LockOutlined />
                    </div>
                    <Input
                      className="password-form__password-input"
                      id="repassword"
                      type="text"
                      placeholder="*******"
                      element="input"
                      validations={[requiredValidator(), minValidator(8)]}
                      onInputHandler={onInputHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="login-body-footer h-[52px] flex flex-col ">
                <div className="login-button">
                  <button  onClick={(event) => {
                      if (
                        formState.inputs.password.isValid &&
                        (formState.inputs.repassword.value==formState.inputs.password.value)
                      ) {
                        resetPass(event);
                      }
                    }}
                    className={`w-full h-[52px] bg-[#4CC6CB] text-white rounded-lg transition-all duration-300 ${
                      formState.inputs.password.isValid &&
                      (formState.inputs.repassword.value==formState.inputs.password.value)
                        ? ""
                        : "opacity-50 cursor-not-allowed disabled"
                    }`}
                  >
                    تایید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="login-image hidden lg:block  lg:col-span-1 bg-white overflow-hidden  relative ">
          <div className="pass-image-container  w-full h-full justify-center items-center flex  2xl:scale-100 xl:scale-[80%] lg:scale-[70%]">
            <div className="pass-image absolute z-20">
              <PassImage />
            </div>
            <div className=" relative rect-light rounded-t-full z-10  bg-gradient-to-b from-white to-[#FBCF8E] w-[400px] h-[600px]  bottom-0 left-0 "></div>
          </div>

          <div className="ellapse w-[529.1px] h-[529.1px] blur-[400px]  bg-[rgba(76,198,203,0.4)] rotate-[4.74 deg] absolute -right-28 -top-52 rounded-full"></div>
          <div className="ellapse w-[529.1px] h-[529.1px]  blur-[400px] bg-[rgba(251,183,142,1)] rotate-[4.74 deg] absolute -bottom-52  -left-24 rounded-full"></div>
        </div>
      </main>
     
    </>
  );
}

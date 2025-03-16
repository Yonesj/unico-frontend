import React, { useContext, useState } from "react";
import "./SignUp.css";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Input from "../../Components/Form/Input";
import { ReactComponent as UnicoLogo } from "../../Assets/images/unicoLogo.svg";
import { ReactComponent as SignUpImage } from "../../Assets/images/sign-up.svg";
import { Modal } from "antd";
import Swal from 'sweetalert2'
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

export default function SignUp() {
  const [reCaptchaVerify, setReCaptchaVerify] = useState(false);

  const onChangeHandler = () => {
    setReCaptchaVerify(true);
  };
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userSignUp = (event) => {
    event.preventDefault();

    const userData = {
      username: formState.inputs.username.value,
      password: formState.inputs.password.value,
      email: formState.inputs.email.value,
    };

    if (formState.inputs.username.isValid) {
      fetch(
        "http://localhost:8000/auth/users/",
        {
          method: "POST",
          headers: {
            'Cntent-Type' : "application/json",
          },
          body: JSON.stringify(userData),
        }
      )
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text);
            });
          } else {
            return res.json();
          }
        })
        .then((result) => {
          if(result.token){
            authContext.login({}, result.token);
          }
          if (result.statusCode === 401) {
            localStorage.setItem("token", "");
            navigate("/", { replace: true });
            return;
          }
          if (result.status) {
            Swal.fire({
              title: "Login successful",
              icon: "success",
              buttons: "Login to the user panel",
            }).then((value) => {
              navigate("/");
            });
            authContext.login({}, result.token);
          } else {
            Swal.fire({
              title: "This user does not exist",
              icon: "error",
              buttons: "try again",
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "Error connecting to the server",
            icon: "error",
            buttons: "try again",
          });
        });
    } else {
      Swal.fire({
        title: "Please enter the correct email",
        icon: "error",
        buttons: "try again",
      });
    }
  };
  const [formState, onInputHandler] = useForm(
    {
      username:{
        value: "",
        isValid:false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: true,
      },
    },
    false
  );

  const [passType, setPassType] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isForgetpassModalOpen, setIsForgetpassModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleForgetpassOk = () => {
    setIsForgetpassModalOpen(false);
  };
  const handleForgetpassCancel = () => {
    setIsForgetpassModalOpen(false);
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
          <div className="login-main flex flex-col justify-between w-[500px] h-[626px] items-center">
            <div className="login-header   w-[331px] px-5 h-[150px] flex flex-col  justify-between items-center text-center">
              <div className="header-logo ">
                <UnicoLogo />
              </div>
              <div className="header-desc    font-iransans font-normal text-[26px] leading-7">
                به{" "}
                <span className="font-bold text-[26px] leading-7">
                  {" "}
                  یونیکو{" "}
                </span>{" "}
                خوش آمدید
              </div>
            </div>
            <div className="login-body w-full flex flex-col justify-between h-[432px]">
              <div className="login-body-inputs flex flex-col  gap-4 h-[292px] ">
                <div className="login-input flex flex-col gap-2 ">
                  <label className="text-gray-800 font-normal text-base px-2">
                    نام و نام خانوادگی
                  </label>
                  <div className=
                    {`user-name_input flex justify-start px-2 items-center h-[52px]  border brder-1 rounded-[8px] ${
                      formState.inputs.username.isValid ? "border-green-500" : "border-[#a7a9ad] "
                    }`}>
                    <div className={`input h-[24px]   px-1 ${
                      formState.inputs.username.isValid ? "text-green-500" : "text-[#a7a9ad] "
                    }`}>
                      {" "}
                      <UserOutlined />
                    </div>
                    <Input
                      className="login-form__username-input"
                      id="username"
                      type="text"
                      placeholder="محمد امین کریمی"
                      element="input"
                      validations={[requiredValidator()]}
                      onInputHandler={onInputHandler}
                    />
                  </div>
                </div>
                <div className="login-input flex flex-col gap-2">
                  <label className="text-gray-800  font-normal text-base px-2">
                    ایمیل
                  </label>
                  <div className=
                    {`user-name_input flex justify-start px-2 items-center h-[52px]  border brder-1 rounded-[8px] ${
                      formState.inputs.email.isValid ? "border-green-500" : "border-[#a7a9ad] "
                    }`}>
                    <div className={`input h-[24px]   px-1 ${
                      formState.inputs.email.isValid ? "text-green-500" : "text-[#a7a9ad] "
                    }`}>
                      {" "}
                      <MailOutlined />
                    </div>
                    <Input
                      className="login-form__username-input"
                      id="email"
                      type="text"
                      placeholder="example@gmail.com"
                      element="input"
                      validations={[requiredValidator(), emailValidator()]}
                      onInputHandler={onInputHandler}
                    />
                  </div>
                </div>
                <div className="login-input flex flex-col gap-2 ">
                  <label className="text-gray-800  font-normal text-base px-2">
                    رمز عبور
                  </label>
                  <div className=
                    {`user-name_input flex justify-start px-2 items-center h-[52px]  border brder-1 rounded-[8px] ${
                      formState.inputs.password.isValid ? "border-green-500" : "border-[#a7a9ad] "
                    }`}>
                    <div className={`input h-[24px]   px-1 ${
                      formState.inputs.password.isValid ? "text-green-500" : "text-[#a7a9ad] "
                    }`}>
                      <LockOutlined />
                    </div>
                    <Input
                      className="login-form__username-input"
                      id="password"
                      type="text"
                      placeholder="*******"
                      element="input"
                      validations={[requiredValidator(), minValidator(8)]}
                      onInputHandler={onInputHandler}
                    />
                  </div>
                </div>
              </div>
              <div className="login-body-footer h-[96px] flex flex-col justify-between">
                <div className="login-button">
                  <button
                     onClick={(event) => {
                      if (
                        formState.inputs.username.isValid &&
                        formState.inputs.email.isValid &&
                        formState.inputs.password.isValid
                      ) {
                        userSignUp(event)
                      }
                    }}
                    className={`w-full h-[52px] bg-[#4CC6CB] text-white rounded-lg transition-all duration-300 ${
                      formState.inputs.username.isValid &&
                      formState.inputs.email.isValid &&
                      formState.inputs.password.isValid
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                    }`}
                  >
                    ساخت اکانت
                  </button>
                </div>
                <div className="login-footer-desc text-gray-600 font-light text-sm leading-4 text-center  ">
                  قبلا ثبت نام کرده اید؟
                  <span onClick={()=>navigate(`/login`)} className="text-[#EFB036] font-medium text-sm leading-4 hover:cursor-pointer">
                    {" "}
                    صفحه ورود
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="login-image hidden lg:block  lg:col-span-1 bg-white overflow-hidden  relative ">
          <div
            className=" absolute 2xl:right-[70px] 2xl:top-[150px] xl:right-[30px] xl:top-[100px] lg:right-[0px] lg:top-[30px] xl:scale-[85%] lg:scale-[70%] 2xl:scale-100
  w-fit h-[fit]"
          >
            <div className="login-logo relative  flex justify-center  ">
              <SignUpImage className="z-20" />
              <div className=" absolute rect-light rounded-t-full z-10  bg-gradient-to-b from-white to-[#FBCF8E] w-[418px] h-[467px]  bottom-0 left-36 ">
                {" "}
              </div>
              <div className="slider absolute -bottom-[100px] -left-[10px]     max-w-[380px] h-[184px] z-30  bg-white shadow-2xl rounded-xl text-right items-center flex flex-col p-5 gap-4 px-6 ">
                <div className="slider-title font-medium text-base text-gray-900 text-right w-full">
                  {" "}
                  لورم ایپسوم متن
                </div>
                <div className="slider-desc font-normal text-sm text-gray-700">
                  {" "}
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است.
                </div>
              </div>
            </div>
          </div>

          <div className="ellapse w-[529.1px] h-[529.1px] blur-[400px]  bg-[rgba(76,198,203,0.4)] rotate-[4.74 deg] absolute -right-28 -top-52 rounded-full"></div>
          <div className="ellapse w-[529.1px] h-[529.1px]  blur-[400px] bg-[rgba(251,183,142,1)] rotate-[4.74 deg] absolute -bottom-24  -left-24 rounded-full"></div>
        </div>
      </main>
      <AccountVerificationModal
        open={isModalOpen}
        onClose={() => handleCancel()}
        onOk={() => handleOk()}
      ></AccountVerificationModal>
      <ForgetpassModal
        open={isForgetpassModalOpen}
        onClose={() => handleForgetpassCancel()}
        onOk={() => handleForgetpassOk()}
      ></ForgetpassModal>
    </>
  );
}

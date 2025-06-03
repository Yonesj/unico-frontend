    // ResponsiveModal.jsx
    import React from "react";
    import { Modal, Button } from "antd";
    import { CloseOutlined } from "@ant-design/icons";

    import success from '../../Assets/images/Success.png';
const ConfirmOrderModal = ({ open, onOk, onClose }) => {


  return (




    <Modal
      open={open}
      footer={null}
      onCancel={onClose}
      closeIcon={<CloseOutlined />}
      centered
      className="!p-0 font-iransansfa"
      bodyStyle={{ padding: 0 }}
      width={540}
    >
      <div className="flex flex-col items-center text-center p-4 pt-10 rounded-xl">
      <img className="w-[186px] h-[186px]" src={success} alt="phone" />

        <p className="text-base  font-normal  lg:text-lg   mt-6">
        بسته پیامکی <span className="text-[#00ADB5] font-medium"> ۶ ماهه </span> برای شما فعال شد!        </p>
        <p className="text-sm  font-normal  lg:text-base mb-6  text-[#929292]">
        اعتبار تا ۱۴۰۴/۰۵/۲۵
        </p>
        <div
          className="bg-[#4CC6CB] font-iransansfa lg:text-base lg:font-bold text-sm font-medium  lg:h-[52px] h-[36px] w-full rounded-lg text-white flex items-center justify-center  cursor-pointer"
        >
          تایید 
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmOrderModal;
    // ResponsiveModal.jsx
    import React from "react";
    import { Modal, Button } from "antd";
    import { CloseOutlined } from "@ant-design/icons";

    import phone from '../../Assets/images/phone.png';
const ConfirmPhoneModal = ({ open, onOk, onClose }) => {


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
      <img className="w-[186px] h-[186px]" src={phone} alt="phone" />

        <p className="text-sm  font-normal  lg:text-lg mb-6  sm:text-base mt-6">
          ابتدا شماره تلفن خود را تایید کنید!
        </p>
        <div
          className="bg-[#4CC6CB] font-iransansfa lg:text-base lg:font-bold text-sm font-medium  lg:h-[52px] h-[36px] w-full rounded-lg text-white flex items-center justify-center  cursor-pointer"
        >
          تایید شماره تلفن
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmPhoneModal;
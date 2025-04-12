import { Modal } from "antd"
import { useState } from "react"
import "./AddUnitModal.css"
import React from 'react';
import IsfahanSvg from "../../Assets/images/University-of-Isfahan-Logo(4) 1.svg"
import "./GolestanLoginModal.css"
const GolestanLoginModal = ({ onOk, onClose, open }) => {
    const [stuID, setStuID] = useState("");
    const [stuPass, setStuPass] = useState("");
    return (
        <Modal
            className='font-iransans GolestanLoginModal'
            open={open} onOk={onOk} onCancel={onClose}
            footer={
                [
                ]}

        >
            <div className="px-5 py-4">
                <header className="mt-4">
                    <img className="m-auto mb-2.5" src={IsfahanSvg} alt="" />
                    <h1 className="font-bold text-base mb-1">ورود به سیستم دانشگاهی گلستان</h1>
                    <p className="font-normal text-base">دانشگاه اصفهان</p>
                </header>
                <div className="h-[190px] flex flex-col items-start my-6 gap-2.5">
                    <label className="text-base " htmlFor="stuID">شماره دانشجویی</label>
                    <input className="w-full py-3 px-5 border-solid border border-[#A7A9AD] rounded-lg" type="text" id="stuID" name="stuID" onChange={(e) =>setStuID(e.target.value)} value={stuID} placeholder="4013401340" />
                    <label className="text-base" htmlFor="stuID">رمز عبور </label>
                    <input className="w-full py-3 px-5 border-solid border border-[#A7A9AD] rounded-lg" type="password" id="stuID" name="stuID" onChange={(e) =>setStuPass(e.target.value)} value={stuPass} placeholder="*******" />
                </div>
                <div>
                    <button className="w-full py-1.5 px-3 bg-[#4CC6CB] text-white h-[52px] rounded-lg" type="button">ورود</button>
                </div>
            </div>


        </Modal>
    )
}

export default GolestanLoginModal
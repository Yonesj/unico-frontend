import { Modal } from "antd"
import { useState } from "react"
import "./AddUnitModal.css"
import React from 'react';
import { TimePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Select } from "antd";
import { DatePicker } from "antd";
const format = 'HH:mm';
const AddUnitModal = (onOk, onClose, open) => {
    const [unitName, setUnitName] = useState("");
    const startTime = dayjs('11:00', 'HH:mm');
    const endTime = dayjs('12:00', 'HH:mm');
    ;


    return (
        <Modal
            className='font-iransans addUnitModal'
            open={false} onOk={onOk} onCancel={onClose}
            footer={

                [
                ]}

        >
            <div action="" dir="rtl" className="flex flex-col gap-5 h-full text-right mt-7 ">
                <div className="flex flex-col ">
                    <label for="name">
                        عنوان درس
                    </label>
                    <input
                        className="border border-solid border-[#A7A9AD] py-2 px-5 rounded-lg mt-2 placeholder:text-[#A7A9AD]"
                        type="text"
                        name="name"
                        id="name"
                        value={unitName}
                        onChange={(e) =>
                            setUnitName(e.target.value)
                        }
                        placeholder="ریاضی ۱"
                        required
                    />
                </div>
                <div className="flex gap-6">
                    <div className="flex flex-col flex-1 ">
                        <label for="name">
                            نام استاد
                        </label>
                        <input
                            className="border border-solid border-[#A7A9AD] py-2 px-5 rounded-lg mt-2 placeholder:text-[#A7A9AD]"
                            type="text"
                            name="name"
                            id="name"
                            value={unitName}
                            onChange={(e) =>
                                setUnitName(e.target.value)
                            }
                            placeholder="امینی هرندی"
                            required
                        />
                    </div>
                    <div className="flex flex-col flex-1 ">
                        <label for="name">
                            کد درس
                        </label>
                        <input
                            className="border border-solid border-[#A7A9AD] py-2 px-5 rounded-lg mt-2 placeholder:text-[#A7A9AD]"
                            type="text"
                            name="name"
                            id="name"
                            value={unitName}
                            onChange={(e) =>
                                setUnitName(e.target.value)
                            }
                            placeholder="401351 - 05"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2.5 mb-2.5">
                    <div className="flex">
                        <label for="name">
                            زمان های ارائه درس
                        </label>


                    </div>
                    <div className="flex  ">

                        <div className="flex w-1/2 items-center border border-solid border-[#A7A9AD] rounded-lg rounded-l-none outline-none text-base px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14 6.66683H2M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M5.2 14.6668H10.8C11.9201 14.6668 12.4802 14.6668 12.908 14.4488C13.2843 14.2571 13.5903 13.9511 13.782 13.5748C14 13.147 14 12.5869 14 11.4668V5.86683C14 4.74672 14 4.18667 13.782 3.75885C13.5903 3.38252 13.2843 3.07656 12.908 2.88482C12.4802 2.66683 11.9201 2.66683 10.8 2.66683H5.2C4.0799 2.66683 3.51984 2.66683 3.09202 2.88482C2.71569 3.07656 2.40973 3.38252 2.21799 3.75885C2 4.18667 2 4.74672 2 5.86683V11.4668C2 12.5869 2 13.147 2.21799 13.5748C2.40973 13.9511 2.71569 14.2571 3.09202 14.4488C3.51984 14.6668 4.0799 14.6668 5.2 14.6668Z" stroke="#919498" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <Select className="w-full " defaultValue={"شنبه"} suffixIcon={""} >
                                <Select.Option value="saturday">شنبه</Select.Option>
                                <Select.Option value="sunday">یکشنبه</Select.Option>
                                <Select.Option value="monday">دوشنبه</Select.Option>
                                <Select.Option value="tuesday">سه‌شنبه</Select.Option>
                                <Select.Option value="wednesday">چهارشنبه</Select.Option>
                            </Select>
                        </div>
                        <div className="w-1/2" dir="ltr">
                            <TimePicker.RangePicker className="border-[#A7A9AD] rounded-lg rounded-r-none py-2 px-3 border-r-0" defaultValue={[startTime, endTime]} format={format}
                                separator={<span>-</span>} // Custom separator

                            />
                        </div>

                    </div>
                    <div className="flex  ">

                        <div className="flex w-1/2 items-center border border-solid border-[#A7A9AD] rounded-lg rounded-l-none outline-none text-base px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14 6.66683H2M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M5.2 14.6668H10.8C11.9201 14.6668 12.4802 14.6668 12.908 14.4488C13.2843 14.2571 13.5903 13.9511 13.782 13.5748C14 13.147 14 12.5869 14 11.4668V5.86683C14 4.74672 14 4.18667 13.782 3.75885C13.5903 3.38252 13.2843 3.07656 12.908 2.88482C12.4802 2.66683 11.9201 2.66683 10.8 2.66683H5.2C4.0799 2.66683 3.51984 2.66683 3.09202 2.88482C2.71569 3.07656 2.40973 3.38252 2.21799 3.75885C2 4.18667 2 4.74672 2 5.86683V11.4668C2 12.5869 2 13.147 2.21799 13.5748C2.40973 13.9511 2.71569 14.2571 3.09202 14.4488C3.51984 14.6668 4.0799 14.6668 5.2 14.6668Z" stroke="#919498" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <Select className="w-full" defaultValue={"شنبه"} suffixIcon={""} >
                                <Select.Option value="saturday">شنبه</Select.Option>
                                <Select.Option value="sunday">یکشنبه</Select.Option>
                                <Select.Option value="monday">دوشنبه</Select.Option>
                                <Select.Option value="tuesday">سه‌شنبه</Select.Option>
                                <Select.Option value="wednesday">چهارشنبه</Select.Option>
                            </Select>
                        </div>
                        <div className="w-1/2" dir="ltr">
                            <TimePicker.RangePicker className="border-[#A7A9AD] rounded-lg rounded-r-none py-2 px-3 border-r-0" defaultValue={[startTime, endTime]} format={format}
                                separator={<span>-</span>} // Custom separator

                            />
                        </div>

                    </div>
                    <div className="flex  ">

                        <div className="flex w-1/2 items-center border border-solid border-[#A7A9AD] rounded-lg rounded-l-none outline-none text-base px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14 6.66683H2M10.6667 1.3335V4.00016M5.33333 1.3335V4.00016M5.2 14.6668H10.8C11.9201 14.6668 12.4802 14.6668 12.908 14.4488C13.2843 14.2571 13.5903 13.9511 13.782 13.5748C14 13.147 14 12.5869 14 11.4668V5.86683C14 4.74672 14 4.18667 13.782 3.75885C13.5903 3.38252 13.2843 3.07656 12.908 2.88482C12.4802 2.66683 11.9201 2.66683 10.8 2.66683H5.2C4.0799 2.66683 3.51984 2.66683 3.09202 2.88482C2.71569 3.07656 2.40973 3.38252 2.21799 3.75885C2 4.18667 2 4.74672 2 5.86683V11.4668C2 12.5869 2 13.147 2.21799 13.5748C2.40973 13.9511 2.71569 14.2571 3.09202 14.4488C3.51984 14.6668 4.0799 14.6668 5.2 14.6668Z" stroke="#919498" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                            <Select className="w-full " defaultValue={"شنبه"} suffixIcon={""} >
                                <Select.Option value="saturday">شنبه</Select.Option>
                                <Select.Option value="sunday">یکشنبه</Select.Option>
                                <Select.Option value="monday">دوشنبه</Select.Option>
                                <Select.Option value="tuesday">سه‌شنبه</Select.Option>
                                <Select.Option value="wednesday">چهارشنبه</Select.Option>
                            </Select>
                        </div>
                        <div className="w-1/2" dir="ltr">
                            <TimePicker.RangePicker className="border-[#A7A9AD] rounded-lg rounded-r-none py-2 px-3 border-r-0" defaultValue={[startTime, endTime]} format={format}
                                separator={<span>-</span>} // Custom separator

                            />
                        </div>

                    </div>
                    <div className="">
                        <button className="flex cursor-pointer items-center justify-center m-auto bg-transparent border-dashed p-1.5 rounded-lg border-[#D9D9D9]" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M9.99984 4.1665V15.8332M4.1665 9.99984H15.8332" stroke="#929292" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-2.5" >

                    <div className="flex">
                        <label for="name">
                            تاریخ امتحان                            </label>


                    </div>
                    <div className="flex   ">


                        <div dir="ltr" className=" examDate flex w-1/2 items-center border border-solid border-[#A7A9AD] rounded-lg rounded-l-none outline-none text-base px-3">
                            <DatePicker placeholder="انتخاب تاریخ" className="border-none h-full " />

                        </div>
                        <div className="w-1/2" dir="ltr">
                            <TimePicker.RangePicker className="border-[#A7A9AD] rounded-lg rounded-r-none py-2 px-3 border-r-0" defaultValue={[startTime, endTime]} format={format}
                                separator={<span>-</span>} // Custom separator

                            />
                        </div>

                    </div>
                </div>
                <div className="w-full ">
                    <button  className="cursor-pointer w-full bg-[#4CC6CB] py-3 px-3 text-white outline-none border-none rounded-lg text-base font-bold"  type="button">
                        افزودن
                    </button>
                </div>


            </div>


        </Modal>
    )
}

export default AddUnitModal
import React, { useState } from "react";
import { Button, Switch } from "antd";
import { ReactComponent as Wallet } from "../../Assets/images/wallet-04.svg"
import {
    ClockCircleTwoTone, MailTwoTone,
    PhoneTwoTone,
} from "@ant-design/icons";
import SmsPackageModal from '../../Components/Modal/SmsPackageModal';
import ConfirmPhoneModal from "../../Components/Modal/ConfirmPhoneModal";
import ConfirmOrderModal from "../../Components/Modal/ConfirmOrderModal";

const StudentFoodNotification = () => {
    const [shownModal, setShownModal] = useState(false);
    const [shownConfirmPhoneModal, setShownConfirmPhoneModal] = useState(false);
    const [shownConfirmOrderModal, setShownConfirmOrderModal] = useState(false);
    const handleCloseModal = () => {
        setShownModal(false);
    };
    const handleCloseConfirmPhoneModal = () => {
        setShownConfirmPhoneModal(false);
    };
    const handleConfirmOrderModal = () => {
        setShownConfirmOrderModal(false);
    };
    return (
        <>
            <div className="bg-[#aabec7] min-h-screen p-4  font-iransansfa  h-dvh">
                <div className=" mx-auto">
                    <div className="  bg-white rounded-xl shadow-md p-4 space-y-4 ">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-center md:justify-between  sm:items-center gap-2 bg-[#E5F7F8] p-[12px] ps-[24px] rounded-[8px]">
                            <h2 className="lg:text-base lg:font-medium   sm:text-sm  text-xs   text-right">
                                اعتبار بسته پیامکی شما تا تاریخ 1404/05/24 میباشد. <span className=" text-[#00ADB5]">(27 روز باقیمانده)</span></h2>
                            <Button onClick={() => setShownModal(true)} className="  text-sm  w-[156px] lg:w-[171px] lg:[32px] lg:h-[38px] rounded-[8px] justify-center items-center  font-iransansfa bg-[#00ADB5] text-white">
                                <div><Wallet /></div>
                                خرید بسته پیامکی
                            </Button>
                        </div>

                        {/* Responsive Table */}
                        <div className="overflow-x-auto  notif-max-height ">
                            <table className="w-full hidden lg:block  max-h-full  border-collapse text-right text-sm  ">
                                <thead>
                                    <tr className="bg-slate-100 text-gray-700 w-full">
                                        <th className="p-2 w-[11%]">وضعیت</th>
                                        <th className="p-2  w-[67%] justify-center  text-center">نام رویداد</th>
                                        <th className="p-2 w-[11%]">
                                            <div className="flex items-center  gap-1">
                                                سرویس ایمیل
                                            </div>
                                        </th>
                                        <th className="p-2 w-[11%]">
                                            <div className="flex items-center  gap-1">
                                                سرویس پیامکی
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=" overflow-y-scroll ">
                                    {/* Row 1 */}
                                    <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr> <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr>
                                    {/* Row 2 */}
                                    <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                        <td className="p-2">
                                            <Switch />
                                        </td>
                                    </tr>
                                    {/* Row 3 */}
                                    <tr className="border-b">
                                        <td className="p-2 flex items-center gap-1">
                                            <div className="inline-flex text-sm  font-normal  rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#E4F7EA] text-[#008933] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#00AD4B]"></span>
                                                <span className=" font-medium">فعال</span>
                                            </div>
                                        </td>
                                        <td className="p-2 text-center">اطلاع رسانی سلف</td>
                                        <td className="p-2">
                                            <Switch />
                                        </td>
                                        <td className="p-2">
                                            <Switch defaultChecked />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="block lg:hidden gap-2">
                                <div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div>
                                <div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div><div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div><div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div><div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div><div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div><div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div><div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div><div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div><div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div><div className=" w-[95%] border border-1 border-[#EEEEEE] rounded-xl px-4 py-3 flex  items-end self-stretch gap-[6px] flex-col ">
                                    <div className="flex justify-between items-center self-stretch">
                                        <div className=" text-sm font-semibold">
                                            اطلاع رسانی
                                        </div>
                                        <div className="">
                                            <div className="inline-flex text-sm  font-normal rounded-[48px] px-3 py-1 text-center items-center gap-2 bg-[#FEEBEE] text-[#CE3134] ">
                                                <span className="w-[6px] h-[6px] rounded-full shadow-md bg-[#CE3134]"></span>
                                                <span className=" font-medium">غیرفعال</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex items-center gap-[26px]  w-fit  self-start">
                                        <div className="flex items-center  gap-2">


                                            <div className=" text-xs sm:text-sm font-normal">سرویس ایمیل</div>
                                            <Switch size="small" defaultChecked />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className=" text-xs sm:text-sm font-normal">سرویس پیامکی</div>
                                            <Switch  size="small" defaultChecked />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SmsPackageModal open={shownModal}
                onClose={() => handleCloseModal()} />
            <ConfirmPhoneModal open={shownConfirmPhoneModal} onClose={() => handleCloseConfirmPhoneModal()} />
            <ConfirmOrderModal open={shownConfirmOrderModal} onClose={() => handleConfirmOrderModal()} />

        </>

    );
};

export default StudentFoodNotification;

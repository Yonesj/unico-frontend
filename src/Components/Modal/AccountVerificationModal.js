import React, { useState } from 'react'
import './AccountVerificationModal.css'
import { Modal } from 'antd'
import AccountVerifyLogo from '../../Assets/images/AccountVerifyLogo.svg'
import Input from '../Form/Input'
const AccountVerificationModal = ({ open, onOk, onClose }) => {

    return (


        <Modal
            className='font-iransans'
            open={open} onOk={onOk} onCancel={onClose}
            footer={

                [

                   


                ]}

        >
            <div className="header">
                <img className='m-auto w-1/3' src={AccountVerifyLogo} alt="" />

            </div>
            <div className="w-full  flex flex-col gap-8">
                <h2 className='font-bold text-xl'> فعالسازی اکانت کاربر</h2>
                <div><p className='text-base'>:کدی که به آدرس ایمیل زیر فرستاده شده را وارد کنید</p>
                    <p className='text-[#00ADB5]'>example@gmail.com</p></div>

                <div className="input w-full" >
                    <input dir='rtl' className='outline-none border border-solid rounded-lg border-[#A7A9AD] w-full px-3 h-14 text-sm placeholder-[#A7A9AD] font-light-' type="text" placeholder='کد را اینجا وارد کنید' />
                </div>
                <div className='flex flex-col  gap-4'>
                       
                       <button className='w-full h-14 outline-none rounded-lg bg-[#4CC6CB] text-white font-bold text-base' onClick={onOk}>
                            تایید
                       </button>
                        <p className='text-sm font-normal text-center'>کدی دریافت نکردید؟ <span className='text-[#EFB036]'>ارسال مجدد</span></p>
                    </div>
            </div>


        </Modal>
    )
}

export default AccountVerificationModal
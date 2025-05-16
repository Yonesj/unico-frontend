import React from 'react'
import MasterProf from "../../Assets/images/Ellipse 9.svg"


const CommentCard = ({ first_name, last_name, id, review_text, profile_image }) => {

    return (
        <div
            className='amin p-4 pt-6 bg-white w-[218px] h-[271px] flex  text-xs   flex-col  rounded-xl cursor-pointer hover:bg-[#E5F7F8] transition-all z-[5]'>
            <p className='font-semibold'>دیدگاه کاربر:</p>
            <p className='text-[#666] font-normal my-[14px] flex-1'>{review_text} </p>
            <hr />
            <div className='flex gap-2 items-center mt-2.5 mb-2'>
                <img className='h-8 w-8' src={MasterProf} alt="" />
                <p className='text-[#00ADB5]'>احمدرضا منتظرالقائم</p>
            </div>

        </div>
    )
}

export default CommentCard
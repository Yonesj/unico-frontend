import RatingSlider from '../../Components/RatingSlider'
import React, { useContext, useState } from 'react'
import ProfessorProf from "../../Assets/images/Rectangle 17.png"
import { Link, useNavigate } from 'react-router-dom'
import { Select } from 'antd';
import "./PostComment.css"
import { Flex, Radio } from 'antd';
const options1 = [
  { label: 'حضور مهم است و تاثیر مستقیم دارد', value: 'hard' },
  { label: 'حضور مهم نیست و تاثیر مثبت دارد', value: 'medium' },
  { label: 'حضور و غیاب نمیکند', value: 'easy' },
  { label: 'یادم نمیاد', value: 'dontKnow' },
];
const options2 = [
  { label: 'آره', value: 'yes' },
  { label: 'نه', value: 'no' },
];
const PostComment = () => {
  const navigate = useNavigate();

  



  return (
    <>
     
      <div className='w-full bg-white rounded-lg mt-2.5 text-sm lg:text-base p-3 sm:p-8'>
        <div>
          <p>فرم ثبت نظر <span className="text-[#EF443C]">(اطلاعات شما مخفی خواهد ماند)</span></p>
        </div>
        <div className='flex flex-col gap-3.5 lg:flex-row lg:gap-8 mt-9 lg:mt-16 lg:items-center'>
          <p>چه درسی رو با این استاد داشتی <span className='text-[#EF443C]'>*</span> :</p>
          <div className='flex items-center gap-1.5 md:gap-2.5'>
            <div className='w-[190px] md:w-[214px]'>
              <Select
                className='border border-gray-500 border-solid font-iransansfa h-9 text-xs lg:text-[16px]' // Responsive font size
                defaultValue="درس مورد نظرت رو انتخاب کن"
                style={{ width: 186 }}
                options={[
                  { value: 'jack', label: 'همه ی دروس' },
                  { value: 'lucy', label: 'همه ی دروس' },
                  { value: 'Yiminghe', label: 'همه ی دروس' },
                ]}
              />
            </div>
            <button className='px-3   bg-[#4CC6CB]  hover:bg-[#33BDC4] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm rounded-lg h-9 text-white'>
              <svg className='hidden lg:block' xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7.46838 1.37598H6.53088C6.44755 1.37598 6.40588 1.41764 6.40588 1.50098V6.40723H1.75C1.66667 6.40723 1.625 6.44889 1.625 6.53223V7.46973C1.625 7.55306 1.66667 7.59473 1.75 7.59473H6.40588V12.501C6.40588 12.5843 6.44755 12.626 6.53088 12.626H7.46838C7.55172 12.626 7.59338 12.5843 7.59338 12.501V7.59473H12.25C12.3333 7.59473 12.375 7.55306 12.375 7.46973V6.53223C12.375 6.44889 12.3333 6.40723 12.25 6.40723H7.59338V1.50098C7.59338 1.41764 7.55172 1.37598 7.46838 1.37598Z" fill="white" />
              </svg>
              <p>افزودن درس</p>
            </button>
          </div>
        </div>
        <div className='bg-[#FAFAFA] rounded-xl mt-[52px] mb-[66px] p-6 sm:p-14 lg:p-6 pb-[18px] '>
          <div className='flex flex-col flex-wrap lg:flex-row justify-between'>
            <RatingSlider label="سختی امتحان" onChange={(value) => console.log(value)} />
            <RatingSlider label="دانش عمومی" onChange={(value) => console.log(value)} />
            <RatingSlider label="جذابیت تدریس" onChange={(value) => console.log(value)} />
            <RatingSlider label="سختی امتحان" onChange={(value) => console.log(value)} />
            <RatingSlider label="سختی تکالیف" onChange={(value) => console.log(value)} />
          </div>
        </div>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col lg:flex-row lg:items-center lg:gap-8'>
            <p>حضور غیاب : <span className='text-[#EF443C]'>*</span></p>
            <Radio.Group
              className='font-iransans'

              flex
              options={options1}
              defaultValue="hard"
              optionType="button"
              buttonStyle="solid"
              backgroundColor="red"

            />
          </div>
          <div className='flex flex-col lg:flex-row gap-8  lg:gap-[20%]'>
            <div className='flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8'>
              <p>نمرت چند شد؟</p>
              <input
                type="text"
                placeholder="19"
                className="border border-solid border-[#D9D9D9] rounded-md w-[90px] h-[38px] px-3 font-iransansfa"
                onInput={(e) => {
                  const value = e.target.value;
                  // Allow empty or numbers from 0 to 20
                  if (/^(?:[0-9]|1[0-9]|20)?$/.test(value)) {
                    e.target.dataset.valid = "true";
                  } else {
                    e.target.dataset.valid = "false";
                    e.target.value = e.target.value.slice(0, -1); // remove last char
                  }
                }}
              />

            </div>
            <div className='flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-8'>
              <p>منابع امتحان استاد :</p>
              <input type="text" className='border border-solid border-[#D9D9D9] rounded-md w-full md:w-[399px] h-[40px] px-3 font-iransansfa' name="" id="" placeholder='منابع امتحانی رو وارد کن' />
            </div>
          </div>
          <div className='flex flex-col lg:flex-row lg:items-center lg:gap-8'>
            <p> دوباره این استاد رو برمیداری؟  <span className='text-[#EF443C]'>*</span></p>
            <Radio.Group
              className='font-iransans'

              flex
              options={options2}
              defaultValue="yes"
              optionType="button"
              buttonStyle="solid"

            />
          </div>
        </div>
        <hr className='my-16'/>
        <div>
          <div>
            <h4>نظر شما درباره این استاد چیه؟</h4>
            <p className='text-[#7A7E83] text-xs mt-0.5'>نظرت رو درباره تدریس و نحوه انتقال مطالب توسط استاد بنویس. سبک تدریسش چطوره؟ مطالب رو خوب توضیح می‌ده؟</p>
          </div>
          <div className='rounded-lg text-xs lg:text-sm bg-[#FAFAFA] p-4 my-2'>
                <p className='py-3'>چند نکته:</p>
                <div className='mr-5 mb-2'>
                  <ul className='list-disc mb-2 flex flex-col gap-1   [&>li::marker]:text-xs font-normal'>
                    <li>لطفاً از کلمات توهین‌آمیز یا نامناسب استفاده نکن، چون ممکنه نظرت حذف بشه.</li>
                    <li>سعی کن دربارۀ تبعیض یا جانبداری استاد نسبت به دانشجویان قضاوت نکنی.</li>
                    <li>قبل از ثبت نظر، یه بار دیگه متن رو بخون تا مطمئن بشی واضح و کامل نوشته شده.</li>
                  </ul>
                  <Link className='font-medium  underline underline-offset-4'>     مشاهده همه دستورالعمل‌ها  </Link>
                </div>
          </div>
          <div>
            <textarea maxLength={350} placeholder='به نظر تو، دانشجوهای دیگه باید درباره این استاد چه چیزهایی بدونن؟' className='h-[212px] w-full resize-none px-3 py-2 pb-16 border border-[#A7A9AD] rounded-lg'  name="" id="">

            </textarea>
            <p className='text-left font-iransansfa text-xs text-[#64696F]'>0/350</p>
          </div>
          <button onClick={()=> navigate("submitted")} className='w-full mt-9 md:w-[293px] h-[52px] bg-[#4CC6CB]  hover:bg-[#33BDC4] transition-all rounded-xl py-2 px-4 text-white'>
          ثبت و ارسال نظر 
          </button>
        </div>

      </div>

    </>

  )
}

export default PostComment
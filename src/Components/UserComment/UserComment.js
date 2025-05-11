import React from 'react'
import Progressbar from '../Progressbar';
import jalaali from 'jalaali-js';

function convertToShamsi(gregorianDateStr) {
  const date = new Date(gregorianDateStr); // e.g., "2025-05-07T14:30:00Z"
  const { gy, gm, gd } = {
    gy: date.getUTCFullYear(),
    gm: date.getUTCMonth() + 1,
    gd: date.getUTCDate(),
  };

  const { jy, jm, jd } = jalaali.toJalaali(gy, gm, gd);

  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ];

  return `${jd} ${months[jm - 1]} ${jy}`;
}


const UserComment = ({comment}) => {
    console.log(comment);
    
    return (
        <div className='w-full  lg:p-6  rounded-xl font-iransansfa '>
            <div className='flex justify-between items-center'>
                <div className='flex  gap-2 lg:gap-4 items-center'>
                    <div className='w-8 h-8 text-xs lg:h-11 lg:w-11 pt-0.5 bg-[#92DEAC] rounded-[10px] flex justify-center items-center font-semibold text-black lg:text-base'>
                        4.9
                    </div>
                    <p className='text-[#1B1B1B] text-[13px] lg:text-base  font-semibold'>{comment?.course?.name}</p>
                </div>
                <div>
                    <p className='font-normal text-[#6F6F6F] text-[11px] lg:text-sm'>{convertToShamsi(comment.created_at)}</p>
                </div>
            </div>
            <div className='flex flex-col  lg:flex-row gap-10 items-center my-7'>
                <div className='h-[180px] w-full lg:w-[35%] flex flex-col text-xs text-[#6C6C6C]  justify-between text-nowrap'>

                    <div className='flex gap-3 items-center '>
                        <p className='w-[99px] text-xs  text-black'>نمره دهی</p>
                        <Progressbar strok={6} value={Number(comment.grading).toFixed(1) * 20} />
                        <p className="hidden md:block">دست باز و با ارفاق</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <p className='w-[99px] text-xs  text-black'>دانش عمومی</p>
                        <Progressbar strok={6} value={Number(comment.general_knowledge).toFixed(1) * 20} />
                        <p className="hidden md:block">دست باز و با ارفاق</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <p className='w-[99px] text-xs  text-black'>جذابیت تدریس</p>
                        <Progressbar strok={6} value={Number(comment.teaching_engagement).toFixed(1) * 20} />
                        <p className="hidden md:block">دست باز و با ارفاق</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <p className='w-[99px] text-xs  text-black'>سختی تکالیف</p>
                        <Progressbar strok={6} value={Number(comment.homework_difficulty).toFixed(1) * 20} />
                        <p className="hidden md:block">دست باز و با ارفاق</p>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <p className='w-[99px] text-xs  text-black'>سختی امتحان</p>
                        <Progressbar strok={6} value={Number(comment.exam_difficulty).toFixed(1) * 20} />
                        <p className="hidden md:block">دست باز و با ارفاق</p>
                    </div>
                </div>
                <div className='w-full lg:w-[65%] flex flex-col text-xs lg:text-base '>
                    <h4 className='text-[#2BAE58] font-semibold '>{comment.would_take_again ? "دوباره این استاد رو برمیدارم" : ""}</h4>
                    <div className='flex flex-col lg:flex-row w-full gap-2.5 lg:gap-8 lg:items-center mt-4 mb-5'>
                        <p>حضور غیاب: میکند</p>
                        <p>نمره دانشجو: <span className='font-semibold'>{comment.received_score}</span></p>
                        <p>منابع امتحان: <span className='font-semibold'>{comment.exam_resources}</span></p>
                    </div>
                    <p className='text-[#181818]'>{comment.review_text}</p>
                </div>
            </div>
            <div className='flex w-full justify-between text-[#AAA] text-xs'>
                <div className='flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <g clip-path="url(#clip0_15482_5335)">
                            <path d="M3.3335 12.5033C3.3335 12.5033 4.16683 11.6699 6.66683 11.6699C9.16683 11.6699 10.8335 13.3366 13.3335 13.3366C15.8335 13.3366 16.6668 12.5033 16.6668 12.5033V2.50326C16.6668 2.50326 15.8335 3.33659 13.3335 3.33659C10.8335 3.33659 9.16683 1.66992 6.66683 1.66992C4.16683 1.66992 3.3335 2.50326 3.3335 2.50326L3.3335 18.3366" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_15482_5335">
                                <rect width="20" height="20" fill="white" transform="translate(0 0.00341797)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p>گزارش این دیدگاه</p>
                </div>
                <div className='flex items-center gap-5'>
                    <div className='flex items-center gap-1.5'>
                        <p>{comment.likes_count}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_15246_10140)">
                                <path d="M5.83317 18.3366V9.16992M1.6665 10.8366V16.6699C1.6665 17.5904 2.4127 18.3366 3.33317 18.3366H14.5217C15.7556 18.3366 16.805 17.4363 16.9926 16.2167L17.8901 10.3834C18.1231 8.869 16.9514 7.50326 15.4191 7.50326H12.4998C12.0396 7.50326 11.6665 7.13016 11.6665 6.66992V3.72479C11.6665 2.58992 10.7465 1.66992 9.61164 1.66992C9.34095 1.66992 9.09565 1.82933 8.98572 2.07669L6.05312 8.67504C5.91937 8.97598 5.62093 9.16992 5.29161 9.16992H3.33317C2.4127 9.16992 1.6665 9.91611 1.6665 10.8366Z" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_15246_10140">
                                    <rect width="20" height="20" fill="white" transform="translate(0 0.00341797)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className='flex items-center gap-1.5'>
                        <p>{comment.dislikes_count}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clip-path="url(#clip0_15246_10137)">
                                <path d="M5.83345 1.66992V10.8366M1.66678 8.16992V4.33659C1.66678 3.40317 1.66678 2.93646 1.84844 2.57994C2.00823 2.26633 2.2632 2.01137 2.5768 1.85158C2.93332 1.66992 3.40003 1.66992 4.33345 1.66992H13.2351C14.453 1.66992 15.062 1.66992 15.5538 1.89278C15.9873 2.0892 16.3557 2.40527 16.6158 2.80385C16.9108 3.25608 17.0034 3.85795 17.1886 5.06169L17.6245 7.89503C17.8687 9.48268 17.9909 10.2765 17.7553 10.8942C17.5485 11.4363 17.1596 11.8897 16.6552 12.1765C16.0805 12.5033 15.2773 12.5033 13.671 12.5033H13.0001C12.5334 12.5033 12.3001 12.5033 12.1218 12.5941C11.965 12.674 11.8375 12.8015 11.7576 12.9583C11.6668 13.1365 11.6668 13.3699 11.6668 13.8366V16.2817C11.6668 17.4166 10.7468 18.3366 9.61192 18.3366C9.34123 18.3366 9.09594 18.1772 8.986 17.9298L6.18537 11.6284C6.05799 11.3418 5.9943 11.1985 5.89362 11.0934C5.80463 11.0005 5.69535 10.9295 5.57433 10.8859C5.43742 10.8366 5.28059 10.8366 4.96695 10.8366H4.33345C3.40003 10.8366 2.93332 10.8366 2.5768 10.6549C2.2632 10.4951 2.00823 10.2402 1.84844 9.92657C1.66678 9.57005 1.66678 9.10334 1.66678 8.16992Z" stroke="#AAAAAA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_15246_10137">
                                    <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20 0.00341797)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserComment
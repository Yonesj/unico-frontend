import React, { useContext ,useEffect , useState} from 'react';
import SidebarContext from "../../Components/SidbarContext/SidbarContext"; // adjust path as needed
import { Carousel } from 'antd';
import slideImg from "../../Assets/images/homepageSlide.jpg";
import { Link } from 'react-router-dom';
import MasterProf from "../../Assets/images/Ellipse 9.svg"
import { useNavigate } from 'react-router-dom';
import { Progress } from 'antd';

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


const Home = () => {

    const overall_rating = 3;
    const maxScore = 5;
    const [displayScore, setDisplayScore] = useState(0);
    const [isHover, setIsHover] = useState(false);


    // Animate score when it changes
    useEffect(() => {
        let start = null;
        const duration = 200;
        const startValue = displayScore;

        const animate = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const newScore = startValue + (overall_rating - startValue) * progress;
            setDisplayScore(Number(newScore.toFixed(1)));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [overall_rating]);
    const navigate = useNavigate();
    const percent = (displayScore / maxScore) * 100;
    const conicColors =
        percent >= 80 ? "#92DEAC" : percent > 40 ? "#EFB036" : "#EB9A9C";

    const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);

    return (
        <div className='p-4 relative bg-[#F1F5F7] overflow-hidden'>

            <div className='flex h-[5%] justify-between mb-3'>
                <div className='flex items-center gap-7'>
                    <button onClick={() => setIsSidebarOpen(prev => !prev)} className='lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 6H3M21 12H9M21 18H7" stroke="#4E535A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <p className='font-normal text-sm text-[#383E46]'>صفحه اصلی</p>
                </div>

                <p className='gap-1 hidden lg:flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M7.99962 9.5H11.9996M7.99962 13H14.9996M12.4996 20C17.194 20 20.9996 16.1944 20.9996 11.5C20.9996 6.80558 17.194 3 12.4996 3C7.8052 3 3.99962 6.80558 3.99962 11.5C3.99962 12.45 4.15547 13.3636 4.443 14.2166C4.55119 14.5376 4.60529 14.6981 4.61505 14.8214C4.62469 14.9432 4.6174 15.0286 4.58728 15.1469C4.55677 15.2668 4.48942 15.3915 4.35472 15.6408L2.71906 18.6684C2.48575 19.1002 2.36909 19.3161 2.3952 19.4828C2.41794 19.6279 2.50337 19.7557 2.6288 19.8322C2.7728 19.9201 3.01692 19.8948 3.50517 19.8444L8.62619 19.315C8.78127 19.299 8.85881 19.291 8.92949 19.2937C8.999 19.2963 9.04807 19.3029 9.11586 19.3185C9.18478 19.3344 9.27145 19.3678 9.44478 19.4345C10.3928 19.7998 11.4228 20 12.4996 20Z" stroke="#919498" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className='text-sm font-normal text-[#919498]'>میدونستی میتونی رو فاصله های خالی برنامت کلیک کنی و لیست دروس مطابق اون تایمو ببینی؟</span>
                </p>
            </div>

            <div className='bg-[#FDF7EB] text-xs md:text-sm lg:text-base font-medium border border-[#F9DFAF] rounded-xl w-full px-[18px] py-3 flex flex-col items-center md:flex-row justify-between gap-2 md:gap-0'>
                <p>هنوز شماره تلفن خود را تایید نکرده اید.</p>
                <button className='px-[15px] py-[6.4px] h-[38px] w-[171px] bg-[#EFB036] rounded-lg text-white text-sm'>تایید شماره تلفن</button>
            </div>

            <div className='my-2.5 rounded-xl overflow-hidden h-[220px] md:h-[380px]'>
                <Carousel
                    className="h-full"
                    arrows
                    infinite={false}
                    draggable
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i}>
                            <img src={slideImg} className="rounded-xl border-2 border-white h-[220px] md:h-[380px] w-full" alt={`slide-${i}`} />
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className='w-full flex flex-col lg:flex-row gap-2.5 font-iransansfa'>
                <div className='bg-white px-4 py-6 w-full lg:w-1/2 rounded-xl'>
                    <div className='flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
                                <circle cx="4.5" cy="5" r="4.5" fill="#00ADB5" />
                            </svg>
                            <h4 className='text-sm lg:text-base font-medium'>آخرین اطلاع رسانی ها</h4>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Link to="" className='text-[#8A8A8AD9] text-xs lg:text-sm'>تنظیمات سیستم</Link>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                                <path d="M13.5 6H1M1 6L6.25 1M1 6L6.25 11" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className='pl-3 pt-3 pr-4 pb-4  text-black opacity-85 text-xs lg:text-sm border border-[#EEE] rounded-xl mb-4 mt-7'>
                        <h5 className='font-semibold mb-[11px] '>اطلاع رسانی سلف</h5>
                        <p className=''>با سلاممن با ایشان معادلات دیفرانسیل داشتم.اخلاقشان خیلی خوب است ، تدریسشان هم  خوب و قابل فهم است فقط چون مطالب زیاد است ، کمی تند تدریس می کنند.یک  کتاب دارند که خودشان نوشتند و از آن تدریس می کنند.فقط سوالات امتحان سخت  تر از مطالب و سوالات کلاس است</p>
                    </div>
                    <div className='pl-3 pt-3 pr-4 pb-4  text-black opacity-85 text-xs lg:text-sm border border-[#EEE] rounded-xl mb-4 mt-7'>
                        <h5 className='font-semibold mb-[11px] '>اطلاع رسانی سلف</h5>
                        <p className=''>با سلاممن با ایشان معادلات دیفرانسیل داشتم.اخلاقشان خیلی خوب است ، تدریسشان هم  خوب و قابل فهم است فقط چون مطالب زیاد است ، کمی تند تدریس می کنند.یک  کتاب دارند که خودشان نوشتند و از آن تدریس می کنند.فقط سوالات امتحان سخت  تر از مطالب و سوالات کلاس است</p>
                    </div>
                    <div className='pl-3 pt-3 pr-4 pb-4  text-black opacity-85 text-xs lg:text-sm border border-[#EEE] rounded-xl mt-7'>
                        <h5 className='font-semibold mb-[11px] '>اطلاع رسانی سلف</h5>
                        <p className=''>با سلاممن با ایشان معادلات دیفرانسیل داشتم.اخلاقشان خیلی خوب است ، تدریسشان هم  خوب و قابل فهم است فقط چون مطالب زیاد است ، کمی تند تدریس می کنند.یک  کتاب دارند که خودشان نوشتند و از آن تدریس می کنند.فقط سوالات امتحان سخت  تر از مطالب و سوالات کلاس است</p>
                    </div>
                  

                </div>
                <div className='  w-full lg:w-1/2'>
                    <div className=' p-4 pt-6 bg-white rounded-xl'>
                        <div className='flex justify-between mb-7'>
                            <div className='flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
                                    <circle cx="4.5" cy="5" r="4.5" fill="#48769F" />
                                </svg>
                                <h4 className='text-sm lg:text-base font-medium'>تیکت های اخیر</h4>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <Link to="" className='text-[#8A8A8AD9] text-xs lg:text-sm'>مشاهده همه</Link>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                                    <path d="M13.5 6H1M1 6L6.25 1M1 6L6.25 11" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className='h-[95px] border border-[#E3E3E3] rounded-xl py-3 px-3.5 mb-3.5 text-xs lg:text-sm'>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-1'>
                                    <p>عدم هدایت به درگاه پرداخت</p>
                                    <span className='hidden md:block'>(SDVFSDV545-SDCFS3)</span>
                                </div>
                                <div className='flex gap-2 items-center text-[#CE3134] bg-[#FEEBEE] h-8 w-[95px] rounded-[48px] px-3  py-1 text-xs'>
                                    <div className='w-2 h-2 rounded-full bg-[#EA5454]'></div>
                                    <p>بسته شده</p>
                                </div>
                            </div>
                            <div className='flex justify-between mt-3.5 '>
                                <p>مالی</p>
                                <p>22:14 - 1404/05/24</p>
                            </div>
                        </div>
                     
                        <div className='h-[95px] border border-[#E3E3E3] rounded-xl py-3 px-3.5 mb-3.5 text-xs lg:text-sm'>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-1'>
                                    <p>عدم هدایت به درگاه پرداخت</p>
                                    <span className='hidden md:block'>(SDVFSDV545-SDCFS3)</span>
                                </div>
                                <div className='flex gap-2 items-center text-[#CE3134] bg-[#FEEBEE] h-8 w-[95px] rounded-[48px] px-3  py-1 text-xs'>
                                    <div className='w-2 h-2 rounded-full bg-[#EA5454]'></div>
                                    <p>بسته شده</p>
                                </div>
                            </div>
                            <div className='flex justify-between mt-3.5 '>
                                <p>مالی</p>
                                <p>22:14 - 1404/05/24</p>
                            </div>
                        </div>
                     

                    </div>
                    <div className=' px-4 pt-6 pb-3.5 bg-white rounded-xl mt-4'>
                        <div className='flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="10" viewBox="0 0 9 10" fill="none">
                                    <circle cx="4.5" cy="5" r="4.5" fill="#48769F" />
                                </svg>
                                <h4 className='text-base font-medium'>آخرین نظر شما</h4>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <Link to="" className='text-[#8A8A8AD9]'>نظرات من</Link>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                                    <path d="M13.5 6H1M1 6L6.25 1M1 6L6.25 11" stroke="#AFAFAF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        <p className='pl-3 pt-3 pr-4  mb-2 text-black opacity-85 text-xs   mt-2 text-justify '>خوبی  دارد، اما گاهی تند درس می‌دهد و سوالات امتحانش سخت‌تر از مطالب کلاس است. برخی دانشجویان از نمره‌دهی سختگیرانه‌اش گله دارند، ولی اگر فعال باشیدخوبی  دارد، اما گاهی تند درس می‌دهد و سوالات امتحانش سخت‌تر از مطالب کلاس است. برخی دانشجویان از نمره‌دهی سختگیرانه‌اش گله دارند، ولی اگر فعال باشید و تمرین حل کنید، شانس قبولی خوبی دارید. اما گاهی تند درس می‌دهد و سوالات امتحانش سخت‌تر از مطالب کلاس است. ولی اگر فعال باشید...</p>

                        <hr />

                        <div className='flex justify-between items-center mt-2.5'>
                            <div className='flex items-center gap-2'>
                                <div className='relative'>
                                    <img className='w-8 h-8' src={MasterProf} alt="" />
                                    {/* <div className='w-20 h-20 rounded-full absolute top-0 amin'></div> */}

                                    <div className='absolute -bottom-1 -left-1'>
                                        <Progress
                                            type="circle"
                                            percent={percent}
                                            strokeColor={conicColors}
                                            format={() => ''}
                                            strokeWidth={5}
                                            size={40}
                                        />
                                    </div>
                                    <div className={`absolute flex transition-all duration-300  ${isHover ? "opacity-100" : "opacity-0"} font-semibold text-[22px] text-white font-iransansfa items-center justify-center top-0 left-0 w-20 h-20 rounded-full`}
                                        style={{ background: "linear-gradient(0deg, rgba(51, 189, 196, 0.70) 0%, rgba(51, 189, 196, 0.70) 100%)" }}
                                    >
                                        {Number(Number(overall_rating).toFixed(1))}

                                    </div>

                                </div>
                                <p className='text-[#00ADB5] text-xs'>احمدرضا منتظرالقائم</p>
                            </div>
                            <button className='text-[#4CC6CB] text-sm flex items-center justify-center h-9 w-36 border border-[#4CC6CB] rounded-md'>
                                مشاهده کامل نظر
                            </button>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    );
};
export default Home;

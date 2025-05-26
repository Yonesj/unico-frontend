import React from 'react'
import MasterProf from "../../Assets/images/Ellipse 9.svg"
import { Link } from 'react-router-dom'
import { useState ,useEffect } from 'react'
import { Progress } from 'antd'

const CommentCard = ({ first_name, last_name, id, review_text, profile_image, overall_rating = 0 }) => {
    const maxScore = 5;
    const [displayScore, setDisplayScore] = useState(0);
    const [isHover, setIsHover] = useState(false);

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

    const percent = (displayScore / maxScore) * 100;
    const conicColors =
        percent >= 80 ? "#92DEAC" : percent > 40 ? "#EFB036" : "#EB9A9C";

    return (
        <div
            className='p-4 pt-6 bg-white w-[218px] h-[271px] flex  text-xs   flex-col  rounded-xl  hover:bg-[#E5F7F8] transition-all z-[5]'>
            <p className='font-semibold'>دیدگاه کاربر:</p>
            <p className='text-[#666] font-normal my-[14px] flex-1'>{review_text?.length <= 280 ? review_text : review_text?.slice(0, 280) + '...'} </p>
            <hr />

            <Link to={`/poll/ProfessorDetails/${id}`} className='flex gap-2 items-center mt-2.5 mb-2'>
                <div className='relative'>
                    <img className='h-8 w-8' src={MasterProf} alt="" />
                    {/* <div className='w-20 h-20 rounded-full absolute top-0 amin'></div> */}

                    <div className='absolute -left-1 -top-1'>
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
                <p className='text-[#00ADB5]'>{first_name} {last_name}</p>
            </Link>

        </div>
    )
}

export default CommentCard
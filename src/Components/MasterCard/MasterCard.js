import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';
import MasterProf from "../../Assets/images/Ellipse 9.svg"
import "./MasterCard.css"
import { Navigate, useNavigate } from 'react-router-dom'
import Progresswheel from '../Progresswheel'
const MasterCard = ({ first_name, last_name, id, courses, reviews_count, overall_rating = 0, event = true }) => {
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
  return (
    <div onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => event ? navigate(`/poll/ProfessorDetails/${id}`) : ""} className='amin p-4 pt-6  bg-white w-[218px] h-[261px] flex justify-evenly items-center flex-col  rounded-xl cursor-pointer hover:bg-[#E5F7F8] transition-all z-[5]'>
      <div className='relative'>
        <img src={MasterProf} alt="" />
        {/* <div className='w-20 h-20 rounded-full absolute top-0 amin'></div> */}

        <div className='absolute -left-[8.3px] -top-[8.3px]'>
          <Progress
            type="circle"
            percent={percent}
            strokeColor={conicColors}
            format={() => ''}
            strokeWidth={5}
            size={97}
          />
        </div>
        <div className={`absolute flex transition-all duration-300  ${isHover ? "opacity-100" : "opacity-0"} font-semibold text-[22px] text-white font-iransansfa items-center justify-center top-0 left-0 w-20 h-20 rounded-full`}
          style={{ background: "linear-gradient(0deg, rgba(51, 189, 196, 0.70) 0%, rgba(51, 189, 196, 0.70) 100%)" }}
        >
          {Number(Number(overall_rating).toFixed(1))}

        </div>

      </div>
      <div className='text-center my-6'>
        <h4 className='font-medium text-sm'>{first_name} {last_name}</h4>
        <div className='flex gap-2 mt-2 text-wrap justify-center'>
          {
            courses?.map((course, index) => {

              return (
                <div key={course.id} className='font-iransansfa flex items-center gap-2 font-normal text-xs  lg:text-sm text-[#949494]'>
                  <p>{course.name}</p>

                  {index !== courses.length - 1 ? <svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none">
                    <circle cx="1.5" cy="2" r="1.5" fill="#D9D9D9" />
                  </svg> : ""}
                </div>
              )
            })
          }
        </div>
      </div>
      <hr className='w-full h-2 mb-3' />
      <p className='font-normal text-sm text-[#838383] font-iransansfa'>{reviews_count} نظر</p>
    </div>
  )
}

export default MasterCard
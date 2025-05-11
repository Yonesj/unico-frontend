import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';

const Progresswheel = ({ score, size , count = 0}) => {
  const maxScore = 5;
  const [displayScore, setDisplayScore] = useState(0);

  // Animate score when it changes
  useEffect(() => {
    let start = null;
    const duration = 500;
    const startValue = displayScore;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const newScore = startValue + (score - startValue) * progress;
      setDisplayScore(Number(newScore.toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  const percent = (displayScore / maxScore) * 100;
  const conicColors =
    percent >= 80 ? "#92DEAC" : percent > 40 ? "#EFB036" : "#EB9A9C";

  return (
    <div className='relative font-iransansfa  lg:w-[150px] h-[100px] lg:h-[150px] flex gap-6 lg:gap-0 lg:flex-col items-center'>
      <div className='relative'>
        <Progress
          type="circle"
          percent={percent}
          strokeColor={conicColors}
          format={() => ''}
          strokeWidth={13}
          size={size}
        />

        {/* Centered Score Text */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex items-center gap-0.5'>
          <p className='text-sm text-[#3B3D53]/40'>{maxScore}</p>
          <p>/</p>
          <p className='text-xl lg:text-3xl font-extrabold'>{displayScore}</p>
        </div>
      </div>

      {/* Below Text */}
      <div className='lg:mt-5 text-center'>
        <p className='text-sm text-black w-44'>
          امتیاز کلی بر اساس <span className='font-bold underline'>{count} نظر</span>
        </p>
      </div>
    </div>
  );
};

export default Progresswheel;

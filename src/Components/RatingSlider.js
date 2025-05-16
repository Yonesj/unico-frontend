import React from 'react';
import { Slider } from 'antd';

const RatingSlider = ({ label, onChange , value}) => {
  return (
    <div className="mb-[55px] flex flex-col w-full lg:w-[48%] lg:flex-row lg:items-center">
      <div className="flex gap-1 mb-2 lg:mb-0 w-[140px]">
        <label className="text-sm  text-black font-normal">{label} :</label>
        <span className="text-red-500">*</span>
      </div>
      <Slider
      className='font-iransansfa w-full lg:w-[330px]'
        min={1}
        max={5}
        step={1}
        marks={{
          1: '۱',
          2: '۲',
          3: '۳',
          4: '۴',
          5: '۵',
        }}
        value={value}
        onChange={onChange}
        tooltipVisible={false}
        trackStyle={{ backgroundColor: '#00ADB5' }}
        />
      {/* <div className="w-[112px] mr-5">
        <label className="text-sm text-[#6C6C6C]">دست باز و با ارفاق</label>
      </div> */}
    </div>
  );
};

export default RatingSlider;
